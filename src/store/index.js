import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate' // Pengganti vuex-persist
import mutations from './mutations'
import actions from './actions'

const debug = import.meta.env.VITE_NODE_ENV !== 'production'

export default createStore({
  state: () => ({
    loading: false,
    isLoadingAddMember: false,
    sending: false,
    error: null,
    user: null,
    reconect: false,
    activeRoom: null,
    rooms: [
    ],
    users: [
    ],
    messages: [
    ],
    userTyping: null,
  }),
  mutations,
  actions,
  getters: {
    hasError: state => !!state.error
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage
    })
  ],
  strict: debug
})
