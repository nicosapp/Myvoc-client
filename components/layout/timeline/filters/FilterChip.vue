<template>
  <v-slide-item>
    <v-chip
      light
      class="mr-2 elevation-1 my-1"
      ripple
      :color="color"
      @click.prevent="click"
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
      return this.isOutlined ? null : 'primary'
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
