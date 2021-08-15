import { useEffect, useState } from "react";
import ColorMode from "components/ColorMode";
import Header from "components/Header";
import LandingPage from "pages/LandingPage";
import { ChakraProvider, Box, VStack, Grid } from "@chakra-ui/react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import customTheme from "utils/theme";
import Dashboard from "pages/Dashboard";
import SawoLogin from "pages/SawoLogin";
import Calculator from "pages/Calculator";
import Quote from "pages/Quote";
import Stock from "pages/Stock";

import { addUserId } from "redux/actions";

const App = () => {
    let [token] = useState(false);

    token = localStorage.getItem("token");

    const dispatch = useDispatch();

    useEffect(() => {
        const userID = localStorage.getItem("userID")
            ? localStorage.getItem("userID")
            : "";
        dispatch(addUserId(userID));
    }, []);

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
                                    {token ? (
                                        <Dashboard />
                                    ) : (
                                        <Redirect to="/landing" />
                                    )}
                                </Route>
                                <Route exact path="/calculator">
                                    {token ? (
                                        <Calculator />
                                    ) : (
                                        <Redirect to="/landing" />
                                    )}
                                </Route>
                                <Route exact path="/quote">
                                    {token ? (
                                        <Quote />
                                    ) : (
                                        <Redirect to="/landing" />
                                    )}
                                </Route>
                                <Route exact path="/stocks/:symbol">
                                    {token ? (
                                        <Stock />
                                    ) : (
                                        <Redirect to="/landing" />
                                    )}
                                </Route>
                                <Route path="/landing" exact>
                                    <LandingPage />
                                </Route>
                                <Route path="/signin" exact>
                                    <SawoLogin />
                                </Route>
                            </Switch>
                        </VStack>
                    </Grid>
                </Box>
            </Router>
        </ChakraProvider>
    );
};

export default App;
