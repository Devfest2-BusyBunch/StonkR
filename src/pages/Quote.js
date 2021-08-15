import {
	VStack,
	Button,
	Input,
	FormControl,
	FormLabel,
	FormHelperText,
	Heading,
	Link,
	UnorderedList,
	ListItem,
	Container,
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
import { CheckIcon } from "@chakra-ui/icons";

import { useState } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

const Quote = () => {
	const [quote, setQuote] = useState(null);
	const [symbol, setSymbol] = useState(null);

	const handleInputChange = event => {
		const target = event.target;
		const { value } = target;

		setSymbol(value);
	};

	const getQuote = async event => {
		event.preventDefault();
		const API_KEY = process.env.REACT_APP_IEX_API_KEY;
		const res = await axios.get(
			`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`
		);
		setQuote(res.data);
		console.log(res.data);
	};
	const v1 = useColorModeValue('white', 'gray.800')
	const v2 = useColorModeValue('gray.800', 'white')
	const v3 = useColorModeValue('green.50', 'green.900')
	const v4 = useColorModeValue('gray.100', 'gray.900')

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
					type="submit">
					Get Quote!
				</Button>
			</FormControl>
			<Container>
				{quote && (
					<Center py={6}>
						<Box
							maxW={"330px"}
							w={"full"}
							bg={v1}
							boxShadow={"2xl"}
							rounded={"md"}
							overflow={"hidden"}>
							<Stack
								textAlign={"center"}
								p={6}
								color={v2}
								align={"center"}>
								<Text
									fontSize={"sm"}
									fontWeight={500}
									bg={v3}
									p={2}
									px={3}
									color={"green.500"}
									rounded={"full"}>
									{quote.symbol}
								</Text>
								<Stack direction={"row"} align={"center"} justify={"center"}>
									<Text fontSize={"3xl"}>$</Text>
									<Text fontSize={"3xl"} fontWeight={800}>
										{quote.companyName}
									</Text>
								</Stack>
							</Stack>

							<Box
								bg={v4}
								px={6}
								py={10}>
								<List spacing={3}>
									<ListItem>
										<ListIcon as={CheckIcon} color="green.400" />
										primaryExchange: {quote.primaryExchange}
									</ListItem>
									<ListItem>
										<ListIcon as={CheckIcon} color="green.400" />
										currency: {quote.currency}
									</ListItem>
									<ListItem>
										<ListIcon as={CheckIcon} color="green.400" />
										high: {quote.high}
									</ListItem>
									<ListItem>
										<ListIcon as={CheckIcon} color="green.400" />
										low: {quote.low}
									</ListItem>
								</List>

								<Link as={RouterLink} to={`stocks/${symbol.toLowerCase()}`}>
									<Button
										mt={10}
										w={"full"}
										bg={"green.400"}
										color={"white"}
										rounded={"xl"}
										boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
										_hover={{
											bg: "green.500",
										}}
										_focus={{
											bg: "green.500",
										}}>
										Trade this
									</Button>
								</Link>
							</Box>
						</Box>
					</Center>
				)}
			</Container>
		</VStack>
	);
};

export default Quote;
