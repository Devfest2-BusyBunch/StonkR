import {
    VStack,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
    Link,
    ListItem,
    Container,
    useToast,
} from "@chakra-ui/react";

import {
    Box,
    Center,
    Text,
    Stack,
    List,
    ListIcon,
    useColorModeValue,
} from "@chakra-ui/react";
import { ArrowRightIcon, CheckCircleIcon } from "@chakra-ui/icons";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import Candle from "components/Chart";

const Quote = () => {
    const [quote, setQuote] = useState(null);
    const [symbol, setSymbol] = useState(null);
    const [dataProp, setDataProp] = useState(null);
    const toast = useToast();
    const handleInputChange = (event) => {
        setSymbol(event.target.value);
    };

    useEffect(() => {
        const gettingDataForChart = async () => {
            const rsp = await axios.get(
                `https://cloud.iexapis.com/stable/stock/${symbol}/chart/2m?token=pk_eae71671468a4161b60df617d889adad`
            );
            const data = rsp.data;
            setDataProp(data);
        };
        gettingDataForChart();
    }, [symbol]);

    const getQuote = async (event) => {
        event.preventDefault();
        const API_KEY = process.env.REACT_APP_IEX_API_KEY;
        try {
            const res = await axios.get(
                `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`
            );

            if (res.status !== 404) {
                toast({
                    title: "Success getting quote",
                    description: "We've created a quote for you.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            }

            setQuote(res.data);

            console.log(res.data);
        } catch (error) {
            toast({
                title: "Failed getting quote",
                description: "We could not locate that stock symbol",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const v1 = useColorModeValue("white", "gray.800");
    const v2 = useColorModeValue("gray.800", "white");
    const v3 = useColorModeValue("green.50", "green.900");
    const v4 = useColorModeValue("gray.100", "gray.900");

    return (
        <VStack>
            <FormControl onSubmit={getQuote}>
                <FormLabel>Symbol</FormLabel>
                <Input
                    type="text"
                    value={symbol || ""}
                    name="symbol"
                    onChange={handleInputChange}
                />
                <FormHelperText>Enter the stock symbol</FormHelperText>
                <Button
                    colorScheme="teal"
                    size="md"
                    onClick={getQuote}
                    mt="2"
                    type="submit"
                >
                    Get Quote!
                </Button>
            </FormControl>
            <Container>
                {quote && (
                    <Center py={6}>
                        <Box
                            maxW={"700px"}
                            minW={"350px"}
                            w={"full"}
                            bg={v1}
                            boxShadow={"2xl"}
                            rounded={"md"}
                            overflow={"hidden"}
                        >
                            <Stack
                                textAlign={"center"}
                                p={6}
                                color={v2}
                                align={"center"}
                            >
                                <Text
                                    fontSize={"sm"}
                                    fontWeight={500}
                                    bg={v3}
                                    p={2}
                                    px={3}
                                    color={"green.500"}
                                    rounded={"full"}
                                >
                                    {quote.symbol}
                                </Text>
                                <Stack
                                    direction={"row"}
                                    align={"center"}
                                    justify={"center"}
                                >
                                    <Text fontSize={"3xl"}>$</Text>
                                    <Text fontSize={"3xl"} fontWeight={800}>
                                        {quote.companyName}
                                    </Text>
                                </Stack>
                            </Stack>

                            <Box bg={v4} px={6} py={10}>
                                <List spacing={3}>
                                    <ListItem>
                                        <ListIcon
                                            as={ArrowRightIcon}
                                            color="green.400"
                                        />
                                        Latest Price : {quote.latestPrice}
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon
                                            as={CheckCircleIcon}
                                            color="green.400"
                                        />
                                        Primary Exchange :{" "}
                                        {quote.primaryExchange}
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon
                                            as={CheckCircleIcon}
                                            color="green.400"
                                        />
                                        Low : {quote.low}
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon
                                            as={CheckCircleIcon}
                                            color="green.400"
                                        />
                                        High : {quote.high}
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon
                                            as={CheckCircleIcon}
                                            color="green.400"
                                        />
                                        Open : {quote.open}
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon
                                            as={CheckCircleIcon}
                                            color="green.400"
                                        />
                                        Close : {quote.close}
                                    </ListItem>
                                </List>

                                <Link
                                    as={RouterLink}
                                    to={`stocks/${symbol.toLowerCase()}`}
                                >
                                    <Button
                                        mt={10}
                                        w={"full"}
                                        bg={"green.400"}
                                        color={"white"}
                                        rounded={"xl"}
                                        boxShadow={
                                            "0 5px 20px 0px rgb(72 187 120 / 43%)"
                                        }
                                        _hover={{
                                            bg: "green.500",
                                        }}
                                        _focus={{
                                            bg: "green.500",
                                        }}
                                    >
                                        Trade this
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    </Center>
                )}
            </Container>
            {dataProp ? (
                <Candle dataProp={dataProp} />
            ) : (
                console.log("error fetchging data for chart")
            )}
        </VStack>
    );
};

export default Quote;
