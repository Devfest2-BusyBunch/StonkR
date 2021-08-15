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
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

import { useState } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

const Quote = () => {
	const [quote, setQuote] = useState({});
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
					onClick={ getQuote}
					// {
						// ();
						// window.location.href = `/stocks/${symbol.toLowerCase()}`;
					// }}
					mt="2"
					type="submit">
					Get Quote!
				</Button>
			</FormControl>
			<Container>
				{/* {symbol && (
					<Heading size="md">
						<Link as={RouterLink} to={`stocks/${symbol.toLowerCase()}`}>
							{quote.companyName}
						</Link>
					</Heading>
				)} */}
				{/* <UnorderedList className="list-none">
					{Object.keys(quote).map(key => (
						<ListItem key={key}>
							{key}: {quote[key]}{" "}
						</ListItem>
					))}
				</UnorderedList> */}
				{quote && symbol &&
				(<Center py={6}>
					<Box
						maxW={'330px'}
						w={'full'}
						// bg={useColorModeValue('white', 'gray.800')}
						boxShadow={'2xl'}
						rounded={'md'}
						overflow={'hidden'}>
						<Stack
							textAlign={'center'}
							p={6}
							// color={useColorModeValue('gray.800', 'white')}
							align={'center'}>
							<Text
								fontSize={'sm'}
								fontWeight={500}
								// bg={useColorModeValue('green.50', 'green.900')}
								p={2}
								px={3}
								color={'green.500'}
								rounded={'full'}>
								{quote.symbol}
							</Text>
							<Stack direction={'row'} align={'center'} justify={'center'}>
								<Text fontSize={'3xl'}>$</Text>
								<Text fontSize={'3xl'} fontWeight={800}>
									{quote.companyName}
								</Text>
								{/* <Text color={'gray.500'}>/month</Text> */}
							</Stack>
						</Stack>

						<Box
							// bg={useColorModeValue('gray.50', 'gray.900')}
							px={6}
							py={10}
						>
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
								w={'full'}
								bg={'green.400'}
								color={'white'}
								rounded={'xl'}
								boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
								_hover={{
									bg: 'green.500',
								}}
								_focus={{
									bg: 'green.500',
								}}>
									Trade this
							</Button>
								</Link>
						</Box>
					</Box>
				</Center>)}
			</Container>
		</VStack>
	);
};

export default Quote;
