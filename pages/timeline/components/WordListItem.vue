<template>
  <div>
    <div class="word-list-item px-2 d-flex align-baseline">
      <span v-if="index" class="index mr-2">{{ index }}.</span>
      <div
        class="word-item grey--text text--darken-3 cursor-pointer"
        @dblclick.prevent="click"
      >
        {{ word || 'Undefined' | fullWord }}
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
  methods: {
    click() {
      this.pushDialog({ visible: true, id: this.word.id })
    },
  },
}
</script>

<style lang="scss" scoped>
.word-list-item {
  font-size: 0.8rem;
  padding-top: 1px;
  padding-bottom: 1px;
  .word-item {
    font-weight: 700;
  }
  .index {
    font-style: italic;
    font-size: 0.6rem;
  }
}
</style>
