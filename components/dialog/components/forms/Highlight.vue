<template>
  <v-text-field
    v-model="currentValue"
    type="number"
    label="Highlight"
    filled
  ></v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      required: false,
      default: null,
      type: [Number, String],
    },
  },
  data() {
    return {
      currentValue: this.value,
    }
  },
  watch: {
    currentValue(newValue) {
      this.$emit('input', newValue)
    },
  },
}
</script>
