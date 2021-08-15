/* eslint-disable no-unused-vars */
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
	UnorderedList,
	ListItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { supabase } from "supabaseClient";
// import { useSelector } from "react-redux";

const Stock = () => {
	const [quote, setQuote] = useState({});
	const [inputValues, setInputValues] = useState(null);
	const [userID, setUserID] = useState(null);
	const { symbol } = useParams();

	useEffect(() => {
		const getQuote = async () => {
			const API_KEY = process.env.REACT_APP_IEX_API_KEY;
			const res = await axios.get(
				`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`
			);
			setQuote(res.data);
		};

		setUserID(JSON.parse(localStorage.getItem("userID")));
		getQuote();
	}, [symbol]);

	const getQuote = async () => {
		const API_KEY = process.env.REACT_APP_IEX_API_KEY;
		const res = await axios.get(
			`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`
		);
		setQuote(res.data);
	};

	const handleInputChange = event => {
		const target = event.target;
		const { value, name } = target;

		setInputValues(prevValues => {
			return {
				...prevValues,
				[name]: value,
			};
		});
	};

	function search(key, value, arr) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i][key] === value) {
				return arr[i];
			}
		}
	}

	const placeOrder = async e => {
		e.preventDefault();
		const { option, quantity } = inputValues;
		console.log(option, quantity);
		if (quantity < 0) {
			console.log("not valid");
			return;
		}

		if (option === "Buy") {
			const { data, error } = await supabase
				.from("users")
				.select("user_id, cash")
				.eq("user_id", userID);

			if (error) {
				console.log("error");
				return;
			}

			const cash = data.cash;
			getQuote();
			const price = quote.latestPrice;

			if (cash < price * quantity) {
				console.log("not enough cash");
				return;
			}

			const { data: updated, error: updatedError } = await supabase
				.from("users")
				.update({ cash: cash - price * quantity })
				.eq("user_id", userID);

			const { data: historyData, error: historyError } = await supabase
				.from("history")
				.insert([
					{ user: userID, symbol: symbol, operation: "buy", price, quantity },
				]);

			const { data: portfolioData, error: portfolioError } = await supabase
				.from("portfolio")
				.select("user_id, symbol")
				.eq("user_id", userID);

			if (!portfolioData) {
				const { data: portfolioInsertData, error: portfolioInsertError } =
					await supabase
						.from("portfolio")
						.insert([{ user: userID, symbol, quantity }]);
			} else {
				const { data: portfolioUpdateData, error: portfolioUpdateError } =
					await supabase
						.from("portfolio")
						.update([{ quantity: portfolioData.quantity + quantity }])
						.eq("user_id", userID)
						.eq("symbol", symbol);
			}
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
					{quote.companyName} - ${quote.latestPrice}
					<br />
					{inputValues?.option} - {inputValues?.quantity}
				</Text>
				<FormControl mt={2} isRequired>
					<FormLabel mt={1}>Trade Option</FormLabel>
					<Select
						name="option"
						placeholder="Select trade option"
						value={inputValues?.option || ""}
						onChange={handleInputChange}
						isRequired>
						<option>Buy</option>
						<option>Sell</option>
					</Select>
					<FormLabel mt={1}>Quantity</FormLabel>
					<Input
						type="number"
						name="quantity"
						value={inputValues?.quantity || ""}
						onChange={handleInputChange}
						min={0}
					/>
					<Button type="submit" onClick={placeOrder} mt={2}>
						Place Order
					</Button>
				</FormControl>
			</Container>
			<UnorderedList className="list-none">
				{Object.keys(quote).map(key => (
					<ListItem key={key}>
						{key}: {quote[key]}{" "}
					</ListItem>
				))}
			</UnorderedList>
		</VStack>
	);
};

export default Stock;
