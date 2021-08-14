const initialState = {
	userId: "",
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_USER_ID":
			return {
				...state,
				userId: action.payload,
			};
	}
};

export default reducer;
