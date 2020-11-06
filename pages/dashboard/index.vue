<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <div class="d-flex align-start">
        <v-select
          v-model="dictionnary"
          dark
          filled
          :items="items"
          background-color="primary"
          label="Dictionnaries"
          hide-details
          item-text="name"
          item-value="slug"
          :disabled="!dictionnaries"
        >
          <template v-slot:selection="{ item }">
            <span class="text-capitalize">{{ item.name }}</span>
          </template>
          <template v-slot:item="{ item }">
            <span class="text-capitalize">{{ item.name }}</span>
          </template>
        </v-select>
      </div>
      <div v-if="dictionnary">
        <LastCreatedTerms :dictionnary="dictionnary" />
        <LastUpdatedTerms :dictionnary="dictionnary" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: ['verified'],
  layout: 'dashboard',
  data() {
    return {
      dictionnary: null,
    }
  },
  computed: {
    ...mapGetters({
      dictionnaries: 'config/dictionnaries',
    }),
    items() {
      return this.dictionnaries || []
    },
  },

  async mounted() {
    this.$store.dispatch('bottomBar/setActive', 'dashboard')
    if (!this.dictionnaries)
      await this.$store.dispatch('config/getDictionnaries')
  },
}
</script>
