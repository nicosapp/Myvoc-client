<template>
  <div>
    <div class="text-caption">Conjugation</div>
    <VueMarkdown
      class="preview-conjugation"
      :watches="extensions"
      :source="word.conj"
    ></VueMarkdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  components: {
    VueMarkdown,
  },
  props: {
    word: {
      required: true,
      type: Object,
    },
  },
  computed: {
    extensions() {
      return ['source']
    },
  },
}
</script>
<style>
.preview-conjugation {
  font-size: 0.9rem;
}
</style>
