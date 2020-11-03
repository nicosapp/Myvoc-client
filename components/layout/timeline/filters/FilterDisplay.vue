<template>
  <DialogFilter title="Display">
    <template v-slot:default>
      <LoadingCircular v-if="!items" height="200px" />
      <v-list v-else dense>
        <v-list-item-group
          v-model="model"
          color="primary"
          multiple
          active-class=""
        >
          <template v-for="(item, index) in items">
            <v-list-item
              v-if="!item.divider"
              :key="`display-${index}`"
              ripple
              :value="item.slug"
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
            <v-divider v-else :key="`display-${index}`"></v-divider>
          </template>
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
export default {
  mixins: [timelineHelper],
  data() {
    return {
      items: [
        { name: 'Cross Dico', slug: 'cross_dico' },
        { name: 'Term', slug: 'term' },
        { name: 'Native', slug: 'native' },
        { name: 'Translation', slug: 'translation' },
        { divider: true },
        { name: 'Definition', slug: 'definition' },
        { name: 'Example', slug: 'example' },
        { divider: true },
        { name: 'note', slug: 'note' },
        { name: 'Highlight', slug: 'highlight' },
        { divider: true },
        { name: 'Example', slug: 'example_example' },
        { name: 'Translation', slug: 'example_translation' },
        { name: 'Comment', slug: 'example_comment' },
      ],
      model: [],
    }
  },
  watch: {
    model(newModel) {
      const display = newModel.filter((v) => v)
      this.setFilters({ display })
    },
  },
  mounted() {
    this.model = this.filterDisplay
  },
}
</script>

<style scoped>
.v-messages {
  display: none;
}
</style>
