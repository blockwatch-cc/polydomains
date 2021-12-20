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
    useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search2Icon, LinkIcon } from "@chakra-ui/icons";

import { Wallets } from "./Wallets";

export const Header = ({ showSearch }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [domain, setDomain] = useState('')

    const handleInputChange = (e) => {
        setDomain(e.target.value)
    }
    
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
                    <Box d="flex" mt="5" mr="7">
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
                            onChange={handleInputChange}
                            mr={0} 
                        />
                        </InputGroup>
                        <Link to={{
                            pathname: '/search',
                            search: `?domain=${domain}`
                            }}>
                                <Button p="1rem" colorScheme='teal' borderRadius={0}>Search</Button>
                        </Link>
                    </Box> : null}
                <Button onClick={onOpen} colorScheme='teal' variant='outline' mt="6" size='sm'> 
                    <LinkIcon color="teal" w={15} h={15} /> 
                    <Text ml="2"> Connect Wallet</Text>
                </Button>
            </Flex>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Connect to Wallet</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>                                
                        <Wallets />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Connect
                        </Button>
                        <Button variant='ghost'>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}