<template>
  <VueMarkdown
    class="markdown-for-properties"
    :source="source"
    :watches="extensions"
  ></VueMarkdown>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  components: {
    VueMarkdown,
  },
  props: {
    source: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      extensions: ['source'],
    }
  },
}
</script>
<style lang="scss">
.markdown-for-properties p {
  margin: 0;
  padding: 0;
}
</style>
