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

      commit('setUser', {
        username: currentUser.id,
        name: currentUser.name,
        isAdmin: currentUser.role == "admin",
      });
      commit("setReconnect", false);

      const rooms = currentUser.rooms.map(room => ({
        id: room.id,
        name: room.id,
        type: room.type
      }))
      commit('setRooms', rooms);

      if (rooms.length > 0) {
        const activeRoom = state.activeRoom || rooms[0];
        commit('setActiveRoom', {
          id: activeRoom.id,
          name: activeRoom.name,
          type: activeRoom.type ?? "messaging",
        });
        await chatkit.subscribeToRoom(activeRoom.id, activeRoom.type)
      }

      commit("resetStatus");
      return true;
    } catch (error) {
      handleError(commit, error);
    } finally {
      commit('setLoading', false);
    }
  },

  async changeRoom({ commit }, room) {
    try {
      const { id, name, type } = await chatkit.subscribeToRoom(room.id, room.type);
      commit("setActiveRoom", { id, name, type });
    } catch (error) {
      handleError(commit, error);
    }
  },

  async sendMessage({ commit }, message) {
    try {
      commit("setError", '');
      commit("setSending", true);
      const messageId = await chatkit.sendMessage(message);
      commit("setSending", false);
      return messageId;
    } catch (error) {
      handleError(commit, error);
    }
  },

  async logout({ commit }) {
    commit('reset');
    chatkit.disconnectUser();
    window.localStorage.clear();
  },

  async addMember({ commit }, userId) {
    commit("setLoadingAddMember", true);
    await chatkit.addMemberIntoChannel(userId);
    commit("setLoadingAddMember", false);
  },

  async removeMember({ commit }, userId) {
    await chatkit.removeMemberFromChannel(userId);
  }
}
