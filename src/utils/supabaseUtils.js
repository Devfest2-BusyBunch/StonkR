/* eslint-disable import/no-anonymous-default-export */
import { supabase } from "supabaseClient";
import axios from "axios";

const getPortfolio = async userID => {
	const { data: portfolioData, error: portfolioError } = await supabase
		.from("portfolio")
		.select("user_id, symbol")
		.eq("user_id", userID);
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
	// eslint-disable-next-line
	const { data, error } = await supabase
		.from("users")
		.select("user_id, cash")
		.eq("user_id", userID);

	let total = data[0].cash;
	// eslint-disable-next-line
	const { portfolioData, portfolioError } = await getPortfolio(userID);

	for (let stock in portfolioData) {
		let { symbol, quantity } = stock;
		let price = getQuote(symbol);
		let amount = price * quantity;
		total = total + amount;
	}
	// eslint-disable-next-line
	const { data: assetUpdateData, error: assetUpdateError } = await supabase
		.from("users")
		.update("assets", total)
		.eq("user_id", userID);

	// return { total, assetUpdateData, assetUpdateError };
};

export default assets;
