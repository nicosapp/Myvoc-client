<template>
  <v-text-field
    v-model="currentValue"
    label="Pronunciation"
    filled
  ></v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      required: false,
      default: '',
      type: String,
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
