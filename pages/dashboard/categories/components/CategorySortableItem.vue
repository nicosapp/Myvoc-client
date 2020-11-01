<template>
  <v-hover v-slot="{ hover }">
    <li
      class="py-1 px-3 rounded mb-1 grey lighten-3 elevation-2"
      :class="{ 'grey lighten-2': hover }"
    >
      <div
        class="d-flex align-center"
        :class="{ 'mb-2': category.children.length }"
      >
        <v-icon class="handle cursor-pointer">mdi-menu</v-icon>
        <div
          class="text-capitalize flex-grow-1 cursor-pointer"
          @dblclick.stop.prevent="_click(category)"
        >
          <span class="px-3 py-1 font-weight-medium">
            {{ category.name }}
          </span>
          <span class="font-weight-light"> ({{ category.terms_count }}) </span>
        </div>

        <v-btn icon @click.stop.prevent="_remove(category)">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </div>
      <slot />
    </li>
  </v-hover>
</template>

<script>
export default {
  props: {
    category: {
      required: true,
      type: Object,
    },
    click: {
      required: false,
      type: Function,
      default: null,
    },
    remove: {
      required: false,
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      edit: false,
    }
  },

  methods: {
    _remove(category) {
      this.remove(category)
    },
    _click(category) {
      this.click(category)
    },
    _edit(category) {
      this.edit = !this.edit
    },
  },
}
</script>
