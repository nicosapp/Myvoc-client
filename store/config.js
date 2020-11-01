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
  async getDictionnaries({ commit }) {
    const response = await this.$axios.$get('dictionnaries')
    commit('SET_DICTIONNARIES', response.data)
  },
  async getCategories({ commit }) {
    const response = await this.$axios.$get('categories')
    commit('SET_CATEGORIES', {
      categories: response.data,
    })
  },
  async getNestedCategories({ commit }) {
    const response = await this.$axios.$get('categories?nested=1')
    commit('SET_CATEGORIES', {
      nestedCategories: response.data,
    })
  },
  async getTypes({ commit }) {
    const response = await this.$axios.$get('taxonomies?tax=type')
    commit('SET_TYPES', response.data)
  },

  async getLevels({ commit }) {
    const response = await this.$axios.$get('taxonomies?tax=level')
    commit('SET_LEVELS', response.data)
  },

  async getGrammars({ commit }) {
    const response = await this.$axios.$get('taxonomies?tax=grammar')
    commit('SET_GRAMMARS', response.data)
  },

  async getRatings({ commit }) {
    const response = await this.$axios.$get('taxonomies?tax=rating')
    commit('SET_RATINGS', response.data)
  },

  async getHighlights({ commit }) {
    const response = await this.$axios.$get('taxonomies?tax=highlight')
    commit('SET_HIGHLIGHTS', response.data)
  },

  async getTags({ commit }) {
    const tags = await this.$axios.$get('tags')
    commit('SET_TAGS', tags.data)
  },
}
