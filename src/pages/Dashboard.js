import Candle from "components/Chart";
import Trending from "components/Trending";

const Dashboard = () => {
	return (
		<>
			<div className="container side-bar">
				<Trending />
			</div>
			<div className="container chart_outer">
				<Candle />
			</div>
		</>
	);
};

export default Dashboard;
