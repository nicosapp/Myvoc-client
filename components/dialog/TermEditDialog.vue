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
          ><v-btn icon dark :disabled="isEmpty" @click.prevent="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Term</v-toolbar-title>
          <v-spacer></v-spacer>
          <DeleteTermButton :term="term" @deleted="close">
            Delete
          </DeleteTermButton>
          <UpdateTermButton :term="term"> Save </UpdateTermButton>
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
              <v-form>
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
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click.prevent="add">New</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import editHelper from '@/mixins/edit'

import { isEmpty as _isEmpty, get as _get } from 'lodash'

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
      return this.dialog.id
    },
    native() {
      return this.$auth.user.native
    },
    isNative() {
      return this.term.langue === this.native
    },
    isEmpty() {
      return _isEmpty(_get(this, 'term.lang', null))
    },
  },
  async mounted() {
    try {
      const response = await this.$axios.$get(`terms/${this.termId}`)
      this.term = response.data
    } catch (e) {
      this.$notifier.error500()
    }
  },
  methods: {
    async add() {
      try {
        const term = await this.$axios.$post('terms')
        this.pushDialog({ id: term.data.id, edit: false })
      } catch (e) {}
    },
    close() {
      this.removeDialog(this.index)
    },
  },
}
</script>
