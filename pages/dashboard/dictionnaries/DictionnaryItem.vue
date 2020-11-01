<template>
  <div class="d-flex align-baseline" style="width: 100%">
    <v-text-field
      v-model="dictionnary.order"
      style="max-width: 20%"
      class=""
      type="number"
      filled
      label="Order"
    ></v-text-field>
    <v-text-field
      v-model="dictionnary.name"
      :rules="[rules.required, rules.min(3, dictionnary.name)]"
      class="flex-grow-1 mx-3"
      filled
      label="Name"
    ></v-text-field>
    <div>
      <ColorPickerButton v-model="dictionnary.color" class="mx-2" />
    </div>

    <v-btn icon @click.prevent="$emit('delete', dictionnary)">
      <v-icon>mdi-close-circle</v-icon>
    </v-btn>
  </div>
</template>

<script>
import validationRules from '@/mixins/helper/formValidationRules'
import { debounce as _debounce } from 'lodash'
export default {
  mixins: [validationRules],
  props: {
    dictionnary: {
      type: Object,
      required: true,
    },
  },
  watch: {
    dictionnary: {
      deep: true,
      handler: _debounce(function (dictionnary) {
        if (dictionnary.name.length < 3) {
          return
        }
        this.$emit('update', dictionnary)
      }, 500),
    },
  },
}
</script>
