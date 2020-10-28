<template>
  <div>
    <CategoryListItem
      v-for="(category, index) in categories"
      :key="category.id"
      :category="category"
      :click="handleClick"
      :last="index === categories.length - 1"
      @click="handleClick"
    />
  </div>
</template>

<script>
import CategoryListItem from './CategoryListItem'
export default {
  components: {
    CategoryListItem,
  },
  props: {
    categories: {
      type: Array,
      required: false,
      default: () => [],
    },
    loading: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ids: [],
    }
  },
  methods: {
    handleClick(value, checked) {
      if (checked) {
        this.ids.push(value)
      } else {
        this.ids = this.ids.filter((id) => id !== value)
      }
      this.$emit('filter', this.ids)
    },
  },
}
</script>
