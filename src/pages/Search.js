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
import { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"
import { Search2Icon, PlusSquareIcon, InfoOutlineIcon } from "@chakra-ui/icons";

import { getAcquisitionInfo } from "../services/web3/query"
import { Header } from '../components/header';

function Search() {
    let domainInitialValue = ''
    const location = useLocation()
    const params =  new URLSearchParams(location.search)
    const domainParam = params.get('domain')
    
    if (typeof domainParam === 'string' && domainParam.length > 0) {
        domainInitialValue = domainParam
    }

    const [domain, setDomain] = useState(domainInitialValue)
    const [domainStatus, setDomainStatus] = useState('')

    const handleSetDomain = (e) => {
        setDomain(e.target.value)
    }

    const getDomainAcquisitionStatus = async (domain) => {
        const response = await getAcquisitionInfo(domain)
        if (response.errors) {
            // TODO(abdul): handle errors
            return
        }
        if(response.data.getAcquisitionInfo?.state) {
            setDomainStatus(response.data.getAcquisitionInfo?.state)
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

            { domainStatus ? 
                <Box mt="10" d="flex" justifyContent="center">
                    <List spacing={3}>
                        <ListItem mt="5" p="8" pb="10" borderRadius="10" boxShadow='xl'>
                            <Flex width="60vw" justifyContent="space-between">
                                <Flex>
                                    <Heading letterSpacing="wide" size="2xl" textAlign="center">{domain ? domain : 'Search .eth or .tez domains'}</Heading>
                                </Flex>
                                <Flex>
                                    {domainStatus === 'Taken' ?
                                        <Box mr={2}>
                                            <Text bgClip="text" fontSize="2xl" mt="2" color="black">
                                                {domainStatus}
                                            </Text>
                                        </Box>
                                    : null } 
                                    <Box>
                                        {domainStatus === 'Taken' ? 
                                            <Link to={{
                                                pathname: `/details/${domain}`
                                            }}>
                                                <Button colorScheme='teal' variant='solid' size='lg'> 
                                                    <InfoOutlineIcon color="white" w={15} h={15} /> 
                                                    <Text ml="2">View</Text>    
                                                </Button>
                                            </Link>
                                        : domainStatus === 'CanBeBought' ?
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
            : 
                <Box mt="20" d="flex" justifyContent="center"> 
                    <div class="loader loader--style1" title="0">
                        <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="80px" height="80px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xmlSpace="preserve">
                        <path opacity="0.2" fill="#2c7a7b" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                            s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                            c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                        <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                            C22.32,8.481,24.301,9.057,26.013,10.047z">
                            <animateTransform attributeType="xml"
                            attributeName="transform"
                            type="rotate"
                            from="0 20 20"
                            to="360 20 20"
                            dur="0.5s"
                            repeatCount="indefinite"/>
                            </path>
                        </svg>
                    </div>
                </Box>
            }

        </Box>
    );
}

export default Search;
