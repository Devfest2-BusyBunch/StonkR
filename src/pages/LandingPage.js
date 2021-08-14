import { Logo } from "Logo";
import { Text, Link, Code, Grid } from "@chakra-ui/react";

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
		</>
	);
};

export default LandingPage;
