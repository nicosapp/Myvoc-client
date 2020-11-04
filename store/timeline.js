import { isEmpty as _isEmpty } from 'lodash'
import queryString from 'query-string'

export const state = () => ({
  terms: null,
  currentPage: 1,
  lastPage: 1,
  total: 0,
  pagination: false,
  loading: false,
  rating: false,
})

export const getters = {
  terms(state) {
    return state.terms
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
  pagination(state) {
    return state.pagination
  },
  loading(state) {
    return state.loading
  },
  rating(state) {
    return state.rating
  },
}

export const mutations = {
  SET_LOADING(state, value) {
    state.loading = value
  },

  SET_TIMELINE(state, payload) {
    state.terms = payload.terms !== undefined ? payload.terms : state.terms
    state.currentPage =
      payload.currentPage !== undefined
        ? payload.currentPage
        : state.currentPage
    state.lastPage =
      payload.lastPage !== undefined ? payload.lastPage : state.lastPage
    state.total = payload.total !== undefined ? payload.total : state.total
  },
  SET_PAGINATION(state, value) {
    state.pagination = value
  },
  SET_RATING(state, value) {
    state.rating = value
  },
  UPDATE_TERM(state, term) {
    state.terms = state.terms.map((t) => {
      if (t.id === term.id) return term
      return t
    })
  },
}

export const actions = {
  setTimeline({ commit }, payload) {
    commit('SET_TIMELINE', payload)
  },
  setPagination({ commit }, value) {
    commit('SET_PAGINATION', value)
  },

  setRating({ commit }, value) {
    commit('SET_RATING', value)
  },

  updateTermItem({ commit }, term) {
    commit('UPDATE_TERM', term)
  },

  async getTerms({ dispatch, commit, state, rootState }) {
    const query = {}
    if (state.loading) return
    const { filters } = rootState

    commit('SET_LOADING', true)
    if (!_isEmpty(filters.dictionnary)) {
      query.dictionnary = filters.dictionnary
    }
    const filtersCheckbox = [
      'type',
      'category',
      'grammar',
      'rating',
      'highlight',
      'level',
      'tag',
    ]
    filtersCheckbox.forEach((k) => {
      if (!_isEmpty(filters[k])) {
        query[k] = filters[k].join(',')
      }
    })

    if (!_isEmpty(filters.date)) {
      query.date = filters.date
    }
    if (!_isEmpty(filters.orderBy)) {
      query.orderby = filters.orderBy
    }
    if (state.currentPage <= state.lastPage) {
      query.page = state.currentPage
    }
    const response = await this.$axios.$get(
      `terms/filter/?${queryString.stringify(query)}`
    )

    dispatch('setTimeline', {
      terms: response.data,
      currentPage: response.meta.current_page,
      lastPage: response.meta.last_page,
      total: response.meta.total,
    })
    commit('SET_LOADING', false)
  },
}
