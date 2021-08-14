import {
	VStack,
	Text,
	Container,
	FormControl,
	Input,
	Select,
	FormLabel,
	Spinner,
	Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { supabase } from "supabaseClient";
import { useSelector } from "react-redux";

const Stock = () => {
	const [quote, setQuote] = useState({});
	const [inputValues, setInputValues] = useState(null);

	const { symbol } = useParams();
	// const stateName = useSelector(state => state.userId);

	useEffect(() => {
		const getQuote = async () => {
			const API_KEY = process.env.REACT_APP_IEX_API_KEY;
			const res = await axios.get(
				`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`
			);
			setQuote(res.data);
		};

		getQuote();
		console.log(stateName);
	}, [symbol]);

	const handleInputChange = event => {
		const target = event.target;
		const { value, name } = target;

		setInputValues(prevValues => {
			return {
				...prevValues,
				[name]: value,
			};
		});

		console.log(inputValues);
	};

	const placeOrder = async e => {
		e.preventDefault();
		const { option, quantity } = inputValues;
		if (option == "Buy") {
			const { data, error } = await supabase
				.from("users")
				.select("cash")
				.filter("user_id", "eq");
		}
	};

	if (!quote) {
		return (
			<VStack>
				<Spinner
					thickness="10px"
					speed="0.55s"
					emptyColor="gray.900"
					color="blue.800"
					size="xl"
				/>
			</VStack>
		);
	}

	return (
		<VStack>
			<Container>
				<Text>
					{quote.companyName} - {quote.latestPrice}
				</Text>
				<FormControl mt={2} isRequired onSubmit={placeOrder}>
					<Select
						name="option"
						placeholder="Select trade option"
						value={inputValues?.option || ""}
						onChange={handleInputChange}>
						<option>Buy</option>
						<option>Sell</option>
					</Select>
					<FormLabel mt={1}>Quantity</FormLabel>
					<Input
						type="number"
						name="quantity"
						value={inputValues?.quantity || ""}
						onChange={handleInputChange}
					/>
					<Button type="submit">Place Order</Button>
				</FormControl>
			</Container>
			<Text>
				{Object.keys(quote).map(key => (
					<>
						<span key={key}>
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
