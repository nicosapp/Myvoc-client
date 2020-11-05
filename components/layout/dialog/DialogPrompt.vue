<template>
  <v-dialog v-model="visible" persistent max-width="350">
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-text-field
        v-model="text"
        outlined
        :label="label"
        :rules="rules"
        clearable
        class="mx-3"
      >
      </v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-btn color="primary" text @click="ok()">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import dialogHelper from '@/mixins/helper/dialogHelper'

export default {
  mixins: [dialogHelper],
  data() {
    return {
      text: null,
    }
  },
  computed: {
    label() {
      return this.data.label || ''
    },
    rules() {
      if (!this.data.rules) return false
      return this.data.rules(this.text)
    },
  },
  watch: {
    visible() {
      this.text = this.data.text
    },
  },
  mounted() {
    this.text = this.data.text
  },
  methods: {
    ok() {
      this.visible = false
      if (this.okFunction) this.okFunction(this.text)
    },
    cancel() {
      this.visible = false
      if (this.cancelFunction) this.cancelFunction()
    },
  },
}
</script>
