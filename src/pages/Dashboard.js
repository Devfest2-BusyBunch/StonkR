import { Box, Text, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Candle from "components/Chart";
import Trending from "components/Trending";
import { supabase } from "supabaseClient";

const Dashboard = () => {
	const [userID, setUserID] = useState(null);
	const [userName, setUserName] = useState(null);

	useEffect(() => {
		const update = async () => {
			setUserID(JSON.parse(localStorage.getItem("userID")));

			const { data: userData, error } = await supabase
				.from("users")
				.select("user_id, username")
				.eq("user_id", userID);

			setUserName(userData[0].username);
		};

		update();
	}, []);

	return (
		<Box>
			<Text>Dashboard</Text>
			{userName && <Heading>Welcome {userName}</Heading>}
			<Box className="container side-bar">
				<Trending />
			</Box>
			<Box className="container chart_outer">
				<Candle />
			</Box>
		</Box>
	);
};

export default Dashboard;
