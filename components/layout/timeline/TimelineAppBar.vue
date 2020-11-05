<template>
  <div>
    <v-app-bar
      fixed
      app
      class="timeline-app-bar"
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
        <div
          style="overflow: hidden"
          class="extension-container mx-n2 flex-grow-1"
          :class="[{ open: filtersOpened }]"
        >
          <div v-if="filtersOpened">
            <div
              class="d-flex align-center"
              :style="`height:${extensionBarHeight}px;`"
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
              <div style="overflow: hidden">
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
                    :outlined="isEmpty(filterType)"
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
                  v-for="(fSecond, index) in filters.secondRow"
                  :key="`second-${index}`"
                  :outlined="isEmpty(`filter${fSecond.name}`)"
                  @click="openDialog(`Filter${fSecond.name}`)"
                >
                  {{ fSecond.name }}
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
      filters: {
        firstRow: [],
        secondRow: [
          { name: 'Category', icon: '' },
          { name: 'Grammar', icon: '' },
          { name: 'Rating', icon: '' },
          { name: 'Highlight', icon: '' },
          { name: 'Level', icon: '' },
          { name: 'Date', icon: '' },
          { name: 'Tag', icon: '' },
        ],
      },
    }
  },
  computed: {
    isNative() {
      return this.$auth.user.native === this.filterDictionnary
    },
    filtersOpened() {
      return this.extensionHeight > 50
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
      if (this.filtersOpened) {
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

<style lang="scss">
.timeline-app-bar {
  .slider-toolbar {
    .v-slide-group__wrapper {
      .v-slide-group__next .v-icon,
      .v-slide-group__prev .v-icon {
        color: var(--v-color-primary) !important;
      }
    }
  }
  .extension-container.open {
    &::before,
    &::after {
      content: '';
      width: 20px;
      height: 100%;
      position: absolute;
      z-index: 1;
    }
    &::before {
      left: 0;
      top: 0;
      background: linear-gradient(
        to left,
        transparent,
        var(--color-appbar) 10px
      );
    }
    &::after {
      right: 0;
      top: 0;
      background: linear-gradient(
        to right,
        transparent,
        var(--color-appbar) 10px
      );
    }
  }
}
</style>
