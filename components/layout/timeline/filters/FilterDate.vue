<template>
  <DialogFilter title="Date" :width="300">
    <template v-slot:default>
      <v-date-picker
        ref="picker"
        v-model="date"
        light
        color="primary"
        full-width
        show-current
        @click:year="set"
        @click:month="set"
        @click:date="set"
      >
        <v-layout column>
          <v-text-field
            v-model="model"
            filled
            label="Selected date"
            prepend-inner-icon="mdi-calendar"
            readonly
          ></v-text-field>
        </v-layout>
      </v-date-picker>
    </template>

    <template v-slot:actions>
      <v-spacer></v-spacer>
      <v-btn text @click.prevent="model = []">Clear</v-btn>
    </template>
  </DialogFilter>
</template>

<script>
import timelineHelper from '@/mixins/timeline'
export default {
  mixins: [timelineHelper],
  data() {
    return {
      model: null,
      date: null,
      pickerDate: null,
    }
  },
  methods: {
    set(date) {
      this.model = date
      this.setFilters({ date })
    },
  },
}
</script>
