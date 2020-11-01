<template>
  <LinkLocalTemplate
    v-model="model"
    label="Grammar"
    :term="term"
    link-endpoint="grammars"
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
      grammars: 'config/grammars',
    }),
    items() {
      return this.grammars || []
    },
  },

  mounted() {
    if (!this.grammars) this.$store.dispatch('config/getGrammars')
  },
}
</script>
