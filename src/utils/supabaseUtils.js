/* eslint-disable import/no-anonymous-default-export */
import { supabase } from "supabaseClient";

const getPortfolio = async userID => {
	const { data: portfolioData, error: portfolioError } = await supabase
		.from("portfolio")
		.select("user_id, symbol")
		.eq("user_id", userID);
	return { portfolioData, portfolioError };
};

export default { getPortfolio };
