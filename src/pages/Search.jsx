import {
    Text, 
    Input, 
    Box, 
    Button, 
    InputGroup, 
    InputLeftAddon, 
    Heading, 
    Flex,
    List,
    ListItem
} from '@chakra-ui/react'
import { useEffect, useState, useReducer } from "react"
import { useLocation, Link } from "react-router-dom"
import { Search2Icon, PlusSquareIcon, InfoOutlineIcon } from "@chakra-ui/icons";

import { getAcquisitionInfo } from "../services/web3/query"
import { Header } from '../components/Header';
import { Loader } from '../components/Loader';

function Search() {
    let domainInitialValue = ''
    const location = useLocation()
    const params =  new URLSearchParams(location.search)
    const domainParam = params.get('domain')
    
    if (typeof domainParam === 'string' && domainParam.length > 0) {

        console.log("domainParam");
        console.log(domainParam);

        domainInitialValue = domainParam
    }

    const [domain, setDomain] = useState(domainInitialValue)

    const handleSetDomain = (e) => {
        setDomain(e.target.value)
    }


    const initialState = { state: 'LOADING', domain: 'loading' };

    function reducer(state, action) {
        switch (action.state) {
            case 'LOADING':
            return { state: action.state, domain: action.domain } ;
            case 'SUCCESSFUL':
            return { state: action.state, domain: action.domain } ;
            case 'ERROR':
            return { state: action.state, domain: action.domain } ;
            default:
            throw new Error();
        }
    }

    const [domainStatus, dispatch] = useReducer(reducer, initialState);

    

    


    const getDomainAcquisitionStatus = async (domain) => {
        const response = await getAcquisitionInfo(domain);
        
        console.log("response");
        console.log(response);

        if (response.errors) {
            // TODO(abdul): handle errors
            dispatch({ state: 'ERROR', domain: response.errors });
            return
        }
        if(response.data.getAcquisitionInfo?.state) {
            dispatch({ state: 'SUCCESSFUL', domain: response.data.getAcquisitionInfo?.state });
        }
    }

    const handleOnSearch = (e) => {
        getDomainAcquisitionStatus(domain)
    }

    useEffect(() => {
        if (domain) {
            getDomainAcquisitionStatus(domain)
        }
    }, [domain])

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
                                placeholder="Search for .eth or .tez domains or addresses" 
                                bg="white" 
                                size="md" 
                                value={domain}
                                onChange={handleSetDomain}
                                mr={0} />
                        </InputGroup>
                        <Button p="2rem" colorScheme='teal' onClick={handleOnSearch} borderRadius={0}>Search</Button>
                    </Box>
                </Box>
            </Box>

            { domainStatus.state === 'LOADING' ? 

                <Box mt="20" d="flex" justifyContent="center"> 
                    <Loader />
                </Box>:

                <Box mt="10" d="flex" justifyContent="center">
                    <List spacing={3}>
                        <ListItem mt="5" p="8" pb="10" borderRadius="10" boxShadow='xl'>
                            <Flex width="60vw" justifyContent="space-between">
                                <Flex>
                                    <Heading letterSpacing="wide" size="2xl" textAlign="center">{domain ? domain : 'Search .eth or .tez domains'} <span Class="notAvailable"> {domainStatus.state === 'ERROR' ? ' is not available on this network' : ''} </span> </Heading>
                                </Flex>
                                <Flex>
                                    {domainStatus.domain === 'Taken' ?
                                        <Box mr={2}>
                                            <Text bgClip="text" fontSize="2xl" mt="2" color="black">
                                                {domainStatus.domain}
                                            </Text>
                                        </Box>
                                    : null } 
                                    <Box>
                                        {domainStatus.domain === 'Taken' ? 
                                            <Link to={{
                                                pathname: `/details/${domain}`
                                            }}>
                                                <Button colorScheme='teal' variant='solid' size='lg'> 
                                                    <InfoOutlineIcon color="white" w={15} h={15} /> 
                                                    <Text ml="2">View</Text>    
                                                </Button>
                                            </Link>
                                        : domainStatus.domain === 'CanBeBought' ?
                                            <Link to={{
                                                pathname: `/register/${domain}`
                                            }}>
                                                <Button colorScheme='teal' variant='solid' size='lg'> 
                                                    <PlusSquareIcon color="white" w={15} h={15} /> 
                                                    <Text ml="2">Register</Text>    
                                                </Button>
                                            </Link>
                                        : null}
                                    </Box>
                                </Flex>
                            </Flex> 
                        </ListItem>
                    </List>
                </Box>
            
            }
        </Box>
    );
}

export default Search;
