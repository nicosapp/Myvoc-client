<template>
  <div>
    <span v-if="index">{{ index }}.</span>
    <nuxt-link
      :to="{
        name: 'words-id-edit',
        params: { id: word.id },
      }"
      >{{ word || 'Undefined' | fullWord }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    word: {
      required: true,
      type: Object,
    },
    index: {
      required: false,
      type: Number,
      default: null,
    },
  },
}
</script>
