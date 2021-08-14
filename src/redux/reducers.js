const initialState = {
    userId: "",
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USER_ID":
            return {
                ...state,
                userId: action.payload,
            };
    }
};

export default Reducer;
