<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <v-form ref="form" v-model="valid" @submit.prevent="add">
        <div style="position: relative">
          <v-text-field
            v-model="search"
            filled
            name="name"
            label="Category"
            clearable
            :rules="[required]"
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
        <div class="mb-3 d-flex justify-center">
          <v-btn
            value="Save"
            type="button"
            color="primary"
            :loading="loading"
            :disabled="loading"
            @click="updatedOrder"
            >Update Order</v-btn
          >
        </div>
        <CategorySortable
          :categories="items"
          :remove="destroy"
          :click="edit"
          :remove-btn="true"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import {
  filterDeep as _filterDeep,
  eachDeep as _eachDeep,
} from 'deepdash-es/standalone'

import { flattenCategories as _flattenCategories } from './components/flattenCategoriesArray'
import CategorySortable from './components/CategorySortable'

export default {
  layout: 'dashboard',
  middleware: ['verified'],
  components: {
    CategorySortable,
  },
  data() {
    return {
      valid: true,
      required: (v) => !!v || 'Required.',
      search: null,
      items: null,
      loading: false,
      validation: {},
    }
  },

  computed: {
    disabled() {
      return !this.valid || this.loading
    },
  },

  async mounted() {
    try {
      const response = await this.$axios.$get('categories/?nested=1')
      this.items = response.data
    } catch (e) {}
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    add() {
      this.update('post', 'added', { name: this.search })
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
        message: `Do you really want to delete this category?`,
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
            response = await this.$axios.$post('categories', item)
            this.items.push(response.data)
            break
          case 'patch':
            response = await this.$axios.$patch(`categories/${item.id}`, item)
            // const path = _findPathDeep(this.items, (c) => c.id === item.id)
            // console.log(path)
            _eachDeep(this.items, (c) => {
              if (c && c.id === item.id) c.name = item.name
            })
            break
          case 'delete':
            await this.$axios.$delete(`categories/${item.id}`)
            this.items = _filterDeep(this.items, (c) => c.id !== item.id, {
              childrenPath: 'children',
            })
            break
        }
        this.$notifier.success({ message: `Category ${action}!` })
      } catch (e) {
        if (e.response && e.response.status === 422) {
          this.validation = e.response.data.errors
        }
        this.$notifier.error({ message: 'Sorry, we found an error :(' })
      }
      this.loading = false
    },

    async updatedOrder() {
      this.loading = true
      try {
        const flatCategories = _flattenCategories(this.items, 'children')
        await this.$axios.$patch('categories/bulk', {
          categories: flatCategories,
        })
        this.$notifier.success({ message: `Order upadated!` })
      } catch (e) {
        this.$notifier.error({ message: 'Sorry, we found an error :(' })
      }
      this.loading = false
    },
  },
  head() {
    return {
      title: 'Categories',
    }
  },
}
</script>
