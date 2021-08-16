/* eslint-disable no-unused-vars */
import { supabase } from "supabaseClient";
import axios from "axios";

const getPortfolio = async userID => {
	const { data: portfolioData, error: portfolioError } = await supabase
		.from("portfolio")
		.select("user, symbol, quantity")
		.eq("user", userID);
	return { portfolioData, portfolioError };
};

const getQuote = async symbol => {
	const API_KEY = process.env.REACT_APP_IEX_API_KEY;
	const res = await axios.get(
		`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`
	);
	return res.data;
};

const assets = async userID => {
	const { data, error } = await supabase
		.from("users")
		.select("user_id, cash")
		.eq("user_id", userID);

	let total = data[0].cash;
	const { portfolioData, portfolioError } = await getPortfolio(userID);

	portfolioData.forEach(async stock => {
		let { symbol, quantity } = stock;
		const API_KEY = process.env.REACT_APP_IEX_API_KEY;
		const res = await axios.get(
			`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`
		);
		let { latestPrice: price } = res.data;
		let amount = Number(price) * Number(quantity);
		total = total + amount;
	});

	if (portfolioData.assets > portfolioData.cash) {
		const { data: assetUpdateData, error: assetUpdateError } = await supabase
			.from("users")
			.update({ assets: total })
			.eq("user_id", userID);
	} else {
		console.log("working on it");
	}
};

export default assets;
