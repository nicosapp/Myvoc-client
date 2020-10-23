<template>
  <v-chip
    light
    class="mr-2 primary--text"
    ripple
    color="primaryText"
    :outlined="!value"
    @click="click"
  >
    <slot />
  </v-chip>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  computed: {
    color() {
      return this.value ? 'white' : 'white'
    },
  },
  methods: {
    click() {
      this.$emit('input', !this.value)
    },
  },
}
</script>
