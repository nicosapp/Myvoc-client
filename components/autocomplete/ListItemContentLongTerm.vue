<template>
  <v-list-item-content>
    <v-list-item-title>
      {{ item.def }}
    </v-list-item-title>
    <v-list-item-subtitle>
      <strong>{{ item.forme }}</strong>
      <i>{{ item.langue }}</i>
      {{ item.gram }}
    </v-list-item-subtitle>
  </v-list-item-content>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
