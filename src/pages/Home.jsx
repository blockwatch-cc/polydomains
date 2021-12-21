import { useState } from "react";
import { Link } from "react-router-dom"
import { Search2Icon } from "@chakra-ui/icons";
import { Center, Image, Input, Box, Button, InputGroup, InputLeftAddon, Heading } from "@chakra-ui/react";

function Home() {
  const [domain, setDomain] = useState('')

  const handleSetDomain = (e) => {
    setDomain(e.target.value)
  }

  return (
     <Box minHeight="100vh" >
        <Box d="block" >
          <Center w='100%'>
            <Image justifyContent="center" boxSize='20vw' pt="0" objectFit='contain' src={process.env.PUBLIC_URL + './assets/search.png'}/>
          </Center>        
          <Heading letterSpacing="wide" size="4xl"  textAlign="center">PolyDomains</Heading>
          <Box d="flex" mt="16" justifyContent="center">
            <Box d="flex" width="60vw">
              <InputGroup>
                <InputLeftAddon py="2rem" px="1rem" bg="white">
                  <Search2Icon color="gray.300" />
                </InputLeftAddon>
                <Input 
                  variant="outline" 
                  colorScheme="whiteAlpha"  
                  placeholder="Search for .tez domains or addresses" 
                  onChange={handleSetDomain}
                  value={domain}
                  bg="white" 
                  size="md" 
                  mr={0} 
                  p="2rem" 
                />
              </InputGroup>
              <Link to={{
                pathname: '/search',
                search: `?domain=${domain}`
              }}>
                  <Button p="2rem" colorScheme='teal' borderRadius={0}>Search</Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
  );
}

export default Home;
