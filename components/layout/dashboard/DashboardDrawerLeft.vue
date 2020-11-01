<template>
  <v-navigation-drawer v-model="drawerLeftOpen" temporary fixed>
    <v-list dense nav>
      {{ selectedMenu }}
      <v-list-item-group v-model="selectedMenu">
        <template v-for="(item, i) in items">
          <v-subheader v-if="item.header" :key="i">{{
            item.header
          }}</v-subheader>

          <v-list-item
            v-if="item.text"
            :key="i"
            nuxt
            exact
            :value="item.value"
            :to="{ name: item.route }"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ item.text }}
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import drawerLeft from '@/mixins/navigation/drawerLeft'

export default {
  mixins: [drawerLeft],
  data() {
    return {
      selectedMenu: 'dictionnaries',
      items: [
        {
          text: 'Overview',
          value: 'overview',
          route: 'dashboard',
          icon: 'mdi-view-dashboard',
        },
        {
          text: 'Statistics',
          value: 'statistics',
          route: 'dashboard-statistics',
          icon: 'mdi-finance',
        },
        { header: 'Config' },
        {
          text: 'Dictionnaries',
          value: 'dictionnaries',
          route: 'dashboard-dictionnaries',
          icon: 'mdi-translate',
        },

        {
          text: 'Categories',
          value: 'categories',
          route: 'dashboard-categories',
          icon: 'mdi-shape',
        },
        {
          text: 'Tags',
          value: 'tags',
          route: 'dashboard-tags',
          icon: 'mdi-tag-multiple',
        },
        {
          text: 'Grammars',
          value: 'grammars',
          route: 'dashboard-grammars',
          icon: 'mdi-book-open-page-variant',
        },
      ],
    }
  },
}
</script>
