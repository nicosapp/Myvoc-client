<template>
  <v-container>
    <v-form>
      <!-- LANG & FORM -->
      <v-card class="px-4 mb-4 pb-4 elevation-8">
        <div v-for="(lang, index) in languages" :key="`lang-${index}`">
          <div class="d-flex align-baseline">
            <div class="text-caption text-capitalize flex-grow-1">
              {{ lang.name }}
            </div>
            <div>
              <v-switch
                v-model="switchs[index]"
                :label="'By ' + (switchs[index] ? 'Nativ' : 'Trans')"
              ></v-switch>
            </div>
          </div>
          <Translation
            v-model="currentTerm.translations"
            :term="currentTerm"
            :from="native"
            :to="lang.slug"
            :by-native="switchs[index]"
            :label="`Link ${lang.name} translation`"
          />
        </div>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    value: {
      required: true,
      type: Object,
    },
    native: {
      required: true,
      type: String,
    },
    isNative: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      currentTerm: this.value,
      switchs: [],
    }
  },
  computed: {
    ...mapGetters({
      dictionnaries: 'config/dictionnaries',
    }),

    languages() {
      return this.dictionnaries.filter((d) => d.slug !== this.native)
    },
  },
  watch: {
    currentTerm: {
      deep: true,
      handler(newValue) {
        this.$emit('input', newValue)
      },
    },
  },
}
</script>
