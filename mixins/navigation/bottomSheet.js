import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      bottomSheetVisibleValue: 'bottomSheet/visible',
      bottomSheetComponent: 'bottomSheet/component',
      bottomSheetTerm: 'bottomSheet/term',
    }),
    bottomSheetVisible: {
      get() {
        return this.bottomSheetVisibleValue
      },
      set(visible) {
        this.setBottomSheet({ visible })
      },
    },
  },
  methods: {
    ...mapActions({
      setBottomSheet: 'bottomSheet/setBottomSheet',
    }),
  },
}
