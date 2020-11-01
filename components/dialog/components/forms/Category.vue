<template>
  <LinkLocalTemplate
    v-model="model"
    label="Category"
    :term="term"
    link-endpoint="categories"
    :items="items"
    @input="(v) => $emit('input', v)"
  >
    <template v-slot:listItemContent="{ item }">
      <span class="text-capitalize">{{ item.name }}</span>
    </template>

    <template v-slot:chipContent="{ item }">
      <span class="text-capitalize">{{ item.name }}</span>
    </template>
  </LinkLocalTemplate>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    value: {
      type: Array,
      required: false,
      default: () => [],
    },
    term: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      model: this.value,
    }
  },
  computed: {
    ...mapGetters({
      categories: 'config/categories',
    }),
    items() {
      return this.categories || []
    },
  },

  mounted() {
    if (!this.items) this.$store.dispatch('config/getCategories')
  },
}
</script>
