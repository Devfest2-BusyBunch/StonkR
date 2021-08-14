import React from "react";
import Header from "components/Header";
import { ChakraProvider, Box, Link, VStack, Grid } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "redux/store";

import customTheme from "utils/theme";
import LandingPage from "pages/LandingPage";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import SawoLogin from "pages/SawoLogin";
import Calculator from "pages/Calculator";

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
                                    <Route path="/login" exact>
                                        <Login />
                                    </Route>
                                    <Route path="/signup" exact>
                                        <SignUp />
                                    </Route>
                                    <Route path="/sawo" exact>
                                        <SawoLogin />
                                    </Route>
                                    <Route path="/calculator" exact>
                                        <Calculator />
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
