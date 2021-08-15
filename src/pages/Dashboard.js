import Candle from "components/Chart";
import Trending from "components/Trending";
import { Box } from "@chakra-ui/react";

const Dashboard = () => {
	return (
		<Box>
			<div className="container side-bar">
				<Trending />
			</div>
			<div className="container chart_outer">
				<Candle />
			</div>
		</Box>
	);
};

export default Dashboard;
