<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <div class="d-flex align-start">
        <v-select
          v-model="taxonomy"
          dark
          filled
          :items="taxonomies"
          class="mr-2"
          background-color="primary"
          label="Taxonomy"
          hide-details
          item-text="name"
          item-value="name"
          style="max-width: 50%; transition: all 0.3s ease-in-out"
          :style="selectStyle"
          :disabled="!taxonomies"
        >
          <template v-slot:selection="{ item }">
            <span class="text-capitalize">{{ item.name }}</span>
          </template>
          <template v-slot:item="{ item }">
            <span class="text-capitalize">{{ item.name }}</span>
          </template>
        </v-select>

        <v-form
          v-if="taxonomy"
          ref="form"
          v-model="valid"
          class="flex-grow-1"
          @submit.prevent="add"
        >
          <div style="position: relative">
            <v-text-field
              v-model="search"
              filled
              :label="label"
              name="name"
              :rules="[rules.required, rules.min(2, search)]"
              :loading="loading"
              :disabled="loading"
              :error-messages="validation.name"
              @input="validation = {}"
              @focus="textFieldFocused = true"
              @blur="textFieldFocused = false"
            >
              <template v-slot:label>
                <span class="text-capitalize">{{ label }}</span>
              </template>
            </v-text-field>
            <v-btn
              color="primary"
              small
              :loading="loading"
              :disabled="disabled"
              fab
              absolute
              style="top: 8px; right: 8px"
              type="submit"
              @click="validate"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-form>
      </div>
      <template v-if="taxonomy">
        <LoadingCircular v-if="!filtered" height="200px" />
        <div v-else>
          <v-chip
            v-for="item in orderedFiltered"
            :key="item.id"
            class="text-capitalize elevation-2 mr-2 mb-2"
            color="primary"
            close
            :disabled="loading"
            @click="edit(item)"
            @click:close="destroy(item)"
          >
            <span v-if="item.order" class="mr-1">{{ item.order }}.</span>
            <span class="font-weight-medium mr-1">{{ item.name }}</span>
            <span class="font-weight-light">({{ item.terms_count }})</span>
          </v-chip>
        </div>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import { debounce as _debounce, orderBy as _orderBy } from 'lodash'
import validationRules from '@/mixins/helper/formValidationRules'

export default {
  mixins: [validationRules],
  middleware: ['verified'],

  layout: 'dashboard',

  data() {
    return {
      valid: true,
      required: (v) => !!v || 'Required.',
      search: null,
      items: null,
      filtered: null,
      loading: false,
      validation: {},
      endpoint: 'taxonomies',
      taxonomies: [],
      taxonomy: null,
      textFieldFocused: false,
    }
  },
  computed: {
    disabled() {
      return !this.valid || this.loading
    },
    label() {
      return this.taxonomy || ''
    },
    selectStyle() {
      if (!this.taxonomy) return { 'max-width': '100%' }
      else if (this.textFieldFocused) return { 'max-width': '20%' }
      return { 'max-width': '50%' }
    },
    orderedFiltered() {
      return _orderBy(this.filtered, 'order', 'asc')
    },
  },

  watch: {
    async taxonomy(tax) {
      if (!tax) return
      const response = await this.$axios.$get(
        `${this.endpoint}?tax=${this.taxonomy}`
      )
      this.items = response.data
      this.filtered = response.data
    },
    search: {
      handler: _debounce(function (v) {
        this.filter(v)
      }, 500),
    },
  },

  async mounted() {
    this.$store.dispatch('bottomBar/setActive', 'dashboard')
    try {
      const response = await this.$axios.$get(`${this.endpoint}/list`)
      this.taxonomies = response.data
    } catch (e) {}
  },

  methods: {
    validate() {
      this.$refs.form.validate()
    },
    filter(v) {
      this.filtered = this.items.filter((e) => {
        return (e.name || '').toLowerCase().includes((v || '').toLowerCase())
      })
    },

    add() {
      this.update('post', 'added', {
        taxonomy: this.taxonomy,
        name: this.search,
      })
    },

    edit(item) {
      this.$dialog.show({
        component: 'DialogConfirm',
        title: 'Update',
        message: 'Choose your new the designation!',
        data: { text: item.name },
        okFunction: (newValue) => {
          const newItem = { ...item, ...{ name: newValue } }
          this.update('patch', 'updated', newItem)
        },
      })
    },

    destroy(item) {
      this.$dialog.show({
        title: 'Delete',
        message: `Do you really want to delete this ${this.label}?`,
        okFunction: () => {
          this.update('delete', 'deleted', item)
        },
      })
    },

    async update(method, action, item) {
      this.loading = true
      try {
        let response = null
        switch (method) {
          case 'post':
            response = await this.$axios.$post(this.endpoint, item)
            this.items.push(response.data)
            break
          case 'patch':
            await this.$axios.$patch(`${this.endpoint}/${item.id}`, item)
            this.items = this.items.map((i) => {
              if (i.id === item.id) return item
              return i
            })
            break
          case 'delete':
            await this.$axios.$delete(`${this.endpoint}/${item.id}`)
            this.items = this.items.filter((t) => t.id !== item.id)
            break
        }
        this.filter(this.search)
        this.$notifier.success({ message: `${this.label} ${action}!` })
      } catch (e) {
        if (e.response && e.response.status === 422) {
          this.validation = e.response.data.errors
        }
      }
      this.loading = false
    },
  },
}
</script>
