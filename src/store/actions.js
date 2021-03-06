import chatkit from '../chatkit';

function handleError(commit, error) {
    const message = error.message || error.info.error_description;
    commit('setError', message);
}

export default {
    async login({ commit, state }, userId) {
        try {
            commit("setError", "");
            commit("setLoading", true);
            const currentUser = await chatkit.connectUser(userId);

            // eslint-disable-next-line
            commit('setUser', {
                username: currentUser.id,
                name: currentUser.name
            });
            commit("setReconnect", false);

            // eslint-disable-next-line
            console.log(state.user.username);
        } catch (error) {
            handleError(commit, error);
        } finally {
            commit('setLoading', false);
        }
    }
}