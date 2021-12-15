import { Link, Image, Text, Input, Box, Button, InputGroup, InputLeftAddon, Heading } from "@chakra-ui/react";
import { Search2Icon, LinkIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Grid, GridItem } from '@chakra-ui/react';
import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
} from '@chakra-ui/react'
import {
    ChakraProvider,
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

function Searchresults() {
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
                <Box w='100%' h='10' />
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
                    <Box d="flex" width="60vw">
                        <InputGroup>
                        <InputLeftAddon py="2rem" px="1rem" bg="white">
                            <Search2Icon color="gray.300" />
                        </InputLeftAddon>
                        <Input colorScheme="whiteAlpha"  p="2rem" variant="outline" placeholder="Search for .eth or .tez domains or addresses" bg="white" size="md" mr={0} />
                        </InputGroup>
                        <Button p="2rem" colorScheme='teal' borderRadius={0}>Search</Button>
                    </Box>
                </Box>
            </Box>

            <Box d="block">
                <Box d="flex" mt="10" justifyContent="center">
                    <Box d="flex" width="60vw">
                        <List spacing={3}>
                            <ListItem mt="5"   p="8" pb="10" borderRadius="10" boxShadow='xl'>
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
                                        <Link href='/domaindetails'>
                                            <Button colorScheme='teal' variant='outline' size='lg'> 
                                                <PlusSquareIcon color="teal" w={15} h={15} /> 
                                                <Text ml="2"> Register </Text>    
                                            </Button>
                                        </Link>
                                    </Box>
                                </Grid>
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Box>


        </Box>
    );
}

export default Searchresults;
