/* eslint-disable no-unused-vars */
import {
	useToast,
	VStack,
	Text,
	Container,
	FormControl,
	Input,
	Select,
	FormLabel,
	Spinner,
	Button,
	ListItem,
	Box,
	Center,
	Stack,
	List,
	ListIcon,
	useColorModeValue,
	FormHelperText,
	Heading,
} from "@chakra-ui/react";
import Candle from "components/Chart";
import { ArrowRightIcon, CheckCircleIcon, SpinnerIcon } from "@chakra-ui/icons";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { supabase } from "supabaseClient";

const Stock = () => {
	const [quote, setQuote] = useState(null);
	const [dataProp, setDataProp] = useState(null);
	const [inputValues, setInputValues] = useState(null);
	const [userID, setUserID] = useState(null);
	const [userCash, setUserCash] = useState(null);
	const { symbol } = useParams();
	const toast = useToast();

	const getQuote = useCallback(async () => {
		const API_KEY = process.env.REACT_APP_IEX_API_KEY;
		const res = await axios.get(
			`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`
		);
		setQuote(res.data);
	}, [symbol]);

	useEffect(() => {
		const gettingDataForChart = async () => {
			const res = await axios.get(
				`https://sandbox.iexapis.com/stable/stock/${symbol}/chart/2m?token=${process.env.REACT_APP_SANDBOX_IEX_API_KEY}`
			);
			const data = res.data;
			setDataProp(data);
		};

		const getUserCash = async () => {
			const { data: userData, error } = await supabase
				.from("users")
				.select("user_id, cash")
				.eq("user_id", userID);
			setUserCash(userData[0].cash);
		};

		setUserID(JSON.parse(localStorage.getItem("userID")));
		getQuote();
		getUserCash();
		gettingDataForChart();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [symbol, getQuote, userID]);

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
			toast({
				title: "Invalid quantity",
				description: "Quantity should be greater than 0",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
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
				toast({
					title: `${error}`,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
				return;
			}

			const cash = data[0].cash;
			await getQuote();
			const price = quote.latestPrice;

			if (cash < price * quantity) {
				console.log("not enough cash");
				toast({
					title: "Not enough cash",
					description: "Could Not buy",
					status: "error",
					duration: 3000,
					isClosable: true,
				});
				return;
			}

			const { data: updated, error: updatedError } = await supabase
				.from("users")
				.update({ cash: Number(cash - price * quantity) })
				.eq("user_id", userID);

			const { data: portfolioData, error: portfolioError } = await supabase
				.from("portfolio")
				.select("user, symbol, quantity")
				.eq("user", userID)
				.eq("symbol", symbol);

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
				.insert([{ user: userID, symbol, operation: "buy", price, quantity }]);

			toast({
				title: `Bought ${quantity} shares!`,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
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
				toast({
					title: `${error}`,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
				return;
			}

			const { data: portfolioData, error: portfolioError } = await supabase
				.from("portfolio")
				.select("user, symbol, quantity")
				.eq("user", userID);

			if (portfolioData[0].length === 0) {
				console.log("You don't own any shares of this stock");
				toast({
					title: `You don't own any shares of this ${symbol}`,
					status: "info",
					isClosable: true,
				});
				return;
			}

			let currentShares = portfolioData[0].quantity;
			if (currentShares < quantity) {
				console.log("Not enough shares bro, really sorry");
				toast({
					title: "Not enough shares",
					status: "error",
					duration: 3000,
					isClosable: true,
				});
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
						symbol,
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

			toast({
				title: `Sold ${quantity} shares!`,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
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
					{quote.companyName} : ${quote.latestPrice}
					<br />
					{inputValues?.option} {inputValues?.quantity}{" "}
					{inputValues?.quantity &&
						`{Total: ${inputValues?.quantity * quote.latestPrice}}`}
					{userCash && `Cash: ${userCash}`}
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
							maxW={"700px"}
							minW={"350px"}
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
									<ListItem>
										<ListIcon as={ArrowRightIcon} color="green.400" />
										Latest Price : {quote.latestPrice}
									</ListItem>
									<ListItem>
										<ListIcon as={CheckCircleIcon} color="green.400" />
										Primary Exchange : {quote.primaryExchange}
									</ListItem>
									<ListItem>
										<ListIcon as={CheckCircleIcon} color="green.400" />
										Low : {quote.low}
									</ListItem>
									<ListItem>
										<ListIcon as={CheckCircleIcon} color="green.400" />
										High : {quote.high}
									</ListItem>
									<ListItem>
										<ListIcon as={CheckCircleIcon} color="green.400" />
										Open : {quote.open}
									</ListItem>
									<ListItem>
										<ListIcon as={CheckCircleIcon} color="green.400" />
										Close : {quote.close}
									</ListItem>
									<ListItem>
										<ListIcon as={CheckCircleIcon} color="green.400" />
										Change : {quote.change}
									</ListItem>
									<ListItem>
										<ListIcon as={CheckCircleIcon} color="green.400" />
										Volume : {quote.volume}
									</ListItem>
									<ListItem>
										<ListIcon as={CheckCircleIcon} color="green.400" />
										P/E Ratio : {quote.peRatio}
									</ListItem>
									<ListItem>
										<ListIcon as={CheckCircleIcon} color="green.400" />
										YTD Change : {quote.ytdChange}
									</ListItem>
									<ListItem>
										<ListIcon as={CheckCircleIcon} color="green.400" />
										Change : {quote.changePercent} %
									</ListItem>
									<ListItem>
										<ListIcon as={CheckCircleIcon} color="green.400" />
										Currency : {quote.currency}
									</ListItem>
								</List>
							</Box>
						</Box>
					</Center>
				)}
			</Container>
			{dataProp ? (
				<Candle dataProp={dataProp} />
			) : (
				<Spinner
					thickness="10px"
					speed="0.55s"
					emptyColor="gray.900"
					color="blue.800"
					size="lg"
				/>
			)}
		</VStack>
	);
};

export default Stock;
