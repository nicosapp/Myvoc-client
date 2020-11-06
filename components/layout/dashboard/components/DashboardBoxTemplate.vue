<template>
  <div>
    <div class="text-h6" @click.prevent="open = !open">{{ label }}</div>
    <div v-if="open">
      <LoadingCircular v-if="!terms" height="200px" />
      <div
        v-else
        :style="`column-count: ${filterColumn}`"
        style="column-gap: 0"
      >
        <!-- Short or Long       -->
        <component
          :is="`${term.term}-term-list-item`"
          v-for="(term, index) in terms"
          :key="term.id"
          style="break-inside: avoid-column"
          :term="term"
          :index="index + 1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LongTermListItem from '@/components/layout/timeline/list/LongTermListItem'
import ShortTermListItem from '@/components/layout/timeline/list/ShortTermListItem'

export default {
  components: {
    LongTermListItem,
    ShortTermListItem,
  },
  props: {
    dictionnary: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      open: false,
      terms: false,
    }
  },
  async mounted() {
    try {
      const response = await this.$axios.$get(
        `dashboard/${this.endpoint}?dictionnary=${this.dictionnary}`
      )
      this.terms = response.data
    } catch (e) {}
  },
}
</script>
