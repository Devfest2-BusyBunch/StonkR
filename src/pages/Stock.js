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
	Box,
	Center,
	Stack,
	List,
	ListIcon,
	useColorModeValue,
	FormHelperText,
	Heading,
	Link,
	RouterLink
} from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { supabase } from "supabaseClient";

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
		let { option, quantity } = inputValues;
		quantity = Number(quantity);

		if (quantity < 0) {
			console.log("not valid");
			return;
		}

		if (option === "Buy") {
			// BUY begins!

			const { data, error } = await supabase
				.from("users")
				.select("user_id, cash")
				.eq("user_id", userID);

			if (error) {
				console.log(error);
				return;
			}

			const cash = data[0].cash;
			await getQuote();
			const price = quote.latestPrice;

			if (cash < price * quantity) {
				console.log("not enough cash");
				return;
			}

			const { data: updated, error: updatedError } = await supabase
				.from("users")
				.update({ cash: Number(cash - price * quantity) })
				.eq("user_id", userID);

			const { data: portfolioData, error: portfolioError } = await supabase
				.from("portfolio")
				.select("user, symbol, quantity")
				.eq("user", userID);

			if (portfolioData.length === 0) {
				const { data: portfolioInsertData, error: portfolioInsertError } =
					await supabase
						.from("portfolio")
						.insert([{ user: userID, symbol, quantity }]);
			} else {
				const { data: portfolioUpdateData, error: portfolioUpdateError } =
					await supabase
						.from("portfolio")
						.update([{ quantity: portfolioData[0].quantity + quantity }])
						.eq("user", userID)
						.eq("symbol", symbol);
			}

			const { data: historyData, error: historyError } = await supabase
				.from("history")
				.insert([
					{ user: userID, symbol: symbol, operation: "buy", price, quantity },
				]);
		} else if (option === "Sell") {
			// SELL begins!

			const { data, error } = await supabase
				.from("users")
				.select("user_id, cash")
				.eq("user_id", userID);

			const cash = data[0].cash;
			await getQuote();
			const price = quote.latestPrice;

			if (error) {
				console.log(error);
				return;
			}

			const { data: portfolioData, error: portfolioError } = await supabase
				.from("portfolio")
				.select("user, symbol, quantity")
				.eq("user", userID);

			if (portfolioData[0].length === 0) {
				console.log("no portfolio");
				return;
			}

			let currentShares = portfolioData[0].quantity;
			if (currentShares < quantity) {
				console.log("not enough shares");
				return;
			}
			currentShares -= quantity;

			const { data: portfolioUpdatedData, error: portfolioUpdateError } =
				await supabase
					.from("portfolio")
					.update({ quantity: currentShares })
					.eq("user", userID)
					.eq("symbol", symbol);

			const { data: updatedUser, error: userError } = await supabase
				.from("users")
				.update({ cash: Number(cash + price * quantity) })
				.eq("user_id", userID);

			const { data: historyData, error: historyError } = await supabase
				.from("history")
				.insert([
					{
						user: userID,
						symbol: symbol,
						operation: "sell",
						price,
						quantity,
					},
				]);

			if (currentShares === 0) {
				await supabase
					.from("portfolio")
					.delete()
					.eq("user", userID)
					.eq("symbol", symbol);
			}
		}
	};
	const v1 = useColorModeValue("white", "gray.800");
	const v2 = useColorModeValue("gray.800", "white");
	const v3 = useColorModeValue("green.50", "green.900");
	const v4 = useColorModeValue("gray.100", "gray.900");

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
							<Stack textAlign={"center"} p={6} color={v2} align={"center"}>
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

							<Box bg={v4} px={6} py={10}>
								<List spacing={3}>
									{Object.keys(quote).map(key => (
										<ListItem key={key}>
											<ListIcon as={CheckIcon} color="green.400" />
											{key}: {quote[key]}{" "}
										</ListItem>
									))}

								</List>
							</Box>
						</Box>
					</Center>
				)}
			</Container>
		</VStack>
	);
};

export default Stock;
