<template>
  <v-dialog v-model="filterVisible" width="300">
    <v-card>
      <LoadingCircular v-if="!items" height="150px" />
      <v-list v-else dense nav>
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
    items() {
      return this.dictionnaries
        ? this.dictionnaries.filter((d) => d.slug !== this.$auth.user.native)
        : null
    },
  },
  watch: {
    model(newModel) {
      const translation = newModel.filter((v) => v)
      this.setFilters({ translation })
    },
  },
  mounted() {
    if (!this.items) this.$store.dispatch('config/getDictionnaries')
    this.model = this.filterTranslation
  },
}
</script>

<style scoped>
.v-messages {
  display: none;
}
</style>
