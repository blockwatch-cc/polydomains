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
    Flex,
    Button,
    useClipboard,
    Input
} from '@chakra-ui/react'
import { toast } from "react-toastify"
import { CopyIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useReducer, useState } from 'react';

import { Header } from "../components/Header";
import { Loader } from '../components/Loader';
import { WalletContext } from '../context/wallet';
import { extractErrorMessage } from '../utils/text';
import { resolveDomainRecords } from '../services/web3/query';
import { resolveDomainRecordsReducer } from '../reducer/domain';

function Details() {
    const { name } = useParams()
    const [address, setAddress] = useState('')
    const { hasCopied, onCopy } = useClipboard(address);
    const [domainRecord, dispatch] = useReducer(resolveDomainRecordsReducer, { state: '', name, payload: null, errors: null })
    const { app } = useContext(WalletContext)

    const getDomainRecord = async () => {
        if (typeof domainRecord.name !== 'string' || domainRecord.name.length === 0) {
            return
        }
        dispatch({ state: 'LOADING' })
        const response = await resolveDomainRecords({ network: app.network }, domainRecord.name);
        if (response.errors) {
            const message = extractErrorMessage(response.errors, 'failed to get domain records')
            toast.error(message)
            dispatch({ state: 'QUERY_FAILED', errors: response.errors });
            return
        }
        if(response.data.resolveDomainRecords) {
            setAddress(response.data.resolveDomainRecords?.address)
            response.data.resolveDomainRecords.metadata = JSON.parse(response.data.resolveDomainRecords.data)
            dispatch({ state: 'QUERY_SUCCESS', payload: response.data.resolveDomainRecords });
        }
    }

    useEffect(() => {
        getDomainRecord()
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
                                            {domainRecord.state === 'QUERY_SUCCESS'  && domainRecord.payload ?
                                                <Box w='100%' h='10' gridColumnStart={5}>
                                                    {address ? 
                                                        <Flex mb={2}>
                                                            <Input value={address} isReadOnly placeholder='Welcome' py="4" />
                                                            <Button onClick={onCopy} ml={2}>
                                                                <CopyIcon color="black" /> {hasCopied ? 'Copied' : 'Copy'}
                                                            </Button>
                                                        </Flex>
                                                    : null}
                                                </Box>
                                            : null }
                                        </Grid>
                                    </ListItem>
                                </List>
                            </GridItem>
                            <GridItem rowSpan={2}>
                                <Grid  p="5" gap={4} >
                                    {domainRecord.state === 'LOADING' ? 
                                        <Box mt="20" d="flex" justifyContent="center"> 
                                            <Loader />
                                        </Box>
                                    : domainRecord.state === 'QUERY_SUCCESS' ? 
                                        <GridItem colSpan={4}>
                                            <Tabs align='start' variant='enclosed'>
                                                <TabList>
                                                    <Tab>Details</Tab>
                                                    <Tab>Subdomains</Tab>
                                                </TabList>
                                                <TabPanels>
                                                    <TabPanel  >               
                                                        <VStack  align="left" mt="6">
                                                            <Heading fontSize='lg' mt="2">Address Details</Heading>
                                                            <HStack spacing='30px' align="left">
                                                                <Box w='130px'>
                                                                    <Heading fontSize='md' mt="2">Name</Heading>
                                                                </Box>
                                                                <Box w='670px'>
                                                                    <Text fontSize='md' mt="2">{domainRecord?.name ? domainRecord?.name : null}</Text>
                                                                </Box>
                                                            </HStack>
                                                            <HStack spacing='30px'>
                                                                <Box w='130px'>
                                                                    <Heading fontSize='md' mt="2">Address</Heading>
                                                                </Box>
                                                                <Box w='670px'>
                                                                    <Text fontSize='md' mt="2">{domainRecord?.payload?.address ? domainRecord?.payload?.address : "" }</Text>
                                                                </Box>
                                                            </HStack>
                                                            <HStack spacing='30px' pb="2">
                                                                    <Box w='130px'>
                                                                        <Heading fontSize='md' mt="2">Expiry</Heading>
                                                                    </Box>
                                                                    <Box w='670px'>
                                                                        <Text fontSize='md' mt="2">{domainRecord?.payload?.expiry ? domainRecord?.payload?.expiry : ""}</Text>
                                                                    </Box>
                                                            </HStack>
                                                            <hr />
                                                            <Heading fontSize='lg' py="2">Additional Information</Heading>
                                                            {Object.keys(domainRecord?.payload?.metadata).map((keyName, idx) => (
                                                                <HStack spacing='24px' key={`${keyName}-${idx}`}>
                                                                    <Box w='130px'>
                                                                        <Heading fontSize='md' mt="2">{keyName}</Heading>
                                                                    </Box>
                                                                    <Box w='670px'>
                                                                        <Text fontSize='md' mt="2">{domainRecord?.payload?.metadata[keyName]}</Text>
                                                                    </Box>
                                                                </HStack>
                                                            ))}
                                                        </VStack>
                                                    </TabPanel>
                                                    <TabPanel>
                                                        <Text fontSize='xl' mt="5" textAlign="center"> No Subdomains</Text>
                                                    </TabPanel>
                                                </TabPanels>
                                            </Tabs>
                                        </GridItem> 
                                    : null}
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
