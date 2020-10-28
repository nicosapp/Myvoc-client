<template>
  <v-dialog v-model="filterVisible" width="300">
    <v-card>
      <v-list dense nav>
        <v-list-item-group
          v-model="model"
          color="primary"
          multiple
          active-class=""
        >
          <v-list-item
            v-for="(item, index) in items"
            :key="`type-${index}`"
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
      items: 'config/types',
    }),
  },
  watch: {
    model(newModel) {
      const type = newModel.filter((v) => v)
      this.setFilters({ type })
    },
  },
  mounted() {
    if (!this.types) this.$store.dispatch('config/getTypes')
    this.model = this.filterType
  },
}
</script>

<style scoped>
.v-messages {
  display: none;
}
</style>
