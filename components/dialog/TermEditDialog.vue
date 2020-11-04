<template>
  <v-dialog
    v-model="visible"
    scrollable
    max-width="800"
    :hide-overlay="index > 0"
    persistent
    :fullscreen="$vuetify.breakpoint.mobile"
  >
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar :dense="dense" dark color="primary"
          ><v-btn icon dark :disabled="!edit" @click.prevent="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Term</v-toolbar-title>
          <v-spacer></v-spacer>
          <DeleteTermButton :term="term" @deleted="close">
            Delete
          </DeleteTermButton>
          <UpdateTermButton :term="term" :form="form" :valid="valid">
            Save
          </UpdateTermButton>
        </v-toolbar>
      </v-card-title>

      <v-card-text class="pa-0">
        <LoadingCircular v-if="!term" height="300px" />

        <v-tabs v-else v-model="tab">
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#attributes"> Attributes </v-tab>
          <v-tab href="#translation" :disabled="!isNative"> Translation </v-tab>
          <v-tab href="#preview"> Preview </v-tab>

          <v-tabs-items v-model="tab" class="mt-2">
            <v-tab-item value="attributes">
              <v-form ref="form" v-model="valid" @submit.prevent="add">
                <EditorAttributes
                  v-model="term"
                  :edit="edit"
                  :native="native"
                  :is-native="isNative"
                />
              </v-form>
            </v-tab-item>
            <v-tab-item value="translation">
              <EditorTranslation
                v-model="term"
                :native="native"
                :is-native="isNative"
              />
            </v-tab-item>
            <v-tab-item value="preview">
              <EditorPreview :term="term" />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-text>

      <v-card-actions
        :style="[dense ? { height: '48px' } : {}]"
        class="grey lighten-3 elevation-1"
      >
        <NavigationButtons v-if="term" :term="term" :dialog-index="index" />
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click.prevent="add">New</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import editHelper from '@/mixins/edit'

export default {
  mixins: [editHelper],
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      tab: 'attributes',
      visible: true,
      term: null,
      dense: true,
      valid: true,
    }
  },
  computed: {
    dialog() {
      return this.dialogs[this.index]
    },
    edit() {
      return this.dialog.edit
    },
    termId() {
      return this.dialog.termId
    },
    native() {
      return this.$auth.user.native
    },
    isNative() {
      return this.term.langue === this.native
    },
    form() {
      return this.$refs.form
    },
  },
  async mounted() {
    await this.getTerm()
  },
  methods: {
    async getTerm() {
      try {
        const response = await this.$axios.$get(`terms/${this.termId}`)
        this.term = response.data
      } catch (e) {
        this.$notifier.error500()
      }
    },
    async add() {
      try {
        const term = await this.$axios.$post('terms')
        this.pushDialog({ termId: term.data.id, edit: false })
      } catch (e) {}
    },
    close() {
      this.destroyDialog(this.index)
    },
  },
}
</script>
