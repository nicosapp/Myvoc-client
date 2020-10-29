import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      dialogs: 'edit/dialogs',
    }),
  },
  methods: {
    ...mapActions({
      pushDialog: 'edit/pushDialog',
      removeDialog: 'edit/removeDialog',
      updateDialog: 'edit/updateDialog',
    }),
  },
}
