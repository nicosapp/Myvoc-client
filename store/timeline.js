import { isEmpty as _isEmpty } from 'lodash'
import queryString from 'query-string'

export const state = () => ({
  component: null,
  visible: false,
  type: ['word'],
  dictionnary: 'fra',
  crossDico: 0,
  taxonomy: 'category',
  orderBy: 'alphabetical',
  display: '',
  column: 2,

  category: null,
  grammar: null,
  level: null,
  rating: null,
  highlight: null,
  date: null,
  tag: null,

  words: null,
  currentPage: 1,
  lastPage: 1,
  total: 0,
})

export const getters = {
  words(state) {
    return state.words
  },
  currentPage(state) {
    return state.currentPage
  },
  lastPage(state) {
    return state.lastPage
  },
  total(state) {
    return state.total
  },

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
  taxonomy(state) {
    return state.taxonomy
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
    state.taxonomy = payload.taxonomy || state.taxonomy
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

  SET_TIMELINE(state, payload) {
    state.words = payload.words !== undefined ? payload.words : state.words
    state.currentPage =
      payload.currentPage !== undefined
        ? payload.currentPage
        : state.currentPage
    state.lastPage =
      payload.lastPage !== undefined ? payload.lastPage : state.lastPage
    state.total = payload.total !== undefined ? payload.total : state.total
  },
}

export const actions = {
  setVisible({ commit }, value) {
    commit('SET_VISIBLE', value)
  },

  showFilterDialog({ commit }, payload) {
    commit('SHOW_FILTER', payload)
  },

  setTimeline({ commit }, payload) {
    commit('SET_TIMELINE', payload)
  },

  setFilters({ commit }, payload) {
    commit('SET_FILTERS', payload)
  },

  async getWords({ dispatch, state }) {
    const query = {}
    if (!_isEmpty(state.dictionnary)) {
      query.dictionnary = state.dictionnary
    }
    ;['type', 'category', 'grammar', 'rating', 'highlight', 'level'].forEach(
      (k) => {
        if (!_isEmpty(state[k])) {
          query[k] = state[k].join(',')
        }
      }
    )
    // if (!_isEmpty(this.filterTag)) {
    //   query.tag = this.filterTag.join(',')
    // }
    if (!_isEmpty(state.date)) {
      query.date = state.date
    }
    if (!_isEmpty(state.orderBy)) {
      query.orderby = state.orderBy
    }
    if (state.currentPage <= state.lastPage) {
      query.page = state.currentPage
    }
    const response = await this.$axios.$get(
      `words/filter/?${queryString.stringify(query)}`
    )

    dispatch('setTimeline', {
      words: response.data,
      currentPage: response.meta.current_page,
      lastPage: response.meta.last_page,
      total: response.meta.total,
    })
  },
}
