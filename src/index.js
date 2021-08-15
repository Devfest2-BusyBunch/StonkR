import { ColorModeScript } from "@chakra-ui/react";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "App";
import "./styles.css";
import { Provider } from "react-redux";
import store from "redux/store";

ReactDOM.render(
	<StrictMode>
		<ColorModeScript initialColorMode="dark" useSystemColorMode={false} />

		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
	document.getElementById("root")
);
