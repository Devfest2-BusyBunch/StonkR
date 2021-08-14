import React from "react";
import Header from "components/Header";
import { ChakraProvider, Box, VStack, Grid } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import customTheme from "utils/theme";
import LandingPage from "pages/LandingPage";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import SawoLogin from "pages/SawoLogin";
import Quote from "pages/Quote";

const App = () => {
	return (
		<ChakraProvider theme={customTheme}>
			<Header />
			<Box textAlign="center" fontSize="xl">
				<Grid minH="80vh" p={3}>
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
									<SawoLogin />
								</Route>
								<Route path="/quote" exact>
									<Quote />
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
