import React from "react";
import Header from "components/Header";
import { ChakraProvider, Box, Link, VStack, Grid } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import customTheme from "utils/theme";
import LandingPage from "pages/LandingPage";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import Sawo from "pages/Sawo";

const App = () => {
	return (
		<ChakraProvider theme={customTheme}>
			<Header />
			<Box textAlign="center" fontSize="xl">
				<Grid minH="100vh" p={3}>
					<VStack spacing={8}>
						<Router>
							<Switch>
								<Route path="/" exact>
									<LandingPage />
								</Route>
								<Route path="/login" exact>
									<Login />
								</Route>
								<Route path="/signup" exact>
									<SignUp />
								</Route>
								<Route path="/sawo" exact>
									<Sawo />
								</Route>
							</Switch>
						</Router>
					</VStack>
				</Grid>
			</Box>
		</ChakraProvider>
	);
};

export default App;
