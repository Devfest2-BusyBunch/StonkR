import { useState, useEffect } from "react";
import Header from "components/Header";
import { ChakraProvider, Box, VStack, Grid } from "@chakra-ui/react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";

import store from "redux/store";

import customTheme from "utils/theme";
import LandingPage from "pages/LandingPage";
import SawoLogin from "pages/SawoLogin";
import Calculator from "pages/Calculator";
import Quote from "pages/Quote";
import Stock from "pages/Stock";

const App = () => {
	let [token] = useState(false);

	token = localStorage.getItem("token");

	// useEffect(() => {
	// 	setToken(localStorage.getItem("token"));
	// }, []);

	return (
		<Provider store={store}>
			<ChakraProvider theme={customTheme}>
				<Header />
				<Box textAlign="center" fontSize="xl">
					<Grid minH="100vh" p={3}>
						<VStack spacing={8}>
							<Router>
								<Switch>
									<Route exact path="/">
										{token ? <LandingPage /> : <Redirect to="/signin" />}
									</Route>
									<Route exact path="/calculator">
										{token ? <Calculator /> : <Redirect to="/signin" />}
									</Route>
									<Route exact path="/quote">
										{token ? <Quote /> : <Redirect to="/signin" />}
									</Route>
									<Route exact path="/stocks/:symbol">
										{token ? <Stock /> : <Redirect to="/signin" />}
									</Route>
									<Route path="/signin" exact>
										<SawoLogin />
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
