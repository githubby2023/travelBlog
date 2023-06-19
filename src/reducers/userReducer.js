const UserReducer = (state = "", action) => {
    switch (action.type) {
        case 'USER':
            return {uid: action.payload.uid}
        default:
            return state;
    }
}
export default UserReducer;