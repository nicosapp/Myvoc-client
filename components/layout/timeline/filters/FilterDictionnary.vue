<template>
  <v-dialog v-model="filterVisible" width="200">
    <v-card>
      <v-list nav dense>
        <v-list-item-group v-model="model" color="primary">
          <v-list-item
            v-for="dictionnary in dictionnaries"
            :key="dictionnary.key"
            ripple
            :value="dictionnary.key"
            @click.prevent="filterVisible = false"
          >
            {{ dictionnary.value | capitalize }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-dialog>
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
      dictionnaries: 'config/dictionnaries',
    }),
  },
  watch: {
    model(dictionnary) {
      this.setFilters({ dictionnary })
    },
  },
  mounted() {
    if (!this.dictionnaries) this.$store.dispatch('config/getDictionnaries')
    this.model = this.filterDictionnary
  },
}
</script>
