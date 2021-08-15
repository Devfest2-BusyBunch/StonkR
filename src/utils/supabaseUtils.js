/* eslint-disable import/no-anonymous-default-export */
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

	if (portfolioData.length > 0) {
		portfolioData.forEach(async stock => {
			console.log(stock);
			let { symbol, quantity } = stock;
			let { latestPrice: price } = await getQuote(symbol);
			let amount = Number(price) * Number(quantity);
			total = total + amount;
		});
	}

	const { data: assetUpdateData, error: assetUpdateError } = await supabase
		.from("users")
		.update({ assets: total })
		.eq("user_id", userID);
};

export default assets;
