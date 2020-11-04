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
      destroyDialog: 'edit/destroyDialog',
      updateDialog: 'edit/updateDialog',
    }),
  },
}
