<template>
  <v-row>
    <v-col>
      <v-text-field v-model="currentWord.pre" label="Pre" filled></v-text-field>
    </v-col>
    <v-col cols="8">
      <Lang v-model="currentWord.lang" :current-word="currentWord" />
    </v-col>
    <v-col>
      <v-text-field v-model="currentWord.suf" label="Suf" filled></v-text-field>
    </v-col>
  </v-row>
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
      currentWord: this.value,
    }
  },
  watch: {
    currentWord: {
      deep: true,
      handler(newValue) {
        this.$emit('input', newValue)
      },
    },
  },
}
</script>
