<template>
  <div class="d-flex">
    <v-text-field
      v-model="currentTerm.pre"
      label="Pre"
      filled
      class="pre"
      :style="dynStyle"
    ></v-text-field>

    <Lang
      v-model="currentTerm.lang"
      class="term flex-grow-1"
      :class="{ 'mx-3': !langFocused }"
      @focus="langFocused = true"
      @blur="langFocused = false"
    />

    <v-text-field
      v-model="currentTerm.suf"
      label="Suf"
      filled
      class="suf"
      :style="dynStyle"
    ></v-text-field>
  </div>
</template>

<script>
import Lang from '../Lang'
export default {
  components: {
    Lang,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentTerm: this.value,
      langFocused: false,
    }
  },
  computed: {
    dynStyle() {
      return this.langFocused ? { opacity: '0', 'max-width': '0%' } : {}
    },
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
</script>

<style scoped>
.term,
.pre,
.suf {
  transition: all 0.3s ease-in-out;
}
.pre,
.suf {
  max-width: 10%;
}
.pre.v-input--is-focused,
.suf.v-input--is-focused {
  max-width: 40%;
}
</style>
