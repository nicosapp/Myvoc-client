<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <v-form ref="form" v-model="valid" @submit.prevent="add">
        <div style="position: relative">
          <v-text-field
            v-model="search"
            filled
            name="name"
            :label="label"
            clearable
            :rules="[rules.required, rules.min(2, search)]"
            :loading="loading"
            :disabled="loading"
            :error-messages="validation.name"
            @input="validation = {}"
          >
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
      <LoadingCircular v-if="!dictionnaries" height="200px" />
      <div v-else>
        <v-chip
          v-for="item in filtered"
          :key="item.id"
          class="text-capitalize elevation-2 mr-2 mb-2"
          color="primary"
          close
          :disabled="loading"
          @click="edit(item)"
          @click:close="destroy(item)"
        >
          <span class="font-weight-medium mr-1">{{ item.name }}</span>
          <span class="font-weight-light">({{ item.terms_count }})</span>
        </v-chip>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { debounce as _debounce } from 'lodash'
import validationRules from '@/mixins/helper/formValidationRules'
export default {
  mixins: [validationRules],
  props: {
    label: {
      type: String,
      required: true,
    },
    endpoint: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      valid: true,
      search: null,
      items: null,
      filtered: null,
      loading: false,
      validation: {},
    }
  },
  computed: {
    disabled() {
      return !this.valid || this.loading
    },
  },

  watch: {
    search: {
      handler: _debounce(function (v) {
        this.filter(v)
      }, 500),
    },
  },

  async mounted() {
    try {
      const response = await this.$axios.$get(this.endpoint)
      this.items = response.data
      this.filtered = response.data
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
        taxnomy: this.taxnomy,
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
            this.filter(this.search)
            break
          case 'patch':
            await this.$axios.$patch(`${this.endpoint}/${item.id}`, item)
            this.items = this.items.map((i) => {
              if (i.id === item.id) return item
              return i
            })
            this.filter(this.search)
            break
          case 'delete':
            await this.$axios.$delete(`${this.endpoint}/${item.id}`)
            this.items = this.items.filter((g) => g.id !== item.id)
            break
        }
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
