<template>
  <v-row class="pt-0">
    <v-col cols="12" class="pt-0">
      <!-- {{ filterType }} {{ filterOrderBy }} {{ filterTaxonomy }}
        {{ filterDictionnary }} {{ filterDisplay }} {{ filterComponent }}
        {{ filterCrossDico }} {{ filterVisible }}
        <div>
          {{ filterCategory }}
          {{ filterGrammar }}
          {{ filterLevel }}
          {{ filterRating }}
          {{ filterHighlight }}
          {{ filterTag }}
          {{ filterDate }}
        </div> -->
      <v-pagination
        v-if="lastPage > 1"
        v-model="currentPage"
        class="my-4"
        :length="lastPage"
      ></v-pagination>
      <div class="font-medium">
        <template v-if="total"> Words found ({{ total }}) </template>
        <template v-else>
          Sorry, we did not find any words for this request
        </template>
      </div>
      <div :style="`column-count: ${filterColumn}`">
        <WordListItem
          v-for="(word, index) in words"
          :key="word.id"
          :word="word"
          :index="index + 1"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import timelineHelper from '@/mixins/timeline'
import WordListItem from './components/WordListItem'
// import CategoryContainer from './components/select/category/CategoryContainer'

export default {
  components: {
    WordListItem,
  },
  mixins: [timelineHelper],
  middleware: ['verified'],
  layout: 'timeline',

  data() {
    return {
      page: 1,
    }
  },
  watch: {
    currentPage(newValue) {
      this.currentPage = newValue
      this.getWords()
    },
  },

  mounted() {
    this.$store.dispatch('bottomBar/setActive', 'timeline')
  },
}
</script>
