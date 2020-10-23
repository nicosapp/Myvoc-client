<template>
  <form
    class="rounded-lg"
    :class="{'bg-bg'
      :!loading
    }"
  >
    <template v-if="!loading">
      <CategoryFilterable
        v-for="(category, index) in categories"
        :key="category.id"
        :category="category"
        :click="handleClick"
        :last="index === categories.length-1"
        @click="handleClick"
      />
    </template>
    <template v-else>
      <CategoryFilterable
        v-for="category in skeletons"
        :key="category.id"
        :category="category"
        :loading="true"
      />
    </template>
  </form>
</template>

<script>
import { chips as chipsSkeletons } from '@/mixins/skeletons'

export default {
  props: {
    categories: {
      type: Array,
      required: false,
      default: () => []
    },
    loading: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ids: [],
      skeletons: chipsSkeletons(6, 'chips-cat-')
    }
  },
  methods: {
    handleClick (value, checked) {
      if (checked) {
        this.ids.push(value)
      } else {
        this.ids = this.ids.filter(id => id !== value)
      }
      this.$emit('filter', this.ids)
    }
  }
}
</script>
