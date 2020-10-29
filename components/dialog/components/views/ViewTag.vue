<template>
  <v-row class="text-left" align="baseline">
    <v-col class="text-right font-weight-medium text-subtitle-2 py-2" cols="2">
      Tags
    </v-col>
    <v-col class="py-2">
      <v-btn
        v-for="item in word.tags"
        :key="item.id"
        rounded
        small
        class="elevation-2 text-capitalize"
        color="accent"
      >
        {{ item.name }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    word: {
      required: true,
      type: Object,
    },
  },
}
</script>
