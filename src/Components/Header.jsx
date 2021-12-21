import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,
    Text, 
    Input, 
    Box, 
    Button, 
    InputGroup, 
    InputLeftAddon, 
    Heading, 
    useDisclosure,
    FormControl,
    FormLabel,
    Stack,
    Select,
    Option,
    Textarea
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search2Icon, LinkIcon, CheckCircleIcon } from "@chakra-ui/icons";

import { Wallets } from "./Wallets";
import { WalletContext } from '../context/wallet';

export const Header = ({ showSearch }) => {
    const [domain, setDomain] = useState('')
    const [secretKey, setSecretKey] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { account, setAccount } = useContext(WalletContext)

    const handleDomainInputChange = (e) => {
        setDomain(e.target.value)
    }

    const handleSecretInputChange = (e) => {
        setSecretKey(e.target.value)
    }

    const handleConnectWallet = (account) => {
        setAccount(account)
        onClose()
    }

    const disconnectWallet = () => {
        setAccount(null)
    }

    useEffect(() => {
        console.log("account, ", account)
    }, [])

    return (
        <Flex justifyContent="space-between" mx={40}>
            <Box>
                <Link to={{
                    pathname: "/"
                }}>
                    <Heading letterSpacing="wide" size="1xl" pt="5" textAlign="center">PolyDomains</Heading>
                </Link>
            </Box>
            <Flex>
                {showSearch ?
                    <Box d="flex" mt="5" mr="5">
                        <InputGroup>
                        <InputLeftAddon py="1rem" px="1rem" bg="white">
                            <Search2Icon color="gray.300" />
                        </InputLeftAddon>
                        <Input 
                            colorScheme="whiteAlpha"  
                            p="1rem" 
                            variant="outline" 
                            placeholder="Search for .eth or .tez domains or addresses" 
                            bg="white" 
                            size="md"
                            onChange={handleDomainInputChange}
                            mr={0} 
                        />
                        </InputGroup>
                        <Link to={{
                            pathname: '/search',
                            search: `?domain=${domain}`
                            }}>
                                <Button p="1rem" colorScheme='teal' borderRadius={0}>Search</Button>
                        </Link>
                    </Box> : 
                    
                    <FormControl display='flex' alignItems='center' mt="5">
                        <Stack spacing={3}>
                            <Select size='sm'>
                                <option value="Tezos Mainnet"> Tezos Mainnet</option>
                                <option value="Granada Testnet"> Granada Testnet</option>
                                <option value="Hangzhounet Testnet"> Hangzhounet Testnet</option>
                                <option value="Idiazabalnet Testnet"> Idiazabalnet Testnet</option>
                                <option value="localhost:8732"> localhost:8732</option>
                            </Select>
                        </Stack>
                    </FormControl>
                }
                
                {!account ? 
                    <Button onClick={onOpen} colorScheme='teal' variant='outline' mt="6" size='sm' width='230px'> 
                        <LinkIcon color="teal" w={15} h={15} /> 
                        <Text ml="2"> Connect Wallet</Text>
                    </Button> :
                    <Button onClick={disconnectWallet} colorScheme='green' variant='outline' mt="6" size='sm' width='230px'> 
                        <LinkIcon color="green" w={15} h={15} /> 
                        <Text ml="2"> connected</Text>
                    </Button>
                } 
                
            </Flex>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Connect to Wallet</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>                                
                        <Wallets />
                        <Box mb="4">
                        {/* <Input
                            value={secretKey}
                            onChange={handleSecretInputChange}
                            placeholder='Paste your secret key here'
                            size='sm'
                        /> */}
                        
                        <Textarea 
                            value={secretKey}
                            onChange={handleSecretInputChange}
                            rows="10"
                            placeholder='Paste your secret key here' />

                        <Text fontSize="x-small" mt="1">Get a secret key from here.</Text>
                    </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleConnectWallet({
                            secretKey
                        })}>
                            Import
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}