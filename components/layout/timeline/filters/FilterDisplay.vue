<template>
  <v-dialog v-model="filterVisible" width="300">
    <v-card>
      <v-list dense>
        <v-list-item-group color="primary" multiple>
          <template v-for="(item, index) in items">
            <v-list-item v-if="!item.divider" :key="`display-${index}`" ripple>
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox
                    v-model="checkbox[index]"
                    :input-value="active"
                    :true-value="item.name"
                    :false-value="null"
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
export default {
  mixins: [timelineHelper],
  data() {
    return {
      items: [
        { name: 'Cross Dico' },
        { name: 'Word' },
        { name: 'Native' },
        { divider: true },
        { name: 'Definition' },
        { name: 'Web Def' },
        { name: 'Conjugation' },
        { divider: true },
        { name: 'note' },
        { name: 'Highlighted' },
        { divider: true },
        { name: 'Example' },
        { name: 'Traduction' },
        { name: 'Comment' },
      ],
      checkbox: [],
    }
  },
  watch: {
    checkbox: {
      deep: true,
      handler(values) {
        const display = values.filter((v) => v).join(',')
        this.setFilters({ display })
      },
    },
  },
}
</script>

<style scoped>
.v-messages {
  display: none;
}
</style>
