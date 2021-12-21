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
    IconButton,
    Button
} from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { HamburgerIcon, LinkIcon, AddIcon, MinusIcon, CheckCircleIcon } from "@chakra-ui/icons";

import { Header } from "../components/Header";
import { shortenAddress } from '../utils/text';
import { resolveDomainRecords } from '../services/web3/query';

function Register() {
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
                    <VStack>
                        <Box width="80vw" textAlign="left">
                            <VStack textAlign="left">
                                <Text letterSpacing="wide" fontSize='2xl' >Register Domain</Text>
                                <Text letterSpacing="wide" fontSize='sm' >Select the details of the domain you want to register below.</Text>
                            </VStack>
                        </Box>
                        <Box d="flex" width="80vw" borderRadius="10" boxShadow='xl'>            
                    
                        <Grid>
                            <GridItem rowSpan={2}>
                                <List spacing={3}>
                                    <ListItem mt="1"   p="8" pb="10" >
                                        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                                            <Box w='100%' h='10'>
                                                <Heading letterSpacing="wide" size="2xl" textAlign="center">{name}</Heading>
                                            </Box>
                                            <Box w='100%' h='10' gridColumnStart={6} justifyContent='end'>
                                                <Button colorScheme='teal' variant='solid' size='lg'> 
                                                    <CheckCircleIcon color="white" w={15} h={15}  /> 
                                                    <Text ml="2">Buy</Text>    
                                                </Button>
                                                <Text color="teal" fontSize="2xl">{domainInfo?.address ? shortenAddress(domainInfo?.address) : ""}</Text>
                                            </Box>
                                        </Grid>
                                    </ListItem>
                                </List>
                            </GridItem>
                            <GridItem rowSpan={2}>
                                <Grid h='25vw' p="5" gap={4}>
                                    <GridItem colSpan={4}>
                                            <Tabs align='start' variant='enclosed'>
                                                <TabList>
                                                    <Tab>Register</Tab>
                                                    <Tab>Details</Tab>
                                                    <Tab>Subdomains</Tab>
                                                </TabList>
                                                <TabPanels>
                                                    <TabPanel>
                                                        <HStack spacing='30px' mt="6">
                                                            <IconButton
                                                            variant='outline'
                                                            colorScheme='teal'
                                                            aria-label='Send email'
                                                            icon={<AddIcon />}
                                                            />
                                                            <VStack>
                                                                <Text fontSize='xl' pt="5"> 5 Years</Text>
                                                                <Text fontSize='sm'> Registration Period </Text>
                                                            </VStack>
                                                            <IconButton
                                                            variant='outline'
                                                            colorScheme='teal'
                                                            aria-label='Send email'
                                                            icon={<MinusIcon />}
                                                            />
                                                            <LinkIcon color="teal" w={19} h={20} />
                                                            <VStack>
                                                                <div>
                                                                    <Text fontSize='xl' mt="2"> 0.004 ETH</Text>
                                                                </div>
                                                                <Text fontSize='sm' mt="2"> Registration price to pay </Text>
                                                            </VStack>
                                                            <HamburgerIcon color="teal" w={19} h={20} />
                                                            <Text fontSize='xl' mt="2"> $15.01USD</Text>
                                                        </HStack>
                                                        <VStack align="left" mt="10">
                                                            <HStack>
                                                                <Text fontSize='2xl' pt="5"  size='lg'> <span class={'moneyspan'}>0.004 ETH</span>  + at most <span class={'moneyspan'}>0.034 ETH</span>  gas fee = at most <span class={'moneyspan'}>0.038 ETH</span> </Text>
                                                                <Text fontSize='2xl' pt="5"> <span class={'moneyspan'}>$142.79USD</span>  </Text>                                 
                                                            </HStack>
                                                            <Text fontSize='2xl' pt="5"> Estimated Total (Price + Gas). The gas price is based at 120 Gwei </Text>
                                                        </VStack>
                                                    </TabPanel>
                                                    <TabPanel>
                                                        <VStack align="left" mt="6">
                                                            <HStack spacing='30px' align="left">
                                                                <Heading fontSize='xl' mt="2"> PARENT</Heading> :
                                                                <Text fontSize='xl' mt="2"> eth </Text>
                                                            </HStack>
                                                            <HStack spacing='30px'>
                                                                <Heading fontSize='xl' mt="2"> REGISTRANT</Heading> :
                                                                <Text fontSize='xl' mt="2"> 0x0 </Text>
                                                            </HStack>
                                                            <HStack spacing='30px'>
                                                                <Heading fontSize='xl' mt="2"> CONTROLLER</Heading> :
                                                                <Text fontSize='xl' mt="2"> Not owned </Text>
                                                            </HStack>
                                                            <HStack spacing='30px'>
                                                                <Heading fontSize='xl' mt="2"> RESOLVER</Heading> :
                                                                <Text fontSize='xl' mt="2"> No Resolver set </Text>
                                                            </HStack>
                                                        </VStack>
                                                    </TabPanel>
                                                    <TabPanel>
                                                        <Text fontSize='xl' mt="5" textAlign="center"> No Subdomains </Text>                       
                                                    </TabPanel>
                                                </TabPanels>
                                            </Tabs>
                                    </GridItem>
                                </Grid>
                            </GridItem>

                        </Grid>
                    </Box>
                    </VStack>
                </Box>
            </Box>
        </Box>
    );
}

export default Register;
