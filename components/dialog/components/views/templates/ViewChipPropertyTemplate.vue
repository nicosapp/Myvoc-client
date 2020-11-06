<template>
  <v-row class="text-left" align="baseline">
    <v-col
      v-if="$vuetify.breakpoint.sm"
      class="text-right font-weight-medium text-subtitle-2 py-2"
      cols="2"
    >
      {{ label }}
    </v-col>
    <v-col v-else class="text-caption py-0" cols="12"> {{ label }} </v-col>
    <v-col class="py-0 py-sm-2" cols="12" sm="10">
      <v-btn
        v-for="item in items"
        :key="item.id"
        rounded
        small
        class="elevation-2 text-capitalize mb-1 mr-1"
        :color="color"
      >
        {{ item.name }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    items: {
      required: true,
      type: Array,
    },
    label: {
      required: true,
      type: String,
    },
    color: {
      required: false,
      type: String,
      default: null,
    },
  },
}
</script>
