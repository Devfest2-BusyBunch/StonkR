import { useState, useEffect } from "react";
import Sawo from "sawo";
import { addUserId } from "redux/actions";
import { useDispatch } from "react-redux";
import { Spinner } from "@chakra-ui/react";

const API_KEY = process.env.REACT_APP_SAWO_API_KEY;

const SawoLogin = ({ loggedIn }) => {
	const [payload, setPayload] = useState({});
	const [isUserLoggedIn, setUserLoggedIn] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	loggedIn = isUserLoggedIn;

	useEffect(() => {
		setPayload(JSON.parse(localStorage.getItem("payload")) || {});
		setUserLoggedIn(JSON.parse(localStorage.getItem("payload")) ? true : false);

		var config = {
			containerID: "sawo-container",
			identifierType: "email",
			apiKey: API_KEY,
			onSuccess: payload => {
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
			},
		};
		let sawo = new Sawo(config);
		sawo.showForm();

		setTimeout(() => {
			setLoaded(true);
		}, 2000);
	}, [dispatch]);

	return (
		<div className="containerStyle">
			<section>
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
				<>
					<h2 className="title">
						User Logged In : {isUserLoggedIn.toString()}
					</h2>

					{!isUserLoggedIn ? (
						<div className="formContainer" id="sawo-container"></div>
					) : (
						<div className="loggedin">
							<h2>User Successful Login</h2>
							<div>UserId: {payload.user_id}</div>
							<div>Verification Token: {payload.verification_token}</div>
						</div>
					)}
				</>
				{/* )} */}
			</section>
		</div>
	);
};

export default SawoLogin;
