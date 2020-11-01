<template>
  <v-btn color="error" :disabled="disabled" depressed @click.prevent="click"
    ><slot
  /></v-btn>
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
    click() {
      this.$dialog.show({
        title: 'Delete',
        message: 'Do you really want to delete this term?',
        okFunction: () => {
          this.delete()
        },
      })
    },

    async delete() {
      this.loading = true
      try {
        await this.$axios.$delete(`terms/${this.term.id}`)
        this.$notifier.success({ message: 'Term deleted' })
        this.$emit('deleted', this.term)
      } catch (e) {
        this.$notifier.error500()
      }
      this.loading = false
    },
  },
}
</script>
