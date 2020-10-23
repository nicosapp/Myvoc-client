<template>
  <v-container>
    <v-btn @click.prevent="show = !show">SHOW</v-btn>
    <v-expand-x-transition>
      <div
        v-if="show"
        class="teal"
        style="right: 0; position: absolute; width: 100%"
      >
        Test
      </div>
    </v-expand-x-transition>
    <div>
      <WordListItem v-for="word in words" :key="word.id" :word="word" />
    </div>
  </v-container>
</template>

<script>
import WordListItem from './components/WordListItem'
export default {
  components: {
    WordListItem,
  },
  middleware: ['verified'],
  layout: 'timeline',
  async asyncData({ app }) {
    const response = await app.$axios.$get('words')

    return {
      words: response.data,
    }
  },
  data() {
    return {
      show: false,
      words: [],
    }
  },
  mounted() {
    this.$store.dispatch('bottomBar/setActive', 'timeline')
  },
  methods: {
    toast() {
      // this.$notifier.success({ message: 'Test' })
      // this.$notifier.warn({ message: 'Test' })
      // this.$notifier.error({ message: 'Test' })
      // this.$notifier.info({ message: 'Test' })
    },
  },
}
</script>
