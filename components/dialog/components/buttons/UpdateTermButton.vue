<template>
  <v-btn dark text :disabled="_disabled" @click.prevent="validate">
    <slot />
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    term: {
      type: Object,
      required: false,
      default: null,
    },
    valid: {
      type: Boolean,
      required: false,
      default: true,
    },
    form: {
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
    _disabled() {
      return !this.valid || !this.term || this.loading
    },
  },
  methods: {
    ...mapActions({
      updateTermTimeline: 'timeline/updateTermItem',
    }),
    validate() {
      if (this.form) this.form.validate()
      if (this.valid) {
        this.update()
      }
    },
    async update() {
      this.loading = true
      try {
        await this.$axios.$patch(`terms/${this.term.id}`, this.term)
        this.updateTermTimeline(this.term)
        this.$notifier.success({ message: 'Term updated' })
        this.$emit('edited', true)
      } catch (e) {
        this.$notifier.error500()
      }
      this.loading = false
    },
  },
}
</script>
