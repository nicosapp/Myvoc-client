export const state = () => ({
  dictionnaries: null,
  categories: null,
  types: null,
  grammars: null,
  levels: null,
})

export const getters = {
  dictionnaries(state) {
    return state.dictionnaries
  },
  categories(state) {
    return state.categories
  },
  grammars(state) {
    return state.grammars
  },
  types(state) {
    return state.types
  },
  levels(state) {
    return state.levels
  },
}

export const mutations = {
  SET_DICTIONNARIES(state, value) {
    state.dictionnaries = value
  },
  SET_CATEGORIES(state, value) {
    state.categories = value
  },
  SET_TYPES(state, value) {
    state.types = value
  },
  SET_GRAMMARS(state, value) {
    state.grammars = value
  },
  SET_LEVELS(state, value) {
    state.levels = value
  },
}

export const actions = {
  getConfig({ dispatch }) {
    dispatch('getDictionnaries')
  },
  getDictionnaries({ commit }) {
    const value = [
      { key: 'fra', value: 'French' },
      { key: 'ang', value: 'English' },
      { key: 'all', value: 'German' },
      { key: 'esp', value: 'Spanish' },
      { key: 'ita', value: 'Italian' },
    ]
    commit('SET_DICTIONNARIES', value)
  },
  async getCategories({ commit }) {
    const response = await this.$axios.$get('categories')
    commit('SET_CATEGORIES', response.data)
  },
  getTypes({ commit }) {
    const value = [
      'word',
      'locution',
      'expression',
      'example',
      'definition',
      'quote',
      'note',
      'grammar',
      'acronym',
    ]
    commit('SET_TYPES', value)
  },

  getLevels({ commit }) {
    const value = ['soutenu', 'courant', 'familier']
    commit('SET_LEVELS', value)
  },

  getGrammars({ commit }) {
    const value = ['verbe', 'nom', 'adjectif', 'adverbe']
    commit('SET_GRAMMARS', value)
  },
}
