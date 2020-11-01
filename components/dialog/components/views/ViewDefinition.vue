<template>
  <div>
    <div class="text-caption">Definition</div>
    <v-alert
      v-for="(item, index) in items"
      :key="index"
      class="preview-definition mb-2"
      text
      dense
      border="left"
    >
      <template v-slot:prepend>
        <div class="mr-2">{{ item.order }}.</div>
      </template>
      <VueMarkdown
        :source="item.definition"
        :watches="extensions"
      ></VueMarkdown>
    </v-alert>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { orderBy as _orderBy } from 'lodash'

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
    items() {
      return _orderBy(this.term.def_json, 'order', 'asc') || []
    },
    extensions() {
      return ['source']
    },
  },
}
</script>

<style lang="scss">
.preview-definition {
  font-size: 0.8rem;
  p {
    padding: 0;
    margin: 0;
  }
}
</style>
