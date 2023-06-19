export const updateUser = (uid) => {
    return {
        type: "USER",
        payload: {
            uid: uid,
        },
    };
}

export const removeUser = () => {
    return {
        type: "USER",
        payload: {
            uid: "",
        },
    };
}