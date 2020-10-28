<template>
  <v-dialog v-model="filterVisible" width="400">
    <v-card class="pt-3">
      <div class="d-flex justify-center">
        <v-btn
          color="primary"
          light
          small
          depressed
          :disabled="model === null"
          @click.prevent="model = null"
          ><v-icon class="mr-2">mdi-close-circle-outline</v-icon>clear
        </v-btn>
      </div>
      <v-list nav dense light>
        <v-list-item-group
          v-model="model"
          multiple
          color="primary"
          active-class=""
        >
          <NestedCategoryItem
            v-for="category in items"
            :key="category.id"
            :category="category"
            :depth="1"
          />
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import timelineHelper from '@/mixins/timeline'
import { mapGetters } from 'vuex'

import NestedCategoryItem from './components/NestedCategoryItem'

export default {
  components: {
    NestedCategoryItem,
  },
  mixins: [timelineHelper],
  data() {
    return {
      model: null,
    }
  },
  computed: {
    ...mapGetters({
      items: 'config/nestedCategories',
    }),
  },
  watch: {
    model(newModel) {
      let category = null
      if (Array.isArray(newModel)) {
        category = newModel.filter((v) => v)
      }
      this.setFilters({ category })
    },
  },
  mounted() {
    this.model = this.filterCategory
  },
}
</script>
