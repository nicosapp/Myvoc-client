<template>
  <DialogFilter title="Grammar">
    <template v-slot:default>
      <div class="pa-3">
        <LoadingCircular v-if="!items" height="200px" />
        <v-chip-group
          v-else
          v-model="model"
          active-class="primary--text"
          column
          multiple
        >
          <v-chip
            v-for="item in items"
            :key="item.id"
            ripple
            :value="item.id"
            class="text-capitalize"
          >
            <span>{{ item.name }}</span>
            <span class="font-weight-light">({{ item.terms_count }})</span>
          </v-chip>
        </v-chip-group>
      </div>
    </template>

    <template v-slot:actions>
      <v-spacer></v-spacer>
      <v-btn text @click.prevent="model = []">Clear</v-btn>
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
      items: 'config/grammars',
    }),
  },
  watch: {
    model(newModel) {
      const grammar = newModel.filter((v) => v)
      this.setFilters({ grammar })
    },
  },
  mounted() {
    if (!this.items) this.$store.dispatch('config/getGrammars')
    this.model = this.filterGrammar
  },
}
</script>

<style scoped>
.v-messages {
  display: none;
}
</style>
