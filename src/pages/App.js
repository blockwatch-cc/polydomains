import { Link, Center, Image, Input, Box, Button, InputGroup, InputLeftAddon, Heading } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";


function App() {
  return (
    // bg="teal.100"
    <Box  minHeight="100vh" >
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
              <Input colorScheme="whiteAlpha"  p="2rem" variant="outline" placeholder="Search for .eth or .tez domains or addresses" bg="white" size="md" mr={0} />
            </InputGroup>
            <Link href='/searchresults'>
                <Button p="2rem" colorScheme='teal' borderRadius={0}>Search</Button>
            </Link>
            
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
