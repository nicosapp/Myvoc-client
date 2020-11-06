export default {
  props: {
    value: {
      required: true,
      type: Object,
    },
    native: {
      required: true,
      type: String,
    },
    isNative: {
      required: true,
      type: Boolean,
    },
  },

  data() {
    return {
      currentTerm: this.value,
    }
  },

  watch: {
    currentTerm: {
      deep: true,
      handler(newValue) {
        this.$emit('input', newValue)
      },
    },
  },
}
