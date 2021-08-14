import React from "react";
import Header from "components/Header";
import { ChakraProvider, Box, VStack, Grid } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "redux/store";

import customTheme from "utils/theme";
import LandingPage from "pages/LandingPage";
import SawoLogin from "pages/SawoLogin";
import Calculator from "pages/Calculator";
import Quote from "pages/Quote";
import Stock from "pages/Stock";

const App = () => {
	return (
		<Provider store={store}>
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
									<Route path="/signin" exact>
										<SawoLogin />
									</Route>
									<Route path="/calculator" exact>
										<Calculator />
									</Route>
									<Route path="/quote" exact>
										<Quote />
									</Route>
									<Route path="/stocks/:symbol" exact>
										<Stock />
									</Route>
								</Switch>
							</Router>
						</VStack>
					</Grid>
				</Box>
			</ChakraProvider>
		</Provider>
	);
};

export default App;
