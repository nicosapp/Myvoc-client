<template>
  <v-container>
    <div>
      {{ term }}
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
            <EditorAttributes v-model="term" />
          </v-tab-item>
          <v-tab-item value="translation">
            <EditorTranslation v-model="term" />
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
    const response = await app.$axios.$get(`terms/${params.id}`)

    return {
      term: response.data,
    }
  },
  data() {
    return {
      term: null,
    }
  },
  computed: {
    isNative() {
      return this.term.langue === this.$auth.user.native
    },
    tab: {
      get() {
        return this.$route.query.tab || 'attributes'
      },
      set(tabValue) {
        this.$router.push({
          name: 'terms-id-edit',
          params: { id: this.term.id },
          query: { tab: tabValue },
        })
      },
    },
  },
  methods: {
    async update() {
      try {
        await this.$axios.$patch(`terms/${this.term.id}`, this.term)
        this.$notifier.success({ message: 'Term updated' })
      } catch (e) {
        this.$notifier.error500()
      }
    },
  },
}
</script>
