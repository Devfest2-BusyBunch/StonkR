import Candle from "components/Chart";
import Trending from "components/Trending";
import { Box } from "@chakra-ui/react";

const Dashboard = () => {
	return (
		<Box>
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
