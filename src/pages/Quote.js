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
					onClick={() => {
						getQuote();
						window.location.href = `/stocks/${symbol.toLowerCase()}`;
					}}
					mt="2"
					type="submit">
					Get Quote!
				</Button>
			</FormControl>
			<Container>
				{symbol && (
					<Heading size="md">
						<Link as={RouterLink} to={`stocks/${symbol.toLowerCase()}`}>
							{quote.companyName}
						</Link>
					</Heading>
				)}
				<UnorderedList className="list-none">
					{Object.keys(quote).map(key => (
						<ListItem key={key}>
							{key}: {quote[key]}{" "}
						</ListItem>
					))}
				</UnorderedList>
			</Container>
		</VStack>
	);
};

export default Quote;
