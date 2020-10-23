<template>
  <div>
    <v-card v-if="definitions.length === 0" class="pa-3 elevation-8 mb-3">
      <div class="text-center">
        <v-btn color="primary" small @click.prevent="add"
          ><v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-card>
    <v-card
      v-for="(definition, index) in definitions"
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
          v-model="definition.order"
          type="number"
          label="Order"
          filled
          class="mr-3 order shrink"
        ></v-text-field>
        <v-textarea
          v-model="definition.definition"
          class="flex-grow-1"
          name="def"
          filled
          clearable
          label="Definition"
          rows="3"
        ></v-textarea>
      </div>
      <div v-if="index === definitions.length - 1" class="text-center">
        <v-btn color="primary" small @click.prevent="add"
          ><v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
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
      definitionJson: { order: '', definition: '' },
      definitions: [],
    }
  },
  watch: {
    definitions(newValue) {
      this.$emit('input', newValue)
    },
  },
  mounted() {
    if (this.value.length) {
      this.definitions = this.value
    }
  },
  methods: {
    add() {
      this.definitions.push(this.definitionJson)
    },
    remove(index) {
      this.definitions.splice(index, 1)
    },
  },
}
</script>

<style scoped>
.v-text-field.order {
  width: 100px;
}
</style>
