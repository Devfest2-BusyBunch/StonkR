import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";
function Trending() {
	const [trends, setTrends] = useState([]);

	useEffect(() => {
		axios({
			method: "get",
			url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=7&page=1&sparkline=false&price_change_percentage=14d",
		})
			.then(res => res.data)
			.then(doc => {
				setTrends(doc);
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<div>
			<div className="container">
				{trends.map(trend => {
					return (
						<Box bg="blue" w="100%" p={4} color="white">
							{trend.name} change {trend.price_change_percentage_24h} %
						</Box>
					);
				})}
			</div>
		</div>
	);
}

export default Trending;
