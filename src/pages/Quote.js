import {
	VStack,
	Text,
	Button,
	Input,
	FormControl,
	FormLabel,
	FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const Quote = () => {
	const [quote, setQuote] = useState({});
	const [symbol, setSymbol] = useState(null);

	const handleInputChange = event => {
		const target = event.target;
		const { value } = target;

		setSymbol(value);
	};

	const getQuote = async () => {
		// const api_key = "pk_eae71671468a4161b60df617d889adad";
		const api_key = process.env.IEX_API_KEY;
		const res = await axios.get(
			`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${api_key}`
		);
		console.log(res.data);
		setQuote(res.data);
	};

	return (
		<VStack>
			<FormControl>
				<FormLabel>Symbol</FormLabel>
				<Input
					type="text"
					value={symbol || ""}
					name="symbol"
					onChange={handleInputChange}
				/>
				<FormHelperText>Enter the stock symbol</FormHelperText>
				<Button colorScheme="teal" size="md" onClick={getQuote} mt="2">
					Get Quote!
				</Button>
			</FormControl>
			<Text>
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
