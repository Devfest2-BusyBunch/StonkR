import { Box, Text, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Candle from "components/Chart";
import Trending from "components/Trending";
import { supabase } from "supabaseClient";
import Portfolio from "components/Portfolio";

const Dashboard = () => {
	const [userID, setUserID] = useState(null);
	const [userName, setUserName] = useState(null);

	useEffect(() => {
		setUserID(JSON.parse(localStorage.getItem("userID")));
		const update = async () => {
			const { data: userData, error } = await supabase
				.from("users")
				.select("user_id, username")
				.eq("user_id", userID);
			userData.length > 0 ? setUserName(userData[0].username) : console.log("");
		};

		update();
	}, [userID]);

	return (
		<>
			
		<Box>
			<Box>
				{userName ? <Heading>Welcome {userName}</Heading> : console.log("err")}
			</Box>
			<Box className="container side-bar">
				<Trending />
			</Box>
				<Box><Portfolio /></Box>
			<Box width={'min'} className="container chart_outer">
				<Candle />
			</Box>
		
		</Box>
		</>
	);
};

export default Dashboard;
