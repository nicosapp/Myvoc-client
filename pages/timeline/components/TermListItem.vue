<template>
  <div>
    <div class="term-list-item px-2 d-flex align-baseline">
      <span v-if="index" class="index mr-2">{{ index }}.</span>
      <div
        class="term-item grey--text text--darken-3 cursor-pointer"
        @dblclick.prevent="click"
      >
        {{ term || 'Undefined' | fullTerm }}
      </div>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
import editHelper from '@/mixins/edit'
export default {
  mixins: [editHelper],
  props: {
    term: {
      required: true,
      type: Object,
    },
    index: {
      required: false,
      type: Number,
      default: null,
    },
  },
  methods: {
    click() {
      this.pushDialog({ visible: true, id: this.term.id })
    },
  },
}
</script>

<style lang="scss" scoped>
.term-list-item {
  font-size: 0.8rem;
  padding-top: 1px;
  padding-bottom: 1px;
  .term-item {
    font-weight: 700;
  }
  .index {
    font-style: italic;
    font-size: 0.6rem;
  }
}
</style>
