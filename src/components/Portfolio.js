import { useState, useEffect, useCallback } from "react";
import {
	Box,
	Heading,
	SimpleGrid,
	Stat,
	StatLabel,
	StatNumber,
	Spinner,
	useColorModeValue,
} from "@chakra-ui/react";
import { supabase } from "supabaseClient";
import axios from "axios";

const StatsCard = ({ title, quantity, amount }) => {
	return (
		<Stat
			px={{ base: 4, md: 8 }}
			py={"5"}
			shadow={"xl"}
			border={"1px solid"}
			borderColor={useColorModeValue("gray.800", "gray.500")}
			rounded={"lg"}>
			<StatLabel color={"red"} fontWeight={"medium"} isTruncated>
				{title}
			</StatLabel>
			<StatNumber fontSize={"1xl"} fontWeight={"medium"}>
				{quantity}
			</StatNumber>
			<StatNumber fontSize={"3xl"} fontWeight={"medium"}>
				{amount}
			</StatNumber>
		</Stat>
	);
};

const Portfolio = () => {
	const [portfolioData, setPortfolioData] = useState(null);
	const [userID, setUserID] = useState(null);
	const [loaded, setLoaded] = useState(false);

	const loadPortfolio = useCallback(async () => {
		// eslint-disable-next-line no-unused-vars
		const { data: portfolioUserData, error: portfolioError } = await supabase
			.from("portfolio")
			.select("user, symbol, quantity")
			.eq("user", userID);

		const API_KEY = process.env.REACT_APP_IEX_API_KEY;
		let flag = false;
		if (portfolioUserData.length > 0) {
			portfolioUserData.map(async (el, idx) => {
				const res = await axios.get(
					`https://cloud.iexapis.com/stable/stock/${el.symbol}/quote?token=${API_KEY}`
				);
				let { latestPrice: price } = res.data;
				if (idx === portfolioUserData.length - 1) {
					flag = true;
					console.log("set true");
				}
				return { ...el, amount: price * el.quantity };
			});
		}
		// setPortfolioData(portfolioUserData);
		// setLoaded(true);
		flag ? setPortfolioData(portfolioUserData) : console.log("wait");
		flag ? setLoaded(true) : console.log("waitl");
	}, [userID]);

	useEffect(() => {
		setUserID(JSON.parse(localStorage.getItem("userID")));
		loadPortfolio();
		portfolioData ? setLoaded(true) : console.log("not yet");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadPortfolio]);

	if (!loaded) {
		return (
			<Spinner
				thickness="4px"
				speed="0.65s"
				emptyColor="gray.200"
				color="blue.500"
				size="xl"
			/>
		);
	}

	return (
		<Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
			<Heading
				as="h1"
				textAlign={"center"}
				fontSize={"4xl"}
				py={10}
				fontWeight={"bold"}>
				Your Portfolio!
			</Heading>
			<SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
				{portfolioData.map(({ symbol, quantity, amount }) => (
					<StatsCard
						title={symbol.toUpperCase()}
						quantity={quantity}
						amount={amount}
					/>
				))}
			</SimpleGrid>
		</Box>
	);
};

export default Portfolio;
