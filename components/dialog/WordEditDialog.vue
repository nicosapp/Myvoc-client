<template>
  <v-dialog
    v-model="visible"
    max-width="800"
    :hide-overlay="index > 0"
    persistent
    :fullscreen="$vuetify.breakpoint.mobile"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary"
        ><v-btn icon dark @click.prevent="remove">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Edit/Add Word</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn dark text @click="save"> Save </v-btn>
      </v-toolbar>

      <v-card-title class="headline"> Test {{ index }}</v-card-title>
      <v-card-text>Un message</v-card-text>
      <v-card-actions>
        <v-btn color="error" text>Delete</v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click.prevent="add">New</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      dialogs: 'edit/dialogs',
    }),
    dialog() {
      return this.dialogs[this.index]
    },
    visible: {
      get() {
        return this.dialog.visible
      },
      set(visible) {
        const dialog = { ...this.dialog, ...{ visible, index: this.index } }
        this.updateDialog(dialog)
      },
    },
  },
  methods: {
    ...mapActions({
      pushDialog: 'edit/pushDialog',
      removeDialog: 'edit/removeDialog',
      updateDialog: 'edit/updateDialog',
    }),

    add() {
      this.pushDialog({ visible: true })
    },
    remove() {
      this.removeDialog(this.index)
    },
    save() {},
  },
}
</script>
