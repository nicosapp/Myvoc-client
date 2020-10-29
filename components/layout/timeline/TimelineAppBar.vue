<template>
  <div>
    <v-app-bar
      dark
      fixed
      app
      color="grey lighten-4"
      hide-on-scroll
      :extension-height="extensionHeight"
    >
      <div class="d-flex align-center" style="width: 100%">
        <!-- <v-btn icon @click.prevent="toggleDrawerLeft">
          <v-icon>mdi-menu</v-icon>
        </v-btn> -->
        <v-btn light icon class="ml-n2" @click.prevent="toggleFilterBar">
          <v-icon>mdi-tune-vertical</v-icon>
        </v-btn>
        <!-- MIDDLE -->
        <v-spacer />
        <v-img
          class="mr-3"
          max-height="60px"
          max-width="200px"
          contain
          :src="require('~/assets/logo.svg')"
        ></v-img>
        <v-spacer />
        <!-- MIDDLE -->
        <v-btn
          v-if="!$auth.loggedIn && isHomePage"
          light
          icon
          nuxt
          to="/auth/signin"
        >
          <v-icon>mdi-login-variant</v-icon>
        </v-btn>
        <v-btn
          icon
          class="mr-n2"
          light
          @click.prevent="$emit('toggle-appbar', true)"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
      <slot />

      <template v-slot:extension>
        <div v-if="extensionHeight > 50" style="width: 100%">
          <div
            class="d-flex align-center"
            :style="`height:${extensionBarHeight}px;`"
            style="overflow: hidden"
          >
            <v-btn light class="ml-n2" icon @click.prevent="filter">
              <v-icon>mdi-filter</v-icon>
            </v-btn>
            <v-slide-group
              light
              multiple
              :show-arrows="!$vuetify.breakpoint.mobile"
              class="slider-toolbar"
            >
              <FilterChip
                :outlined="false"
                @click="openDialog('FilterDictionnary')"
              >
                Dictionnaries
              </FilterChip>
              <FilterChip v-model="filterCrossDico" @click="setCrossDico()">
                CrossDico
              </FilterChip>
              <FilterChip
                :outlined="isEmpty(filterType)"
                @click="openDialog('FilterType')"
                >Type</FilterChip
              >
              <FilterChip :outlined="false" @click="openDialog('FilterOrderBy')"
                >Order By</FilterChip
              >
              <FilterChip :outlined="false" @click="openDialog('FilterDisplay')"
                >Display</FilterChip
              >
              <FilterChip :outlined="false" @click="openDialog('FilterColumn')"
                >Column</FilterChip
              >
            </v-slide-group>
          </div>

          <div
            class="d-flex align-center"
            :style="`height:${extensionBarHeight}px;`"
            style="overflow: hidden"
          >
            <v-slide-group
              light
              multiple
              :show-arrows="!$vuetify.breakpoint.mobile"
              class="slider-toolbar"
            >
              <FilterChip
                :outlined="isEmpty(filterCategory)"
                @click="openDialog('FilterCategory')"
              >
                Category
              </FilterChip>
              <FilterChip
                :outlined="isEmpty(filterGrammar)"
                @click="openDialog('FilterGrammar')"
              >
                Grammar
              </FilterChip>

              <FilterChip
                :outlined="isEmpty(filterRating)"
                @click="openDialog('FilterRating')"
                >Rating
              </FilterChip>

              <FilterChip
                :outlined="isEmpty(filterHighlight)"
                @click="openDialog('FilterHighlight')"
                >Highlight
              </FilterChip>

              <FilterChip
                :outlined="isEmpty(filterLevel)"
                @click="openDialog('FilterLevel')"
                >Level
              </FilterChip>

              <FilterChip
                :outlined="isEmpty(filterDate)"
                @click="openDialog('FilterDate')"
                >Date
              </FilterChip>

              <FilterChip
                :outlined="isEmpty(filterTag)"
                @click="openDialog('FilterTag')"
                >Tag
              </FilterChip>
            </v-slide-group>
          </div>
        </div>
      </template>
      <Filters />
    </v-app-bar>
    <!-- <div>
      <div class="primary">

      </div>
    </div> -->
  </div>
</template>

<script>
import drawerLeft from '@/mixins/navigation/drawerLeft'
import Filters from '@/components/layout/timeline/filters/Filters'
import timelineHelper from '@/mixins/timeline'

import { isEmpty as _isEmpty } from 'lodash'

export default {
  components: {
    Filters,
  },
  mixins: [drawerLeft, timelineHelper],
  data() {
    return {
      extensionBarHeight: 48,
      extensionHeight: 0,
      categories: null,
    }
  },
  mounted() {
    this.$store.dispatch('config/getNestedCategories')
  },

  methods: {
    openDialog(filterName) {
      this.showFilterDialog({
        component: filterName,
        visible: true,
      })
    },
    toggleFilterBar() {
      this.extensionHeight =
        this.extensionHeight > 50 ? 0 : this.extensionBarHeight * 2
    },
    setCrossDico() {
      this.filterCrossDico =
        this.filterCrossDico >= 2 ? 0 : this.filterCrossDico + 1
    },

    isEmpty(value) {
      return _isEmpty(value)
    },

    filter() {
      this.setTimeline({ currentPage: 1 })
      this.getWords()
    },
  },
}
</script>

<style>
.slider-toolbar .v-slide-group__next .v-icon,
.slider-toolbar .v-slide-group__prev .v-icon {
  color: var(--v-primary-base) !important;
}
</style>
