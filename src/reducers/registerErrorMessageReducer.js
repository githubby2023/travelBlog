const registerErrorMessageReducer = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_ERROR_MESSAGE':
            state = "Register failed, please check your email and password"
            return state
        default:
            return state
    }
}
export default registerErrorMessageReducer;