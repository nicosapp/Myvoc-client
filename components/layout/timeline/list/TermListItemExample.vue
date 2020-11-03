<template>
  <div>
    <div
      v-for="(item, index) in items"
      :key="`${term.id}-ex-${index}`"
      style="font-size: 0.7rem"
    >
      <div class="d-flex">
        <div style="font-style: italic" class="mr-1">{{ item.order }}.</div>
        <MarkdownForProperties
          class="font-weight-medium primary--text"
          :source="item.example || ''"
        />
      </div>
      <MarkdownForProperties
        class="font-weight-light"
        :source="item.translation || ''"
      />
    </div>
  </div>
</template>

<script>
import { orderBy as _orderBy, cloneDeep as _cloneDeep } from 'lodash'

export default {
  props: {
    term: {
      type: Object,
      required: true,
    },
  },
  computed: {
    items() {
      return this.term.ex_json
        ? _orderBy(this.updateKeyNames(this.term.ex_json), 'order', 'asc')
        : []
    },
  },
  methods: {
    updateKeyNames(values) {
      const newValues = _cloneDeep(values)
      newValues.forEach((item) => {
        item.translation = item.traduction || item.translation
        delete item.traduction
        item.example = item.exemple || item.example
        delete item.exemple
      })
      return newValues
    },
  },
}
</script>
