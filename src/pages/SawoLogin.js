import { useState, useEffect } from "react";
import Sawo from "sawo";
import { addUserId } from "../redux/actions";
import { useDispatch } from "react-redux";

const API_KEY = process.env.REACT_APP_SAWO_API_KEY;

const SawoLogin = ({ loggedIn }) => {
	const [payload, setPayload] = useState({});
	const [isUserLoggedIn, setUserLoggedIn] = useState(false);
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
			},
		};
		let sawo = new Sawo(config);
		sawo.showForm();;
	}, [dispatch]);
	
	return (
		<div className="containerStyle">
			<section>
				<h2 className="title">User Logged In : {isUserLoggedIn.toString()}</h2>

				{!isUserLoggedIn ? (
					<div className="formContainer" id="sawo-container"></div>
				) : (
					<div className="loggedin">
						<h2>User Successful Login</h2>
						<div>UserId: {payload.user_id}</div>
						<div>Verification Token: {payload.verification_token}</div>
					</div>
				)}
			</section>
		</div>
	);
};

export default SawoLogin;
