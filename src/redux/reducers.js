const initialState = {
    userId: "",
};

const reducer = (state = initialState, action) => {
    // eslint-disable-next-line
    switch (action.type) {
        case "ADD_USER_ID":
            return {
                ...state,
                userId: action.payload,
            };
    }
};

export default reducer;
