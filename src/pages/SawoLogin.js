import { useState, useEffect } from "react";
import Sawo from "sawo";
import { addUserId } from "redux/actions";
import { useDispatch } from "react-redux";
import { supabase } from "supabaseClient";
import randName from "utils/usernameUtils";
import { Heading, Box, Text, useToast } from "@chakra-ui/react";

const API_KEY = process.env.REACT_APP_SAWO_API_KEY;

const SawoLogin = ({ loggedIn }) => {
	const [payload, setPayload] = useState({});
	const [isUserLoggedIn, setUserLoggedIn] = useState(false);
	const toast = useToast();
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
					toast({
						title: `User does not exist`,
						description: "The requested user does not exist, try Signing Up",
						status: "error",
						isClosable: true,
					});
					// eslint-disable-next-line no-unused-vars
					const randomUsername = randName();
					// eslint-disable-next-line
					const { data, error } = await supabase
						.from("users")
						.insert([{ user_id: payload.user_id, username: randomUsername }]);
					console.log(data);
					console.log("username", randomUsername, payload.user_id);
				}
			},
		};
		let sawo = new Sawo(config);
		sawo.showForm();
	}, [dispatch, toast]);

	if (isUserLoggedIn) {
		window.location.reload();
	}

	return (
		<Box className="containerStyle">
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
		</Box>
	);
};

export default SawoLogin;
