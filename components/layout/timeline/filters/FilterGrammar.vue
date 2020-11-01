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
