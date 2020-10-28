<template>
  <v-card class="pa-3 elevation-8">
    <v-textarea
      :name="name"
      filled
      :label="label"
      auto-grow
      value=""
    ></v-textarea>
  </v-card>
</template>

<script>
export default {
  props: {
    label: {
      required: false,
      default: 'Textarea',
      type: String,
    },
    name: {
      required: false,
      default: 'textarea',
      type: String,
    },
  },
}
</script>
