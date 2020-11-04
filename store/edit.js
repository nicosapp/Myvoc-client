export const state = () => ({
  dialogs: [],
})

export const getters = {
  dialogs(state) {
    return state.dialogs
  },
}

export const mutations = {
  PUSH_DIALOG(state, dialog) {
    state.dialogs = [...state.dialogs, ...[dialog]]
  },
  REMOVE_DIALOG(state, index) {
    state.dialogs = state.dialogs.filter((d, i) => i !== index)
  },
  UPDATE_DIALOG(state, { index, dialog }) {
    state.dialogs = state.dialogs.map((d, i) => {
      if (index === i) {
        return dialog
      }
      return d
    })
  },
}

export const actions = {
  pushDialog({ commit }, dialog) {
    commit('PUSH_DIALOG', dialog)
  },
  destroyDialog({ commit }, index) {
    commit('REMOVE_DIALOG', index)
  },
  updateDialog({ commit }, { index, dialog }) {
    commit('UPDATE_DIALOG', { index, dialog })
  },
}
