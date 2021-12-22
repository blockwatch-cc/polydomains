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
    useClipboard 
} from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

import { Header } from "../components/Header";
import { shortenAddress } from '../utils/text';
import { resolveDomainRecords } from '../services/web3/query';
import { Loader } from '../components/Loader';

import { CopyIcon } from "@chakra-ui/icons";

function Details() {
    const { name } = useParams()
    const [value, setValue] = useState('');
    const [domainInfo, setDomainInfo] = useState(null)
    const { hasCopied, onCopy } = useClipboard(value);

    const getDomainInfo = async () => {
        const response = await resolveDomainRecords(name)
        if (response.errors) {
            // TODO(abdul): handle error
            return
        }

        console.log("resp");
        response.data.resolveDomainRecords.metadata = JSON.parse(response.data.resolveDomainRecords.data);
        console.log(response.data.resolveDomainRecords.metadata);
        // console.log(JSON.parse(response.data.resolveDomainRecords));

        setValue(response.data.resolveDomainRecords.address)
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
                                            {domainInfo?.address ?
                                                <Box w='100%' h='10' gridColumnStart={5}>
                                                    <Flex mb={2}>
                                                        <Text color="teal" fontSize="2xl">{shortenAddress(domainInfo?.address)}</Text>
                                                        <Button onClick={onCopy} ml={2}>
                                                        <CopyIcon color="black" /> {hasCopied ? 'Copied' : 'Copy'}
                                                        </Button>
                                                    </Flex>
                                                </Box>
                                            : null }
                                        </Grid>
                                    </ListItem>
                                </List>
                            </GridItem>
                            <GridItem rowSpan={2}>
                                <Grid  p="5" gap={4} >
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
                                                            <Heading fontSize='lg' mt="2">Address Details</Heading> :
                                                            <HStack spacing='30px' align="left">
                                                                <Box w='130px'>
                                                                    <Heading fontSize='md' mt="2">Name</Heading>
                                                                </Box>
                                                                <Box w='670px'>
                                                                    <Text fontSize='md' mt="2">: {domainInfo?.name ? domainInfo?.name : null}</Text>
                                                                </Box>
                                                            </HStack>
                                                            <HStack spacing='30px'>
                                                                <Box w='130px'>
                                                                    <Heading fontSize='md' mt="2">Address</Heading>
                                                                </Box>
                                                                <Box w='670px'>
                                                                    <Text fontSize='md' mt="2">: {domainInfo?.address ? domainInfo?.address : "" }</Text>
                                                                </Box>
                                                            </HStack>
                                                            <HStack spacing='30px' pb="2">
                                                                    <Box w='130px'>
                                                                        <Heading fontSize='md' mt="2">Expiry</Heading>
                                                                    </Box>
                                                                    <Box w='670px'>
                                                                        <Text fontSize='md' mt="2">: {domainInfo?.expiry ? domainInfo?.expiry : ""}</Text>
                                                                    </Box>
                                                            </HStack>
                                                            <hr />
                                                            <Heading fontSize='lg' py="2">Additional Information</Heading>
                                                            {Object.keys(domainInfo?.metadata).map((keyName, i) => (
                                                                <HStack spacing='24px'>
                                                                    <Box w='130px'>
                                                                    <b>{keyName}</b>
                                                                    </Box>
                                                                    <Box w='670px'>
                                                                        :<span>  {domainInfo?.metadata[keyName]}</span>
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
