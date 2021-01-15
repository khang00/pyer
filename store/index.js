import {User} from "~/plugins/User";

export const state = () => (
  {
    user: undefined
  }
)

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}

export const getters = {
  getUser(state) {
    return state.user
  }
}

export const actions = {
  async login({commit}, {localStream, username}) {
    commit('setUser', new User(localStream, username))
  },

  async callUser({state}, {calleeUsername}) {
    await state.user.callUser(calleeUsername)
  }
}
