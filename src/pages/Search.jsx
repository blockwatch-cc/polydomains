import {
    Text, 
    Input, 
    Box, 
    Button, 
    InputGroup, 
    InputLeftAddon, 
    Flex,
    List,
    ListItem
} from '@chakra-ui/react'
import { useContext, useEffect, useReducer } from "react"
import { useLocation, Link } from "react-router-dom"
import { Search2Icon, PlusSquareIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { toast } from 'react-toastify';

import { getAcquisitionInfo } from "../services/web3/query"
import { Header } from '../components/Header';
import { Loader } from '../components/Loader';
import { acquisitionReducer } from '../reducer/domain'
import { WalletContext } from '../context/wallet';
import { extractErrorMessage } from '../utils/text';

function Search() {
    let domainInitialValue = ''
    const location = useLocation()
    const params =  new URLSearchParams(location.search)
    const { app } = useContext(WalletContext)
    const domainParam = params.get('domain')
    
    if (typeof domainParam === 'string' && domainParam.length > 0) {
        domainInitialValue = domainParam
    }

    const [domain, dispatch] = useReducer(acquisitionReducer, { state: '', name: domainInitialValue, payload: null, errors: null })

    const handleSetDomain = (e) => {
        dispatch({ state: 'UPDATE_DOMAIN', name: e.target.value })
    }

    const getDomainAcquisitionStatus = async () => {
        if (typeof domain.name !== 'string' || domain.name.length === 0) {
            return
        }
        dispatch({ state: 'LOADING' })
        const response = await getAcquisitionInfo({ network: app.network }, domain.name);
        if (response.errors) {
            const message = extractErrorMessage(response.errors, 'failed to get domain avaialable')
            toast.error(message)
            dispatch({ state: 'QUERY_FAILED', errors: response.errors });
            return
        }
        if(response.data.getAcquisitionInfo?.state) {
            dispatch({ state: 'QUERY_SUCCESS', payload: response.data.getAcquisitionInfo });
        }
    }

    const handleOnSearch = (e) => {
        getDomainAcquisitionStatus()
    }

    useEffect(() => {
        getDomainAcquisitionStatus()
    }, [])

    return (
        <Box minHeight="100vh" >
            <Header />
            <Box d="block">
                <Box d="flex" mt="10" justifyContent="center">
                    <Box d="flex" width="60vw">
                        <InputGroup>
                            <InputLeftAddon py="2rem" px="1rem" bg="white">
                                <Search2Icon color="gray.300" />
                            </InputLeftAddon>
                            <Input 
                                colorScheme="whiteAlpha" 
                                p="2rem" 
                                variant="outline" 
                                placeholder="Search address" 
                                bg="white" 
                                size="md" 
                                value={domain.name}
                                onChange={handleSetDomain}
                                mr={0} />
                        </InputGroup>
                        <Button p="2rem" colorScheme='teal' onClick={handleOnSearch} borderRadius={0}>Search</Button>
                    </Box>
                </Box>
            </Box>
            {domain.state === 'LOADING' ?
                <Box mt="20" d="flex" justifyContent="center"> 
                    <Loader />
                </Box> :
             domain.state === 'QUERY_SUCCESS' ?
                <Box mt="10" d="flex" justifyContent="center">
                <List spacing={3}>
                    <ListItem mt="5" p="8" pb="10" borderRadius="10" boxShadow='xl'>
                        <Flex width="60vw" justifyContent="space-between">
                            <Box mr={2}>
                                <Text bgClip="text" fontSize="2xl" mt="2" color="black">{domain.name}</Text>
                            </Box>
                            {['Taken', 'CanBeBought'].includes(domain.payload.state) ?
                                <Box>
                                    <Link to={domain.payload.state === 'Taken' ? {
                                        pathname: `/details/${domain.name}`
                                    }: {
                                        pathname: `/register/${domain.name}`
                                    }}>
                                        {domain.payload.state === 'Taken' ? 
                                            <Button colorScheme='teal' variant='solid' size='lg'> 
                                                <InfoOutlineIcon color="white" w={15} h={15} /> 
                                                <Text ml="2">View</Text>    
                                            </Button>
                                        : <Button colorScheme='teal' variant='solid' size='lg' disabled> 
                                            <PlusSquareIcon color="white" w={15} h={15} /> 
                                            <Text ml="2">Register</Text>    
                                            </Button>
                                        }
                                    </Link>
                                </Box>
                            : null}
                        </Flex>
                    </ListItem>
                </List>
            </Box> : null}
        </Box>
    );
}

export default Search;
