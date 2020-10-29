<template>
  <v-btn color="error" :disabled="disabled" depressed @click.prevent="click"
    ><slot
  /></v-btn>
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
    click() {
      this.$dialog.show({
        title: 'Delete',
        message: 'Do you really want to delete this word?',
        okFunction: () => {
          this.delete()
        },
      })
    },

    async delete() {
      this.loading = true
      try {
        await this.$axios.$delete(`words/${this.word.id}`)
        this.$notifier.success({ message: 'Word deleted' })
        this.$emit('deleted', this.word)
      } catch (e) {
        this.$notifier.error500()
      }
      this.loading = false
    },
  },
}
</script>
