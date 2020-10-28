<template>
  <div>
    <div class="list-item d-flex px-3 py-2 rounded">
      <v-icon v-if="category.children.length" @click.prevent="open = !open">
        mdi-chevron-right
      </v-icon>
      <div class="cursor-pointer" @click.prevent="select(category)">
        {{ category.name | capitalize }}
      </div>
    </div>
    <v-expand-transition>
      <div v-show="open" :class="marginLeft">
        <CategoryListItem
          v-for="cat in category.children"
          :key="cat.id"
          :category="cat"
          :depth="depth + 1"
          :click="click"
          @click="click"
        />
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
import CategoryListItem from './CategoryListItem'
export default {
  name: 'CategoryListItem',
  components: {
    CategoryListItem,
  },
  props: {
    category: {
      required: true,
      type: Object,
    },
    depth: {
      required: false,
      type: Number,
      default: 0,
    },
    last: {
      required: false,
      type: Boolean,
      default: false,
    },
    click: {
      required: false,
      type: Function,
      default: null,
    },
    loading: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checked: false,
      open: false,
    }
  },
  computed: {
    marginLeft() {
      return `ml-${4 * this.depth}`
    },
  },
  methods: {
    select(category) {
      console.log(category)
    },
  },
}
</script>

<style scoped lang="scss">
.list-item {
  &:hover {
    background-color: grey;
  }
}
</style>
