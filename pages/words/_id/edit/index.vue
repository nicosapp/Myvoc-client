<template>
  <v-container>
    <div>
      {{ word }}
      <v-tabs v-model="tab" centered>
        <v-tabs-slider></v-tabs-slider>
        <v-tab class="ma-0 pa-0">
          <div
            class="pa-1"
            style="width: 100%; height: 100%"
            @click.prevent.stop="() => {}"
          >
            <v-btn icon>
              <v-icon medium>mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-tab>
        <v-tab href="#attributes"> Attributes </v-tab>
        <v-tab href="#translation" :disabled="!isNative"> Translation </v-tab>
        <v-tab href="#preview"> Preview </v-tab>
        <v-tab class="ma-0 pa-0">
          <div
            class="pa-1"
            style="width: 100%; height: 100%"
            @click.prevent.stop="() => {}"
          >
            <v-btn icon @click.prevent="update">
              <v-icon medium>mdi-content-save</v-icon>
            </v-btn>
          </div>
        </v-tab>
        <v-tabs-items v-model="tab" class="mt-2">
          <v-tab-item value="attributes">
            <EditorAttributes v-model="word" />
          </v-tab-item>
          <v-tab-item value="translation">
            <EditorTranslation v-model="word" />
          </v-tab-item>
          <v-tab-item value="preview">
            <EditorPreview />
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </div>
  </v-container>
</template>

<script>
import EditorAttributes from '@/components/dialog/components/EditorAttributes'
import EditorTranslation from '@/components/dialog/components/EditorTranslation'
import EditorPreview from '@/components/dialog/components/EditorPreview'
export default {
  components: {
    EditorAttributes,
    EditorTranslation,
    EditorPreview,
  },
  async asyncData({ app, params }) {
    const response = await app.$axios.$get(`words/${params.id}`)

    return {
      word: response.data,
    }
  },
  data() {
    return {
      word: null,
    }
  },
  computed: {
    isNative() {
      return this.word.langue === this.$auth.user.native
    },
    tab: {
      get() {
        return this.$route.query.tab || 'attributes'
      },
      set(tabValue) {
        this.$router.push({
          name: 'words-id-edit',
          params: { id: this.word.id },
          query: { tab: tabValue },
        })
      },
    },
  },
  methods: {
    async update() {
      try {
        await this.$axios.$patch(`words/${this.word.id}`, this.word)
        this.$notifier.success({ message: 'Word updated' })
      } catch (e) {
        this.$notifier.error500()
      }
    },
  },
}
</script>
