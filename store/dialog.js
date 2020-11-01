export const state = () => ({
  component: '',
  title: '',
  message: '',
  data: null,
  visible: false,
  color: null,
  okFunction: null,
  cancelFunction: null,
})

export const getters = {
  component(state) {
    return state.component
  },
  title(state) {
    return state.title
  },
  message(state) {
    return state.message
  },
  data(state) {
    return state.data
  },
  visible(state) {
    return state.visible
  },
  color(state) {
    return state.color
  },
  okFunction(state) {
    return state.okFunction
  },
  cancelFunction(state) {
    return state.cancelFunction
  },
}

export const mutations = {
  SHOW_DIALOG(state, payload) {
    state.visible = true
    state.component = payload.component || 'DialogDefault'
    state.title = payload.title || null
    state.message = payload.message || ''
    state.data = payload.data || null
    state.color = payload.color || null
    state.okFunction = payload.okFunction || null
    state.cancelFunction = payload.cancelFunction || null
  },
  SET_VISIBLE(state, value) {
    state.visible = value
  },
}

export const actions = {
  setVisible({ commit }, value) {
    commit('SET_VISIBLE', value)
  },
  showDialog({ commit }, payload) {
    commit('SHOW_DIALOG', payload)
  },
}
