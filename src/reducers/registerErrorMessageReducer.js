const registerErrorMessageReducer = (state = 'halo', action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            state = "Invalid email or password"
            return state
        default:
            return state
    }
}
export default registerErrorMessageReducer;