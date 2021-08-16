import { Box, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Trending from "components/Trending";
import { supabase } from "supabaseClient";
import Portfolio from "components/Portfolio";

const Dashboard = () => {
	const [userID, setUserID] = useState(null);
	const [userName, setUserName] = useState(null);

	useEffect(() => {
		setUserID(JSON.parse(localStorage.getItem("userID")));
		const update = async () => {
			// eslint-disable-next-line
			const { data: userData, error } = await supabase
				.from("users")
				.select("user_id, username")
				.eq("user_id", userID);
			userData.length > 0
				? setUserName(userData[0].username)
				: setUserName(null);
		};

		update();
	}, [userID]);

	return (
		<>
			<Box>
				<Box>
					{userName ? (
						<Heading>Welcome {userName}</Heading>
					) : (
						console.log("err")
					)}
				</Box>
				<Box className="container side-bar">
					<Trending />
				</Box>
				<Box>
					<Portfolio />
				</Box>
				<Box
					d="flex"
					alignItems="center"
					justifyContent="center"
					mt={16}
					width={"min"}
					className="container chart_outer"></Box>
			</Box>
		</>
	);
};

export default Dashboard;
