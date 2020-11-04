export const state = () => ({
  visible: false,
  component: null,
  term: null,
})

export const getters = {
  visible(state) {
    return state.visible
  },
  component(state) {
    return state.component
  },
  term(state) {
    return state.term
  },
}

export const mutations = {
  SET_BOTTOM_SHEET(state, payload) {
    state.component =
      payload.component !== undefined ? payload.component : state.component
    state.visible =
      payload.visible !== undefined ? payload.visible : state.visible
    state.term = payload.term !== undefined ? payload.term : state.term
  },
}

export const actions = {
  setBottomSheet({ commit }, payload) {
    commit('SET_BOTTOM_SHEET', payload)
  },
}
