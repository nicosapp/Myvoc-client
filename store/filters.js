export const state = () => ({
  component: null,
  visible: false,
  type: ['word'],
  dictionnary: 'fra',
  crossDico: 0,
  translation: [],
  orderBy: 'alphabetical',
  display: ['term', 'translation'],
  column: 2,

  category: null,
  grammar: null,
  level: null,
  rating: null,
  highlight: null,
  date: null,
  tag: null,
})

export const getters = {
  component(state) {
    return state.component
  },
  visible(state) {
    return state.visible
  },
  dictionnary(state) {
    return state.dictionnary
  },
  type(state) {
    return state.type
  },
  crossDico(state) {
    return state.crossDico
  },
  translation(state) {
    return state.translation
  },
  orderBy(state) {
    return state.orderBy
  },
  display(state) {
    return state.display
  },
  column(state) {
    return state.column
  },

  category(state) {
    return state.category
  },
  grammar(state) {
    return state.grammar
  },
  level(state) {
    return state.level
  },
  rating(state) {
    return state.rating
  },
  highlight(state) {
    return state.highlight
  },
  date(state) {
    return state.date
  },
  tag(state) {
    return state.tag
  },
}

export const mutations = {
  SET_VISIBLE(state, value) {
    state.visible = value
  },
  SHOW_FILTER(state, payload) {
    state.component = payload.component || state.component
    state.visible = payload.visible || state.visible
  },
  SET_FILTERS(state, payload) {
    state.dictionnary = payload.dictionnary || state.dictionnary
    state.crossDico =
      payload.crossDico !== undefined ? payload.crossDico : state.crossDico
    state.type = payload.type || state.type
    state.translation = payload.translation || state.translation
    state.orderBy = payload.orderBy || state.orderBy
    state.display = payload.display || state.display
    state.column = payload.column || state.column

    state.category =
      payload.category !== undefined ? payload.category : state.category
    state.grammar =
      payload.grammar !== undefined ? payload.grammar : state.grammar
    state.rating = payload.rating !== undefined ? payload.rating : state.rating
    state.level = payload.level !== undefined ? payload.level : state.level
    state.highlight =
      payload.highlight !== undefined ? payload.highlight : state.highlight
    state.date = payload.date !== undefined ? payload.date : state.date
    state.tag = payload.tag !== undefined ? payload.tag : state.tag
  },
}

export const actions = {
  setVisible({ commit }, value) {
    commit('SET_VISIBLE', value)
  },

  showFilterDialog({ commit }, payload) {
    commit('SHOW_FILTER', payload)
  },
  setFilters({ commit }, payload) {
    commit('SET_FILTERS', payload)
  },
}
