<template>
  <li
    class="border border-gray-400 py-1 px-3 rounded-lg mb-1 shadow-xs bg-gray-200 hover:bg-gray-300"
  >
    <div
      class="flex items-center"
      :class="{'mb-2':category.children.length}"
    >
      <IconMenu
        class="stroke-current text-gray-500 stroke-2 mr-2 cursor-pointer handle"
      />
      <div
        class="font-medium text-gray-700 flex-grow cursor-pointer"
        @click.stop.prevent="_click(category)"
      >
        <input
          v-if="edit"
          v-model="category.name"
          type="text"
          class="border-gray-400 border bg-white rounded w-full px-3 py-1 outline-none"
        >
        <div v-else class="px-3 py-1 border border-transparent">
          {{ category.name }}
        </div>
      </div>
      <div
        class="ml-2"
        @click="_edit(category)"
      >
        <IconPencilAlt
          v-show="!edit"
          class="stroke-current text-gray-500 stroke-2 h-6 w-6 mr-2 cursor-pointer"
        />
        <IconSave
          v-show="edit"
          class="stroke-current text-gray-500 stroke-2 h-6 w-6 mr-2 cursor-pointer"
        />
      </div>
      <div
        class="bg-gray-500 stroke-3 rounded-full h-6 w-6 flex items-center justify-center ml-2 cursor-pointer"
        @click.stop.prevent="_remove(category)"
      >
        <IconTimes class="fill-current text-gray-200 h-4 h-4" />
      </div>
    </div>
    <slot />
  </li>
</template>

<script>
import { debounce as _debounce } from 'lodash'

export default {
  props: {
    category: {
      required: true,
      type: Object
    },
    click: {
      required: false,
      type: Function,
      default: null
    },
    remove: {
      required: false,
      type: Function,
      default: null
    }
  },
  data () {
    return {
      edit: false
    }
  },
  watch: {
    'category.name': {
      handler: _debounce(async function (name) {
        await this.$axios.$patch(`me/categories/${this.category.id}`, {
          name
        })
      }, 500)
    }
  },
  methods: {
    _remove (category) {
      this.remove(category)
    },
    _click (category) {
      this.click(category)
    },
    _edit (category) {
      this.edit = !this.edit
    }
  }
}
</script>
