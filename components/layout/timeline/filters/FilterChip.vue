<template>
  <v-slide-item>
    <v-chip
      light
      class="mr-2"
      ripple
      color="primary"
      :outlined="isOutlined"
      @click="click"
    >
      <slot />
    </v-chip>
  </v-slide-item>
</template>

<script>
export default {
  props: {
    value: {
      type: [Boolean, Number],
      required: false,
      default: null,
    },
    outlined: {
      type: Boolean,
      required: false,
      default: null,
    },
  },

  computed: {
    color() {
      return this.value ? 'white' : 'white'
    },
    isOutlined() {
      if (this.value !== null) return !this.value
      if (this.outlined !== null) return this.outlined
      return true
    },
  },
  methods: {
    click() {
      this.$emit('click', !this.value)
    },
  },
}
</script>
