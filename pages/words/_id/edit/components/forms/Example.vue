<template>
  <div>
    <v-card v-if="examples.length === 0" class="pa-3 elevation-8 mb-3">
      <div class="text-center">
        <v-btn color="primary" small @click.prevent="add"
          ><v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-card>
    <v-card
      v-for="(example, index) in examples"
      v-else
      :key="`example-${index}`"
      class="pa-3 elevation-8 mb-3"
    >
      <v-btn
        icon
        class="ma-1"
        color="error"
        style="position: absolute; bottom: 0; right: 0"
        @click.prevent="remove(index)"
      >
        <v-icon medium>mdi-delete</v-icon>
      </v-btn>
      <div class="d-flex">
        <v-text-field
          v-model="example.order"
          type="number"
          label="Order"
          filled
          class="mr-3 order shrink"
        ></v-text-field>
        <v-textarea
          v-model="example.example"
          name="example"
          filled
          clearable
          label="Example"
          rows="3"
        ></v-textarea>
      </div>
      <v-textarea
        v-model="example.translation"
        name="def"
        filled
        clearable
        label="Translation"
        rows="3"
        full-width
      ></v-textarea>
      <div v-if="index === examples.length - 1" class="text-center">
        <v-btn color="primary" small @click.prevent="add"
          ><v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import { cloneDeep as _cloneDeep } from 'lodash'
export default {
  props: {
    value: {
      required: false,
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      exampleJson: { order: '', example: '', translation: '' },
      examples: [],
    }
  },
  watch: {
    examples(newValue) {
      this.$emit('input', newValue)
    },
  },
  mounted() {
    if (this.value.length) {
      this.examples = this.updateKeyNames(this.value)
    }
  },
  methods: {
    add() {
      this.examples.push(this.exampleJson)
    },
    remove(index) {
      this.examples.splice(index, 1)
    },

    updateKeyNames(values) {
      const newValues = _cloneDeep(values)
      newValues.forEach((item) => {
        item.translation = item.traduction || item.translation
        delete item.traduction
        item.example = item.exemple || item.example
        delete item.exemple
      })
      return newValues
    },
  },
}
</script>

<style scoped>
.v-text-field.order {
  width: 100px;
}
</style>
