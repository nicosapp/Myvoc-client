export const state = () => ({
  dictionnaries: null,
  categories: null,
  nestedCategories: null,
  types: null,
  grammars: null,
  levels: null,
  ratings: null,
  highlights: null,
  tags: null,
})

export const getters = {
  dictionnaries(state) {
    return state.dictionnaries
  },
  categories(state) {
    return state.categories
  },
  nestedCategories(state) {
    return state.nestedCategories
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
  ratings(state) {
    return state.ratings
  },
  highlights(state) {
    return state.highlights
  },
  tags(state) {
    return state.tags
  },
}

export const mutations = {
  SET_DICTIONNARIES(state, value) {
    state.dictionnaries = value
  },
  SET_CATEGORIES(state, payload) {
    state.categories = payload.categories || state.categories
    state.nestedCategories = payload.nestedCategories || state.nestedCategories
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
  SET_RATINGS(state, value) {
    state.ratings = value
  },
  SET_HIGHLIGHTS(state, value) {
    state.highlights = value
  },
  SET_TAGS(state, value) {
    state.tags = value
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
    const categories = await this.$axios.$get('categories')
    commit('SET_CATEGORIES', {
      categories: categories.data,
    })
  },
  async getNestedCategories({ commit }) {
    const nested = await this.$axios.$get('categories?nested=1')
    commit('SET_CATEGORIES', {
      nestedCategories: nested.data,
    })
  },
  getTypes({ commit }) {
    const value = [
      { name: 'word' },
      { name: 'locution' },
      { name: 'expression' },
      { name: 'example' },
      { name: 'definition' },
      { name: 'quote' },
      { name: 'note' },
      { name: 'grammar' },
      { name: 'acronym' },
    ]
    commit('SET_TYPES', value)
  },

  getLevels({ commit }) {
    const value = [
      { name: 'soutenu' },
      { name: 'courant' },
      { name: 'familier' },
    ]
    commit('SET_LEVELS', value)
  },

  getGrammars({ commit }) {
    const value = [
      { name: 'verbe' },
      { name: 'nom' },
      { name: 'adjectif' },
      { name: 'adverbe' },
    ]
    commit('SET_GRAMMARS', value)
  },

  getRatings({ commit }) {
    const value = [
      { name: '1' },
      { name: '2' },
      { name: '3' },
      { name: '4' },
      { name: '5' },
    ]
    commit('SET_RATINGS', value)
  },

  getHighlights({ commit }) {
    const value = [{ name: '1' }, { name: '2' }, { name: '3' }]
    commit('SET_HIGHLIGHTS', value)
  },

  getTags({ commit }) {
    const value = [
      { name: 'eco', slug: 'eco' },
      { name: 'scolaire', slug: 'scolaire' },
    ]
    commit('SET_TAGS', value)
  },
}
