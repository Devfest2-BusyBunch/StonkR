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
import { useSelector } from "react-redux";

const Stock = () => {
	const [quote, setQuote] = useState({});
	const [inputValues, setInputValues] = useState(null);

	const { symbol } = useParams();
	const userID = localStorage.getItem("userID");

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

	const placeOrder = async e => {
		e.preventDefault();
		const { option, quantity } = inputValues;
		console.log(option, quantity);
		if (quantity < 0) {
			console.log("not valid");
			return;
		}
		if (option === "Buy") {
			console.log(userID);
			const { data: cash, error } = await supabase
				.from("users")
				.select("cash")
				.eq("user_id", userID);

			console.log("error", error);
			console.log(cash);

			getQuote();
			if (cash < quantity * quote.latestPrice) {
				console.log("not enough cash");
				return;
			}

			const { data: updated } = await supabase
				.from("users")
				.update({ cash: Number(cash - quantity * quote.latestPrice) })
				.eq("user_id", userID);
			console.log(updated);
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
