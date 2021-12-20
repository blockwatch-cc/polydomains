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
    Button,
    Heading, 
    IconButton,
} from '@chakra-ui/react'
import { HamburgerIcon, LinkIcon, CheckCircleIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";

import { Header } from "../Components/Header";
import { useParams } from "react-router-dom";

function Details() {
    const { name } = useParams()

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
                                            <Box w='100%' h='10' />
                                            <Box w='100%' h='10' />
                                            <Box w='100%' h='10'>
                                                <Text bgClip="text" fontSize="2xl" mt="2" color="black">
                                                    Availabe
                                                </Text>
                                            </Box>
                                            <Box w='100%' h='10'>
                                                <Button colorScheme='teal' variant='outline' size='lg'> 
                                                    <CheckCircleIcon color="teal" w={15} h={15} /> 
                                                    <Text ml="2"> Buy </Text>    
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </ListItem>
                                </List>
                            </GridItem>
                            <GridItem rowSpan={2}>
                                <Grid h='25vw' p="5" gap={4} >
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
                                                    <TabPanel  >               
                                                        <VStack  align="left" mt="6">
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
                                                        <Text fontSize='xl' mt="5" textAlign="center"> No Subdomains</Text>
                                                    </TabPanel>
                                                </TabPanels>
                                            </Tabs>
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
