<template>
  <v-row class="text-left" align="baseline">
    <v-col class="text-right font-weight-medium text-subtitle-2 py-2" cols="2">
      Categories
    </v-col>
    <v-col class="py-2">
      <v-btn
        v-for="item in term.categories"
        :key="item.id"
        rounded
        small
        class="elevation-2 text-capitalize mb-1 mr-1"
        color="primary"
      >
        {{ item.name }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    term: {
      required: true,
      type: Object,
    },
  },
}
</script>
