import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      filterComponent: 'filters/component',
      filterDictionnary: 'filters/dictionnary',
      filterType: 'filters/type',
      filterOrderBy: 'filters/orderBy',
      filterTranslation: 'filters/translation',
      filterDisplay: 'filters/display',
      filterColumn: 'filters/column',
      visibleValue: 'filters/visible',
      crossDicoValue: 'filters/crossDico',

      filterCategory: 'filters/category',
      filterGrammar: 'filters/grammar',
      filterLevel: 'filters/level',
      filterRating: 'filters/rating',
      filterHighlight: 'filters/highlight',
      filterDate: 'filters/date',
      filterTag: 'filters/tag',

      terms: 'timeline/terms',
      currentPageValue: 'timeline/currentPage',
      lastPage: 'timeline/lastPage',
      total: 'timeline/total',
      pagination: 'timeline/pagination',
      loading: 'timeline/loading',
      ratingValue: 'timeline/rating',
    }),
    filterVisible: {
      get() {
        return this.visibleValue
      },
      set(newValue) {
        this.setVisible(newValue)
      },
    },
    filterCrossDico: {
      get() {
        return this.crossDicoValue
      },
      set(newValue) {
        this.setFilters({ crossDico: newValue })
      },
    },
    currentPage: {
      get() {
        return this.currentPageValue
      },
      set(newValue) {
        this.setTimeline({ currentPage: newValue })
      },
    },
    rating: {
      get() {
        return this.ratingValue
      },
      set(newValue) {
        this.setRating(newValue)
      },
    },
  },

  methods: {
    ...mapActions({
      setVisible: 'filters/setVisible',
      showFilterDialog: 'filters/showFilterDialog',
      setFilters: 'filters/setFilters',
      setTimeline: 'timeline/setTimeline',
      setPagination: 'timeline/setPagination',
      setRating: 'timeline/setRating',
      getTerms: 'timeline/getTerms',
    }),
  },
}
