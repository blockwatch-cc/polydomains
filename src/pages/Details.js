import {
    VStack,
    HStack,
    List,
    ListItem,
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel,
    Grid,
    GridItem,
    Text, 
    Box, 
    Heading, 
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { Header } from "../components/header";
import { resolveDomainRecords } from '../services/web3/query';
import { shortenAddress } from '../utils/text';

function Details() {
    const { name } = useParams()
    const [domainInfo, setDomainInfo] = useState(null)

    const getDomainInfo = async () => {
        const response = await resolveDomainRecords(name)
        if (response.errors) {
            // TODO(abdul): handle error
            return
        }
        console.log(response.data.resolveDomainRecords)
        setDomainInfo(response.data.resolveDomainRecords)
    }

    useEffect(() => {
        if (name) {
            getDomainInfo(name)
        }
    }, [])

    return (
        <Box minHeight="100vh" >
            <Header showSearch={true} />
            <Box d="block">
                <Box d="flex" mt="10" justifyContent="center">
                    <Box d="flex" width="80vw" borderRadius="10" boxShadow='xl'>            
                        <Grid>
                            <GridItem rowSpan={2}>
                                <List spacing={3}>
                                    <ListItem mt="5"   p="8" pb="10" >
                                        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                                            <Box w='100%' h='10'>
                                                <Heading letterSpacing="wide" size="2xl" textAlign="center">{name}</Heading>
                                            </Box>
                                            <Box w='100%' h='10' gridColumnStart={5}>
                                                <Text color="teal" fontSize="2xl">{domainInfo?.address ? shortenAddress(domainInfo?.address) : ""}</Text>
                                            </Box>
                                        </Grid>
                                    </ListItem>
                                </List>
                            </GridItem>
                            <GridItem rowSpan={2}>
                                <Grid h='25vw' p="5" gap={4} >
                                    
                                    
                                    <GridItem colSpan={4}>
                                        { domainInfo ? 
                                            <Tabs align='start' variant='enclosed'>
                                                <TabList>
                                                    <Tab>Details</Tab>
                                                    <Tab>Subdomains</Tab>
                                                </TabList>
                                                <TabPanels>
                                                    <TabPanel  >               
                                                        <VStack  align="left" mt="6">
                                                            <HStack spacing='30px' align="left">
                                                                <Heading fontSize='xl' mt="2">Name</Heading> :
                                                                <Text fontSize='xl' mt="2">{domainInfo?.name ? domainInfo?.name : null}</Text>
                                                            </HStack>
                                                            <HStack spacing='30px'>
                                                                <Heading fontSize='xl' mt="2">Address</Heading> :
                                                                <Text fontSize='xl' mt="2">{domainInfo?.address ? domainInfo?.address : "" }</Text>
                                                            </HStack>
                                                            <HStack spacing='30px'>
                                                                <Heading fontSize='xl' mt="2">Expiry</Heading> :
                                                                <Text fontSize='xl' mt="2">{domainInfo?.expiry ? domainInfo?.expiry : ""}</Text>
                                                            </HStack>
                                                        </VStack>
                                                    </TabPanel>
                                                    <TabPanel>
                                                        <Text fontSize='xl' mt="5" textAlign="center"> No Subdomains</Text>
                                                    </TabPanel>
                                                </TabPanels>
                                            </Tabs>
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
                                    </GridItem>


                                </Grid>
                            </GridItem>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Details;
