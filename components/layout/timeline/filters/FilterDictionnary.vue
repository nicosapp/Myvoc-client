<template>
  <DialogFilter title="Dictionnary" :width="200">
    <template v-slot:default>
      <LoadingCircular v-if="!items" height="200px" />
      <v-list v-else dense nav>
        <v-list-item-group v-model="model" color="primary">
          <v-list-item
            v-for="dictionnary in items"
            :key="dictionnary.slug"
            class="text-capitalize"
            ripple
            :value="dictionnary.slug"
            @click.prevent="filterVisible = false"
          >
            {{ dictionnary.name }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </template>
  </DialogFilter>
</template>

<script>
import timelineHelper from '@/mixins/timeline'
import { mapGetters } from 'vuex'
export default {
  mixins: [timelineHelper],
  data() {
    return {
      model: null,
    }
  },
  computed: {
    ...mapGetters({
      items: 'config/dictionnaries',
    }),
  },
  watch: {
    model(dictionnary) {
      this.setFilters({ dictionnary })
    },
  },
  mounted() {
    if (!this.items) this.$store.dispatch('config/getDictionnaries')
    this.model = this.filterDictionnary
  },
}
</script>
