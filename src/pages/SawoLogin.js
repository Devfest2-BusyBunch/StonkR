import { useState, useEffect } from "react";
import Sawo from "sawo";
import {addUserId} from '../redux/actions'
import {useDispatch} from 'react-redux'

const API_KEY = process.env.REACT_APP_SAWO_API_KEY;

const SawoLogin = () => {
	const [isUserLoggedIn, setUserLoggedIn] = useState(false);
	const [payload, setPayload] = useState({});
	const dispatch = useDispatch()
	useEffect(() => {
		var config = {
			containerID: "sawo-container",
			identifierType: "email",
			apiKey: API_KEY,
			onSuccess: payload => {
				console.log("Payload : " + JSON.stringify(payload));
				setUserLoggedIn(true);
				setPayload(payload);
				dispatch(addUserId(payload.user_id))
				localStorage.setItem('user-id', JSON.stringify(payload.user_id))

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
