import { useEffect, useState } from "react";
import ColorMode from "components/ColorMode";
import Header from "components/Header";
import Footer from "components/Footer";
import { ChakraProvider, Box, VStack, Grid } from "@chakra-ui/react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import { useDispatch } from "react-redux";
import { addUserId } from "redux/actions";
import Leaderboard from "pages/Leaderboard";
import customTheme from "utils/theme";
import LandingPage from "pages/LandingPage";
import Dashboard from "pages/Dashboard";
import SawoLogin from "pages/SawoLogin";
import Calculator from "pages/Calculator";
import Quote from "pages/Quote";
import Stock from "pages/Stock";
import About from "pages/About";
import ErrorPage from "pages/ErrorPage";

const App = () => {
	let [token] = useState(false);

	token = localStorage.getItem("token");

	const dispatch = useDispatch();

	useEffect(() => {
		const userID = localStorage.getItem("userID")
			? localStorage.getItem("userID")
			: "";
		dispatch(addUserId(userID));
	}, [dispatch]);

	return (
		<ChakraProvider theme={customTheme}>
			<Router>
				<div className="top-bar">
					<Header />
					<ColorMode />
				</div>
				<Box textAlign="center" fontSize="xl">
					<Grid minH="100vh" p={3}>
						<VStack spacing={8}>
							<Switch>
								<Route exact path="/">
									<LandingPage />
								</Route>
								<Route exact path="/dashboard">
									{token ? <Dashboard /> : <Redirect to="/signin" />}
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
									{token ? <Redirect to="/dashboard" /> : <SawoLogin />}
								</Route>
								<Route path="/about" exact>
									<About />
								</Route>
								<Route path="/leaderboard" exact>
									<Leaderboard />
								</Route>
								<Route path="/404" exact>
									<ErrorPage />
								</Route>
								<Route path="/">
									<Redirect to="404" />
								</Route>
							</Switch>
						</VStack>
					</Grid>
				</Box>
				<Footer />
			</Router>
		</ChakraProvider>
	);
};

export default App;
