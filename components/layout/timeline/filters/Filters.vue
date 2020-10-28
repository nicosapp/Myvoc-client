<template>
  <div>
    <component :is="filterComponent" />
  </div>
</template>

<script>
import timelineHelper from '@/mixins/timeline'
import FilterColumn from './FilterColumn'
import FilterDictionnary from './FilterDictionnary'
import FilterDisplay from './FilterDisplay'
import FilterTaxonomy from './FilterTaxonomy'
import FilterOrderBy from './FilterOrderBy'
import FilterType from './FilterType'

import FilterCategory from './FilterCategory'
import FilterGrammar from './FilterGrammar'
import FilterRating from './FilterRating'
import FilterLevel from './FilterLevel'
import FilterHighlight from './FilterHighlight'
import FilterTag from './FilterTag'
import FilterDate from './FilterDate'

export default {
  components: {
    FilterColumn,
    FilterDictionnary,
    FilterDisplay,
    FilterTaxonomy,
    FilterOrderBy,
    FilterType,

    FilterCategory,
    FilterGrammar,
    FilterRating,
    FilterLevel,
    FilterHighlight,
    FilterTag,
    FilterDate,
  },
  mixins: [timelineHelper],
}
</script>
