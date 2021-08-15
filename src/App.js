import { useState } from "react";
import ColorMode from "components/ColorMode";
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

    return (
        <Provider store={store}>
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
                                            <LandingPage />
                                        ) : (
                                            <Redirect to="/signin" />
                                        )}
                                    </Route>
                                    <Route exact path="/calculator">
                                        {token ? (
                                            <Calculator />
                                        ) : (
                                            <Redirect to="/signin" />
                                        )}
                                    </Route>
                                    <Route exact path="/quote">
                                        {token ? (
                                            <Quote />
                                        ) : (
                                            <Redirect to="/signin" />
                                        )}
                                    </Route>
                                    <Route exact path="/stocks/:symbol">
                                        {token ? (
                                            <Stock />
                                        ) : (
                                            <Redirect to="/signin" />
                                        )}
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
        </Provider>
    );
};

export default App;
