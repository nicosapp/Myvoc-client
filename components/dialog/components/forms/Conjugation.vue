<template>
  <v-card class="pa-3 elevation-8">
    <v-textarea
      v-model="currentValue"
      rows="4"
      name="conj"
      filled
      label="Conjugation"
      auto-grow
    ></v-textarea>
  </v-card>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: '',
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
