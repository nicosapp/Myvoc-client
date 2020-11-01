<template>
  <v-dialog v-model="dialog" max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <div
        class="rounded-circle elevation-4"
        style="height: 24px; width: 24px; cursor: pointer"
        :style="`background-color:${value}`"
        v-bind="attrs"
        v-on="on"
      ></div>
    </template>
    <v-card>
      <v-card-title class="headline"> Color Picker </v-card-title>
      <v-card-text>
        <v-color-picker
          v-model="color"
          class="ma-2"
          :mode="type"
          hide-mode-switch
          show-swatches
        ></v-color-picker>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-btn color="primary" text @click="ok()">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      required: false,
      default: '#FFFFFF',
      type: [String, Object],
    },
    type: {
      required: false,
      type: String,
      default: 'hexa',
    },
  },
  data() {
    return {
      dialog: false,
      color: this.value,
    }
  },
  computed: {
    // color: {
    //   get() {
    //     return this[this.type] || this.value
    //   },
    //   set(v) {
    //     this[this.type] = v
    //   },
    // },
  },
  methods: {
    ok() {
      this.$emit('input', this.color)
      this.dialog = false
    },
  },
}
</script>
