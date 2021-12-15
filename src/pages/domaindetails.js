import { Image, Text, Input, Box, Button, InputGroup, InputLeftAddon, Heading, IconButton } from "@chakra-ui/react";
import { Search2Icon, HamburgerIcon, LinkIcon, CheckCircleIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Grid, GridItem } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import {
    Link,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
} from '@chakra-ui/react'
import {
    ChakraProvider,
    VStack,
    HStack,
    Radio,
    RadioGroup,
    useRadio,
    useRadioGroup
  } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'


function CustomRadio(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();
  
    
    return (
        <Box as="label">
            <input {...input} />
            <Box {...checkbox} _checked={{ color: "fuchsia" }} textAlign="center" p="2">
                <Image
                    boxSize='75px'
                    objectFit='contain'
                    src={process.env.PUBLIC_URL + props.children.img}
                />
                <Text fontSize='xs' mt="2"> {props.children.name} </Text>
            </Box>
        </Box>
    );
  }

function MappedGroup() {
    const list = [{
            img: './assets/icons/walletconnect.svg',
            name: "WalletConnect",
            describe: "Scan with WalletConnect to connect",
        },
        {
            img: './assets/icons/portis.svg',
            name: "Portis",
            describe: "Scan with Portis to connect",
        },
        {
            img: './assets/icons/torus.svg',
            name: "Torus",
            describe: "Scan with Torus to connect",
        },
        {
            img: './assets/icons/mewwallet.png',
            name: "MEW wallet",
            describe: "Scan with MEW wallet to connect",
        },
        {
            name: "Coinbase Wallet",
            img: './assets/icons/coinnbasewallet.svg',
            describe: "Scan with Coinbase Wallet to connect",
        }
    ];

    const { getRootProps, getRadioProps } = useRadioGroup({
      name: "test",
      defaultValue: "two",
      onChange: console.log
    });
  
    const group = getRootProps();
    return (
      // Surprisingly one doesn't use <RadioGroup> but instead something like <HStack>
      <HStack w='100%' {...group}>
        <Grid h='200px' w='100%' templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4}>    
            {list.map((item) => (
                <GridItem colSpan={1} bg='white' borderRadius="10" boxShadow='xl'>
                    <CustomRadio key={item} {...getRadioProps({ value: item })}>
                        {item}
                    </CustomRadio>
                </GridItem>
            ))}                
        </Grid>
      </HStack>
    );
}

function Domaindetails() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const options = ['react', 'vue', 'svelte']

    const { getRootProps, getRadioProps } = useRadioGroup({
      name: 'framework',
      defaultValue: 'react',
      onChange: console.log,
    })
  
    const group = getRootProps()

    return (
        <Box minHeight="100vh" >
            <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                <Box w='100%' h='10'>
                    <Heading letterSpacing="wide" size="1xl" pt="5" textAlign="center">PolyDomains</Heading>
                </Box>
                <Box w='100%' h='10' />
                <Box w='100%' h='10' />
                <Box w='100%' h='10'>
                    <Box d="flex" width="30vw" mt="5">
                        <InputGroup>
                        <InputLeftAddon py="1rem" px="1rem" bg="white">
                            <Search2Icon color="gray.300" />
                        </InputLeftAddon>
                        <Input colorScheme="whiteAlpha"  p="1rem" variant="outline" placeholder="Search for .eth or .tez domains or addresses" bg="white" size="md" mr={0} />
                        </InputGroup>
                        <Button p="1rem" colorScheme='teal' borderRightRadius="10">Search</Button>
                    </Box>
                </Box>
                <Box w='100%' h='10'>
                    <Button onClick={onOpen} colorScheme='teal' variant='outline' mt="5" size='sm'> <LinkIcon color="teal" w={15} h={15} /> <Text ml="2"> Connect Wallet </Text></Button>

                    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size={'xl'}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Connect to Wallet</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>                                
                                <MappedGroup w='100%'/>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                    Connect
                                </Button>
                                <Button variant='ghost'>Close</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            </Grid>
            <Box d="block">
                <Box d="flex" mt="10" justifyContent="center">
                    <Box d="flex" width="80vw" borderRadius="10" boxShadow='xl'>
                        
                        <Grid>
                            <GridItem rowSpan={2}>
                                <List spacing={3}>
                                    <ListItem mt="5"   p="8" pb="10" >
                                        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                                            <Box w='100%' h='10'>
                                                <Heading letterSpacing="wide" size="2xl" textAlign="center">Abdulwallet.tz</Heading>
                                            </Box>
                                            <Box w='100%' h='10' />
                                            <Box w='100%' h='10' />
                                            <Box w='100%' h='10'>
                                                <Text bgClip="text" fontSize="2xl" mt="2" color="black">
                                                    Availabe
                                                </Text>
                                            </Box>
                                            <Box w='100%' h='10'>
                                                <Button colorScheme='teal' variant='outline' size='lg' onClick={onOpen}> 
                                                    <CheckCircleIcon color="teal" w={15} h={15} /> 
                                                    <Text ml="2"> Buy </Text>    
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </ListItem>
                                </List>
                            </GridItem>

                            <GridItem rowSpan={2}>
                                <Grid
                                h='25vw'
                                p="5"
                                // templateRows='repeat(2, 1fr)'
                                // templateColumns='repeat(5, 1fr)'
                                gap={4}
                                >
                                    {/* <GridItem rowSpan={2} colSpan={1} bg='tomato' /> */}
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

                                                        <VStack  align="left" mt="10">
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
                                                        <Text fontSize='xl' mt="5" textAlign="center"> No Subdomains </Text>
                                                    
                                                    </TabPanel>
                                                </TabPanels>
                                            </Tabs>
                                    </GridItem>
                                    {/* <GridItem colSpan={2} bg='papayawhip' />
                                    <GridItem colSpan={2} bg='tomato' /> */}
                                </Grid>
                            </GridItem>

                        </Grid>
                           
                    </Box>

                </Box>
            </Box>


        </Box>
    );
}

export default Domaindetails;
