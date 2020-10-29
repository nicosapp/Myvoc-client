<template>
  <v-dialog
    v-model="visible"
    max-width="800"
    :hide-overlay="index > 0"
    persistent
    :fullscreen="$vuetify.breakpoint.mobile"
  >
    <v-card>
      <v-toolbar dark color="primary"
        ><v-btn icon dark :disabled="isEmpty" @click.prevent="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Word</v-toolbar-title>
        <v-spacer></v-spacer>
        <DeleteWordButton :word="word" @deleted="close">
          Delete
        </DeleteWordButton>
        <UpdateWordButton :word="word"> Save </UpdateWordButton>
      </v-toolbar>
      <div
        v-if="!word"
        class="d-flex justify-center align-center"
        style="height: 300px"
      >
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <v-tabs v-else v-model="tab">
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#attributes"> Attributes </v-tab>
        <v-tab href="#translation" :disabled="!isNative"> Translation </v-tab>
        <v-tab href="#preview"> Preview </v-tab>

        <v-tabs-items v-model="tab" class="mt-2">
          <v-tab-item value="attributes">
            <EditorAttributes v-model="word" :edit="edit" />
          </v-tab-item>
          <v-tab-item value="translation">
            <EditorTranslation v-model="word" />
          </v-tab-item>
          <v-tab-item value="preview">
            <EditorPreview :word="word" />
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>

      <v-divider></v-divider>

      <v-card-actions>
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
      word: null,
    }
  },
  computed: {
    dialog() {
      return this.dialogs[this.index]
    },
    edit() {
      return this.dialog.edit
    },
    wordId() {
      return this.dialog.id
    },
    isNative() {
      return this.word.langue === this.$auth.user.native
    },
    isEmpty() {
      return _isEmpty(_get(this, 'word.lang', null))
    },
  },
  async mounted() {
    try {
      const response = await this.$axios.$get(`words/${this.wordId}`)
      this.word = response.data
    } catch (e) {
      this.$notifier.error500()
    }
  },
  methods: {
    async add() {
      try {
        const word = await this.$axios.$post('words')
        this.pushDialog({ id: word.data.id, edit: false })
      } catch (e) {}
    },
    close() {
      this.removeDialog(this.index)
    },
  },
}
</script>
