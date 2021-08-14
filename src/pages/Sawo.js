const Sawo = () => {
	var config = {
		// should be same as the id of the container created on 3rd step
		containerID: "sawo-container",
		// can be one of 'email' or 'phone_number_sms'
		identifierType: "email",
		// Add the API key copied from 2nd step
		apiKey: "09af634a-c1f5-4198-bf10-b394bcb43ba0",
		// Add a callback here to handle the payload sent by sdk
		onSuccess: payload => {
			console.log(payload);
		},
	};

	let sawo = new Sawo(config);
	sawo.showForm();

	return <div id="sawo-container" style="height: 300px; width: 300px;"></div>;
};

export default Sawo;
