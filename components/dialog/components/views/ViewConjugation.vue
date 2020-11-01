<template>
  <div>
    <div class="text-caption">Conjugation</div>
    <VueMarkdown
      class="preview-conjugation"
      :watches="extensions"
      :source="term.conj"
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
    term: {
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
