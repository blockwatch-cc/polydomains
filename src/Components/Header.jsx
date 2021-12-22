import {
    Flex,
    Input, 
    Box, 
    Button, 
    InputGroup, 
    InputLeftAddon, 
    Heading,
    Stack,
    Select
} from '@chakra-ui/react'
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search2Icon } from "@chakra-ui/icons";

import { WalletContext } from '../context/wallet';
import { TezosConnections } from "../services/web3/client"

export const Header = ({ showSearch }) => {
    const [domain, setDomain] = useState('')
    const { app, setApp } = useContext(WalletContext)

    const handleDomainInputChange = (e) => {
        setDomain(e.target.value)
    }

    const handleChangeNetwork = (e) => {
        setApp((a) => ({ ...a, network: e.target.value }))
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
            {showSearch ?
                <Box d="flex" mt="5">
                    <InputGroup>
                    <InputLeftAddon py="1rem" px="1rem" bg="white">
                        <Search2Icon color="gray.300" />
                    </InputLeftAddon>
                    <Input 
                        colorScheme="whiteAlpha"  
                        p="1rem" 
                        variant="outline" 
                        placeholder="Search address" 
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
                </Box> : null}
            <Stack spacing={3} mt="5">
                <Select size='sm' value={app.network} onChange={handleChangeNetwork}>
                    {Object.keys(TezosConnections).map((network, idx) => (
                        <option value={network} key={`${network}-${idx}`}>{network}</option>
                    ))}
                </Select>
            </Stack>
        </Flex>
    )
}