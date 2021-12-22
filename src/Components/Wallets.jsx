import { 
    Image, 
    Text, 
    Box, 
    Grid, 
    GridItem,
    HStack,
    useRadio,
    useRadioGroup
} from '@chakra-ui/react'

import walletconnect from '../assets/icons/walletconnect.svg';
import portis from '../assets/icons/portis.svg';
import torus from '../assets/icons/torus.svg';

const SUPPORTED_WALLETS = [
    {
        img: walletconnect,
        name: "Import Private Key",
        describe: "Import from private key",
        availability: true
    },
    {
        img: portis,
        name: "Temple Wallet",
        describe: "Scan with Portis to connect",
        availability: false
    },
    {
        img: torus,
        name: "Beacon",
        describe: "Scan with Torus to connect",
        availability: false
    },
];

export const CustomRadio = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();
  
    return (
        <Box as="label">
            <input {...input} />
            <Box {...checkbox} _checked={{ color: "fuchsia" }} textAlign="center" p="2" >
                <Image
                    boxSize='75px'
                    objectFit='contain'
                    src={props.children.img}
                />
                <Text fontSize='xs' mt="2"> {props.children.name} </Text>
            </Box>
        </Box>
    );
  }

export const Wallets = () => {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "test",
        defaultValue: "two",
        onChange: console.log
    })
    const group = getRootProps();

    return (
        <Box>
            <HStack w='100%' {...group}>
                <Grid h='200px' w='100%' templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4}>    
                    {SUPPORTED_WALLETS.map((item) => (
                        <GridItem colSpan={1} bg={item.availability? '#ffffff' : '#eaeaea' } borderRadius="10" boxShadow='xl' key={`${item.name}-${item.img}`}> 
                            <CustomRadio key={item} {...getRadioProps({ value: item })}>
                                {item}
                            </CustomRadio>
                        </GridItem>
                    ))}                
                </Grid>
            </HStack>
        </Box>
    );
}