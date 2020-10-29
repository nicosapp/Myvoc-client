<template>
  <v-btn dark text :disabled="disabled" @click.prevent="click">
    <slot />
  </v-btn>
</template>

<script>
export default {
  props: {
    word: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    disabled() {
      return !this.word || this.loading
    },
  },
  methods: {
    async click() {
      this.loading = true
      try {
        await this.$axios.$patch(`words/${this.word.id}`, this.word)
        this.$notifier.success({ message: 'Word updated' })
      } catch (e) {
        this.$notifier.error500()
      }
      this.loading = false
    },
  },
}
</script>
