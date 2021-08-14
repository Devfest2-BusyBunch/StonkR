import { useState, useEffect } from "react";
import Sawo from "sawo";

const API_KEY = process.env.REACT_APP_API_KEY; // Process env not working so hard coded it

const SawoLogin = () => {
	const [isUserLoggedIn, setUserLoggedIn] = useState(false);
	const [payload, setPayload] = useState({});

	useEffect(() => {
		var config = {
			containerID: "sawo-container",
			identifierType: "email",
			apiKey: "09af634a-c1f5-4198-bf10-b394bcb43ba0",
			onSuccess: payload => {
				console.log("Payload : " + JSON.stringify(payload));
				setUserLoggedIn(true);
				setPayload(payload);
			},
		};
		let sawo = new Sawo(config);
		sawo.showForm();
	}, []);

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
