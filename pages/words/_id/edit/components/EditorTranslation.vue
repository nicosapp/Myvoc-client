<template>
  <v-container>
    <v-form>
      <!-- LANG & FORM -->
      <v-card class="px-4 mb-4 elevation-8">
        <v-row v-for="(lang, index) in languages" :key="`lang-${index}`">
          <v-col>
            <LinkTranslation
              v-model="currentWord.translations"
              :word="currentWord"
              :to="lang.key"
              :by-native="switchs[index]"
              :label="`Link ${lang.value} translation`"
            />
          </v-col>
          <v-col cols="1">
            <v-switch
              v-model="switchs[index]"
              :messages="'By ' + (switchs[index] ? 'Nativ' : 'Trans')"
            ></v-switch>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import LinkTranslation from './forms/link/LinkTranslation'
export default {
  components: {
    LinkTranslation,
  },
  props: {
    value: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      currentWord: this.value,
      switchs: [],
    }
  },
  computed: {
    ...mapGetters({
      dictionnaries: 'config/dictionnaries',
    }),
    languages() {
      return this.dictionnaries.filter((d) => d.key !== this.$auth.user.native)
    },
  },
  watch: {
    currentWord: {
      deep: true,
      handler(newValue) {
        this.$emit('input', newValue)
      },
    },
  },
}
</script>
