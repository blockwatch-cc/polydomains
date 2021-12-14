import { Input, Box, Button, InputGroup, InputLeftAddon, Heading } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

function App() {
  return (
    <Box bg="teal.100" minHeight="100vh" >
      <Box d="block">
        <Heading letterSpacing="wide" size="4xl" pt="56" textAlign="center">PolyDomains</Heading>
        <Box d="flex" mt="16" justifyContent="center">
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
    </Box>
  );
}

export default App;
