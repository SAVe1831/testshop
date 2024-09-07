const authModule = {
    state: {
        isAuth: false
    },
    mutations: {
        setAuth(state, value) {
            state.isAuth = value;
        }
    }
}

export default authModule