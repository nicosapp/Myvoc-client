<template>
  <transition name="slide-x-fade-rating">
    <div
      v-if="rating"
      class="rating-button d-flex align-center justify-space-around"
    >
      <v-badge
        :content="ratingValue"
        :value="ratingValue"
        left
        color="primary"
        overlap
      >
        <v-icon :disabled="loading" small light @click.prevent="updateRating"
          >mdi-star</v-icon
        >
      </v-badge>
      <v-badge
        :content="highlightValue"
        :value="highlightValue"
        left
        color="primary"
        overlap
      >
        <v-icon :disabled="loading" small light @click.prevent="updateHighlight"
          >mdi-heart</v-icon
        >
      </v-badge>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { delay as _delay } from 'lodash'
export default {
  props: {
    term: {
      type: Object,
      required: true,
    },
    rating: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      loading: false,
      ratingValue: 0,
      highlightValue: 0,
    }
  },
  computed: {
    ...mapGetters({
      ratings: 'config/ratings',
      highlights: 'config/highlights',
    }),
  },

  methods: {
    ...mapActions({
      updateTermTimeline: 'timeline/updateTermItem',
    }),
    async updateRating() {
      const note = this.term.note < 5 ? this.term.note + 1 : 0

      const success = await this.update({ note })
      if (success) {
        this.ratingValue = note
        _delay(() => {
          this.ratingValue = 0
        }, 1000)
      }
    },
    async updateHighlight() {
      const imp = this.term.imp < 3 ? this.term.imp + 1 : 0
      const success = await this.update({ imp })
      if (success) {
        this.highlightValue = imp
        _delay(() => {
          this.highlightValue = 0
        }, 1000)
      }
    },
    async update(payload) {
      this.loading = true
      try {
        const term = { ...this.term, ...payload }
        await this.$axios.$patch(`terms/${this.term.id}`, term)

        this.updateTermTimeline(term)
      } catch (e) {
        this.$notifier.error500()
        return false
      }
      this.loading = false
      return true
    },
  },
}
</script>

<style scoped>
.rating-button {
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  width: 5rem;
  padding-left: 1rem;
  background: linear-gradient(to left, white 80%, transparent);
}
.slide-x-fade-rating-enter-active,
.slide-x-fade-rating-leave-active {
  transition: all 0.3s ease;
}

.slide-x-fade-rating-enter, .slide-x-fade-rating-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
