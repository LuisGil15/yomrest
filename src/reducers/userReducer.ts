const InitialState = {
    userName: "",
    token: ""
}

export const userReducer = (state = InitialState, action?: any) => {

    if (action.type === "@type/SET_USER") {
        return action.payload;
    }

    return state;
}

export const setUser = (state: any) => {
    return {
        type: "@type/SET_USER",
        payload: state
    }
}