import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      filterComponent: 'timeline/component',
      filterDictionnary: 'timeline/dictionnary',
      filterType: 'timeline/type',
      filterOrderBy: 'timeline/orderBy',
      filterTranslation: 'timeline/translation',
      filterDisplay: 'timeline/display',
      filterColumn: 'timeline/column',
      visibleValue: 'timeline/visible',
      crossDicoValue: 'timeline/crossDico',

      filterCategory: 'timeline/category',
      filterGrammar: 'timeline/grammar',
      filterLevel: 'timeline/level',
      filterRating: 'timeline/rating',
      filterHighlight: 'timeline/highlight',
      filterDate: 'timeline/date',
      filterTag: 'timeline/tag',

      terms: 'timeline/terms',
      currentPageValue: 'timeline/currentPage',
      lastPage: 'timeline/lastPage',
      total: 'timeline/total',
      pagination: 'timeline/pagination',
      loading: 'timeline/loading',
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
  },

  methods: {
    ...mapActions({
      setVisible: 'timeline/setVisible',
      showFilterDialog: 'timeline/showFilterDialog',
      setTimeline: 'timeline/setTimeline',
      setPagination: 'timeline/setPagination',
      setFilters: 'timeline/setFilters',
      getTerms: 'timeline/getTerms',
    }),
  },
}
