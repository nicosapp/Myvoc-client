<template>
  <v-dialog v-model="visible" width="300">
    <v-card>
      <v-list dense>
        <v-list-item-group color="primary" multiple>
          <template v-for="(item, index) in items">
            <v-list-item v-if="!item.divider" :key="`display-${index}`" ripple>
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox
                    v-model="checkbox[index]"
                    :true-value="item.name"
                    :false-value="null"
                    :input-value="active"
                  ></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  {{ item.name | capitalize }}
                </v-list-item-content>
              </template>
            </v-list-item>
            <v-divider v-else :key="`display-${index}`"></v-divider>
          </template>
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
      checkbox: [],
    }
  },
  computed: {
    ...mapGetters({
      items: 'config/levels',
    }),
  },
  watch: {
    checkbox: {
      deep: true,
      handler(values) {
        const level = values.filter((v) => v).join(',')
        this.setFilters({ level })
      },
    },
  },
  mounted() {
    if (!this.types) this.$store.dispatch('config/getLevels')
  },
}
</script>

<style scoped>
.v-messages {
  display: none;
}
</style>
