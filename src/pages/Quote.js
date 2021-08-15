import {
	VStack,
	Text,
	Button,
	Input,
	FormControl,
	FormLabel,
	FormHelperText,
	Heading,
	Link,
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
					onClick={getQuote}
					mt="2"
					type="submit">
					Get Quote!
				</Button>
			</FormControl>
			<Text>
				{symbol && (
					<Heading as="h3" size="md">
						<Link as={RouterLink} to={`stocks/${symbol.toLowerCase()}`}>
							{quote.companyName}
						</Link>
					</Heading>
				)}
				{Object.keys(quote).map(key => (
					<>
						<span>
							{key}: {quote[key]}{" "}
						</span>
						<br />
					</>
				))}
			</Text>
		</VStack>
	);
};

export default Quote;
