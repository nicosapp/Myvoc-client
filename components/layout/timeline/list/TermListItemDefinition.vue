<template>
  <div>
    <div
      v-for="(item, index) in items"
      :key="`${term.id}-def-${index}`"
      style="font-size: 0.7rem"
    >
      <div class="d-flex">
        <div style="font-style: italic" class="mr-1">{{ item.order }}.</div>
        <MarkdownForProperties
          class="font-weight-bold"
          :source="item.definition || ''"
        ></MarkdownForProperties>
      </div>
    </div>
  </div>
</template>

<script>
import { orderBy as _orderBy } from 'lodash'
export default {
  props: {
    term: {
      type: Object,
      required: true,
    },
  },
  computed: {
    items() {
      return _orderBy(this.term.def_json, 'order', 'asc') || []
    },
  },
}
</script>
