<template>
  <div>
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
  },
}
</script>
