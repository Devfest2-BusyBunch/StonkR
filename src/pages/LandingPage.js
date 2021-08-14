import { Logo } from "Logo";
import { Text, Link, Code, Grid } from "@chakra-ui/react";
import Candle from "components/Chart";

const LandingPage = () => {
	return (
		<>
			<Logo h="40vmin" pointerEvents="none" />
			<Text>
				Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
			</Text>
			<Link
				color="teal.500"
				href="https://chakra-ui.com"
				fontSize="2xl"
				target="_blank"
				rel="noopener noreferrer">
				Learn Chakra
			</Link>
			<div className="container chart_outer">
				<Candle/>
			</div>
		</>
	);
};

export default LandingPage;
