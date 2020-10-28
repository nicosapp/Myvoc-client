<template>
  <v-dialog
    v-model="filterVisible"
    width="300"
    :fullscreen="$vuetify.breakpoint.mobile"
    hide-overlay
  >
    <v-card>
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
          <div class="d-flex">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="cancel"> Cancel </v-btn>
            <v-btn text color="primary" @click="filterVisible = false">
              OK
            </v-btn>
          </div>
        </v-layout>
      </v-date-picker>
    </v-card>
  </v-dialog>
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
    cancel() {
      this.model = null
      this.filterVisible = false
      this.setFilters({ date: null })
    },
    set(date) {
      this.model = date
      this.setFilters({ date })
    },
  },
}
</script>
