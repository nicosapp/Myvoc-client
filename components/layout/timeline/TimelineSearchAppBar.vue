<template>
  <div
    class="d-flex primary align-center"
    style="position: absolute; right: 0; top: 0; height: 100%; width: 100%"
  >
    <v-btn icon @click.prevent="$emit('toggle-appbar', false)">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
    <v-autocomplete
      color="primaryText"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      cache-items
      class="mx-4"
      flat
      hide-no-data
      hide-details
      label="Type your word :)"
      solo-inverted
    ></v-autocomplete>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchBar: false,
      select: null,
      words: ['Nicolas', 'Claire'],
      search: '',
      items: [],
      loading: false,
    }
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val)
    },
  },
  methods: {
    querySelections(v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.words.filter((e) => {
          return (e || '').toLowerCase().includes((v || '').toLowerCase())
        })
        this.loading = false
      }, 500)
    },
  },
}
</script>
