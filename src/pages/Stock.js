import { VStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Stock = () => {
	const [quote, setQuote] = useState({});
	const { symbol } = useParams();

	useEffect(() => {
		getQuote();
	}, []);

	const getQuote = async () => {
		const api_key = process.env.IEX_API_KEY;
		const res = await axios.get(
			`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${api_key}`
		);
		console.log(res.data);
		setQuote(res.data);
	};

	return (
		<VStack>
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

export default Stock;
