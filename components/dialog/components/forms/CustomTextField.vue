<template>
  <div class="custom-textfield">
    <v-text-field
      v-model="currentValue"
      :name="name"
      filled
      :label="label"
      clearable
      :rules="rules"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
    label: {
      required: false,
      default: 'Textarea',
      type: String,
    },
    name: {
      required: false,
      default: 'textarea',
      type: String,
    },
    rules: {
      required: false,
      type: Array,
      default: () => [],
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
