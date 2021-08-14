import { VStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Stock = () => {
	const [quote, setQuote] = useState({});
	const { symbol } = useParams();

	useEffect(() => {
		const getQuote = async () => {
			const API_KEY = process.env.REACT_APP_IEX_API_KEY;
			const res = await axios.get(
				`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`
			);
			setQuote(res.data);
		};

		getQuote();
	}, [symbol]);

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
