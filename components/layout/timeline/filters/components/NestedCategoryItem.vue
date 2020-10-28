<template>
  <div>
    <v-list-item :value="category.id">
      <!-- <v-checkbox color="primary" hide-details>
        <template v-slot:label>
          <div class="cursor-pointer">
            {{ category.name | capitalize }}
          </div>
        </template>
      </v-checkbox> -->
      <template v-slot:default="{ active }">
        <v-list-item-action>
          <v-checkbox :input-value="active"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          {{ category.name | capitalize }}
        </v-list-item-content>
        <v-spacer></v-spacer>
        <v-icon
          v-if="category.children.length && !open"
          @click.prevent.stop="open = true"
        >
          mdi-chevron-left
        </v-icon>
        <v-icon
          v-if="category.children.length && open"
          @click.prevent.stop="open = false"
        >
          mdi-chevron-down
        </v-icon>
      </template>
    </v-list-item>
    <v-expand-transition>
      <div v-show="open" :class="marginLeft">
        <NestedCategoryItem
          v-for="cat in category.children"
          :key="cat.id"
          :category="cat"
          :depth="depth + 1"
        />
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
import NestedCategoryItem from './NestedCategoryItem'
export default {
  name: 'NestedCategoryItem',
  components: {
    NestedCategoryItem,
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
}
</script>

//
<style lang="scss">
// .list-item {
//   &:hover {
//     background-color: grey;
//   }
//   .v-messages {
//     display: none !important;
//   }
// }
//
</style>
