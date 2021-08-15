import { useState, useEffect } from "react";
import Sawo from "sawo";
import { addUserId } from "redux/actions";
import { useDispatch } from "react-redux";
// import { Spinner } from "@chakra-ui/react";
import { supabase } from "supabaseClient";
import randName from "utils/usernameUtils";
import { Heading, Box, Text } from "@chakra-ui/react";

const API_KEY = process.env.REACT_APP_SAWO_API_KEY;

const SawoLogin = ({ loggedIn }) => {
	const [payload, setPayload] = useState({});
	const [isUserLoggedIn, setUserLoggedIn] = useState(false);
	// const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	loggedIn = isUserLoggedIn;

	useEffect(() => {
		setPayload(JSON.parse(localStorage.getItem("payload")) || {});
		setUserLoggedIn(JSON.parse(localStorage.getItem("payload")) ? true : false);

		var config = {
			containerID: "sawo-container",
			identifierType: "email",
			apiKey: API_KEY,
			onSuccess: async payload => {
				console.log("Payload : " + JSON.stringify(payload));
				setUserLoggedIn(true);
				setPayload(payload);
				dispatch(addUserId(payload.user_id));
				localStorage.setItem("userID", JSON.stringify(payload.user_id));
				localStorage.setItem("payload", JSON.stringify(payload));
				localStorage.setItem(
					"token",
					JSON.stringify(payload.verification_token)
				);

				// eslint-disable-next-line no-unused-vars
				let { data: users, error } = await supabase
					.from("users")
					.select("user_id");
				console.log(users);
				if (!users.includes(payload.user_id)) {
					console.log("User does not exist");
					// eslint-disable-next-line no-unused-vars
					const { data, error } = await supabase
						.from("users")
						.insert([{ user_id: payload.user_id, username: randName() }]);
					console.log(data);
				}
			},
		};
		let sawo = new Sawo(config);
		sawo.showForm();

		// setTimeout(() => {
		// 	setLoaded(true);
		// }, 2000);
	}, [dispatch]);

	if (isUserLoggedIn) {
		window.location.reload();
	}

	return (
		<Box className="containerStyle">
			{/* <section> */}
			{/* {!loaded && (
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="blue.500"
						size="xl"
					/>
				)} */}
			{/* {loaded && ( */}
			{/* <> */}
			<Heading className="title">
				User Logged In : {isUserLoggedIn.toString()}
			</Heading>

			{!isUserLoggedIn ? (
				<div
					className="formContainer"
					id="sawo-container"
					style={{ height: "300px", width: "300px" }}></div>
			) : (
				<Box className="loggedin">
					<h2>User Successful Login</h2>
					<Text>UserId: {payload.user_id}</Text>
					<Text>Verification Token: {payload.verification_token}</Text>
				</Box>
			)}
			{/* </>
            </section> */}
		</Box>
	);
};

export default SawoLogin;
