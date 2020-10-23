<template>
  <v-container>
    <div class="md:flex justify-end mb-2">
      <form
        class="flex w-full items-center mr-2 mb-2 md:mb-0"
        @submit.prevent="add"
      >
        <input
          v-model="create.name"
          type="text"
          class="py-2 px-3 border outline-none border-gray-400 bg-white text-gray-700 rounded flex-grow mr-2"
          placeholder="Category"
          name="name"
        />
        <NizButtonSubmit value="Add" :loading="loading" />
      </form>
      <v-btn
        value="Save"
        type="button"
        class="w-full lg:w-auto"
        :loading="loading"
        @click="updateCategories"
      />
    </div>
    <CategorySortable
      :categories="categories"
      :remove="remove"
      :click="clickCategory"
      :remove-btn="true"
    />
  </v-container>
</template>

<script>
// import { filter as _filter } from 'lodash'
import { filterDeep as _filterDeep } from 'deepdash'
import { flattenCategories as _flattenCategories } from './components/flattenCategoriesArray'
import CategorySortable from './components/CategorySortable'
export default {
  components: {
    CategorySortable,
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('me/categories')

    return {
      categories: response.data,
    }
  },
  data() {
    return {
      categories: [],
      create: {
        name: '',
      },
      edit: {
        id: null,
        name: '',
        user_id: null,
      },
      loading: false,
    }
  },
  methods: {
    async add() {
      try {
        const response = await this.$axios.post('me/categories', this.create)
        this.categories.push(response.data.data)
        this.create = { name: '' }
        this.$notifySuccess({
          title: this.$t('Category created!'),
          text: this.$t('Your category is now created!'),
        })
      } catch (e) {
        this.$notifyError({ title: 'Error', text: e.response.data.error })
      }
    },

    async update() {
      if (this.edit.id != null) {
        try {
          await this.$axios.$patch(`me/categories/${this.edit.id}`, this.edit)
          this.$notifySuccess({
            title: this.$t('Category updated!'),
            text: this.$t('Your category is now updated!'),
          })
        } catch (e) {
          this.$notifyError({ title: 'Error', text: e.response.data.error })
        }
      }
    },

    async remove(category) {
      if (
        !window.confirm(
          this.$t('Are you sure you want to delete this category?')
        )
      ) {
        return
      }
      try {
        await this.$axios.$delete(`me/categories/${category.id}`)
        this.categories = _filterDeep(
          this.categories,
          (c) => c.id !== category.id,
          {
            childrenPath: 'children',
          }
        )
        this.$notifySuccess({
          title: this.$t('Category deleted!'),
          text: this.$t('Your category is now deleted!'),
        })
      } catch (e) {
        this.$notifyError({ title: 'Error', text: e.response.data.error })
      }
    },
    async updateCategories() {
      try {
        const flatCategories = _flattenCategories(this.categories, 'children')
        await this.$axios.$patch('me/categoriesBulk', {
          categories: flatCategories,
        })
        this.$notifySuccess({
          title: this.$t('Categories sorted!'),
          text: this.$t('Your categories are now sorted!'),
        })
      } catch (e) {
        this.$notifyError({ title: 'Error', text: e.response.data.error })
      }
    },

    clickCategory(category) {
      this.edit = category
      this.$refs.tabs.selectedIndex = 1
    },
  },
  head() {
    return {
      title: 'Categories',
    }
  },
}
</script>
