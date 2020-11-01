<template>
  <v-btn dark text :disabled="disabled" @click.prevent="click">
    <slot />
  </v-btn>
</template>

<script>
export default {
  props: {
    term: {
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
      return !this.term || this.loading
    },
  },
  methods: {
    async click() {
      this.loading = true
      try {
        await this.$axios.$patch(`terms/${this.term.id}`, this.term)
        this.$notifier.success({ message: 'Term updated' })
      } catch (e) {
        this.$notifier.error500()
      }
      this.loading = false
    },
  },
}
</script>
