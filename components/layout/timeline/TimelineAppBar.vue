<template>
  <div>
    <v-app-bar
      dark
      fixed
      app
      class="timeline-app-bar"
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
        <div style="overflow: hidden" class="mx-n8 mx-sm-0">
          <div v-if="extensionHeight > 50">
            <div
              class="d-flex align-center rounded-pill"
              :style="`height:${extensionBarHeight}px;`"
              style="overflow: hidden"
            >
              <v-btn
                light
                icon
                :loading="loading"
                :disabled="loading"
                @click.prevent="filter"
              >
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
                <FilterChip
                  :outlined="false"
                  @click="openDialog('FilterOrderBy')"
                  >Order By</FilterChip
                >
                <FilterChip
                  v-if="isNative"
                  :outlined="false"
                  @click="openDialog('FilterTranslation')"
                >
                  Translation
                </FilterChip>
                <FilterChip
                  :outlined="false"
                  @click="openDialog('FilterDisplay')"
                  >Display</FilterChip
                >
                <FilterChip
                  :outlined="false"
                  @click="openDialog('FilterColumn')"
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
          <v-row v-if="pagination" justify="center" class="pa-0">
            <v-col cols="10" class="pa-0">
              <v-container class="pa-0 max-width">
                <v-pagination
                  v-model="currentPage"
                  light
                  circle
                  :length="lastPage"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </div>
      </template>
      <Filters />
    </v-app-bar>
  </div>
</template>

<script>
import drawerLeft from '@/mixins/navigation/drawerLeft'
import Filters from '@/components/layout/timeline/filters/Filters'
import timelineHelper from '@/mixins/timeline'

import { isEmpty as _isEmpty, debounce as _debounce } from 'lodash'

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
  computed: {
    isNative() {
      return this.$auth.user.native === this.filterDictionnary
    },
  },
  watch: {
    pagination(newValue) {
      this.togglePaginationBar(newValue)
    },
    currentPage: {
      handler: _debounce(function (newValue) {
        this.getTerms()
      }, 1000),
    },
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
      if (this.extensionHeight > 50) {
        this.extensionHeight -= this.extensionBarHeight * 2
      } else {
        this.extensionHeight += this.extensionBarHeight * 2
      }
    },
    togglePaginationBar(pagination) {
      if (pagination) {
        this.extensionHeight += this.extensionBarHeight
      } else if (this.extensionHeight - this.extensionBarHeight >= 0) {
        this.extensionHeight -= this.extensionBarHeight
      }
    },

    setCrossDico() {
      this.filterCrossDico =
        this.filterCrossDico >= 2 ? 0 : this.filterCrossDico + 1
    },

    isEmpty(value) {
      return _isEmpty(value)
    },

    async filter() {
      this.setTimeline({ currentPage: 1 })
      await this.getTerms()
    },
  },
}
</script>

<style>
.slider-toolbar .v-slide-group__wrapper {
  border-radius: 100px;
}
.slider-toolbar .v-slide-group__next .v-icon,
.slider-toolbar .v-slide-group__prev .v-icon {
  color: var(--v-primary-base) !important;
}
</style>
