<template>
  <DialogFilter title="Level">
    <template v-slot:default>
      <LoadingCircular v-if="!items" height="200px" />
      <v-list v-else nav dense>
        <v-list-item-group
          v-model="model"
          color="primary"
          multiple
          active-class=""
        >
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            ripple
            :value="item.name"
          >
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                {{ item.name | capitalize }}
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
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
      items: 'config/levels',
    }),
  },
  watch: {
    model(newModel) {
      const level = newModel.filter((v) => v)
      this.setFilters({ level })
    },
  },
  mounted() {
    if (!this.items) this.$store.dispatch('config/getLevels')
    this.model = this.filterLevel
  },
}
</script>

<style scoped>
.v-messages {
  display: none;
}
</style>
