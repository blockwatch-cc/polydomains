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
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

import { Header } from "../components/Header";
import { shortenAddress } from '../utils/text';
import { resolveDomainRecords } from '../services/web3/query';
import { Loader } from '../components/Loader';

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
                                                <Loader />
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
