<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <LoadingCircular v-if="!dictionnaries" height="200px" />

      <div v-else>
        <div class="mb-3">
          <span class="text-subtitle">Native :</span>
          <span class="text-capitalize font-weight-medium">{{
            nativeName
          }}</span>
        </div>
        <div v-for="d in orderedDictionnaries" :key="d.id">
          <DictionnaryItem
            :ref="`dictionnary-${d.id}`"
            :dictionnary="d"
            :validation="validation"
            @update="edit"
            @delete="remove"
          >
          </DictionnaryItem>
        </div>
        <v-form ref="form" v-model="valid" @submit.prevent="add">
          <div class="d-flex align-baseline mb-3" style="width: 100%">
            <v-text-field
              v-model="dictionnary.order"
              class=""
              style="max-width: 20%"
              filled
              label="Order"
            ></v-text-field>
            <v-text-field
              v-model="dictionnary.name"
              :rules="[rules.required, rules.min(3, dictionnary.name)]"
              class="flex-grow-1 mx-3"
              filled
              label="Name"
              :error-messages="validationError"
            ></v-text-field>
            <div>
              <ColorPickerButton v-model="dictionnary.color" class="mx-2" />
            </div>
            <v-btn
              icon
              type="submit"
              color="primary"
              :loading="loading"
              :disabled="disabled"
              @click="validate"
            >
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </div>
        </v-form>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { rulesTextField as rules } from '@/plugins/formValidation'
import { orderBy as _orderBy } from 'lodash'

import DictionnaryItem from './DictionnaryItem'

export default {
  components: {
    DictionnaryItem,
  },
  middleware: ['verified'],
  layout: 'dashboard',
  data() {
    return {
      valid: true,
      loading: false,
      dictionnaries: null,
      editable: [],
      dictionnary: {
        order: 0,
        name: '',
        color: '#ffffff',
      },
      validation: {},
      rules,
    }
  },
  computed: {
    nativeName() {
      const index = this.dictionnaries.findIndex(
        (d) => d.slug === this.$auth.user.native
      )
      return index >= 0 ? this.dictionnaries[index].name : ''
    },
    orderedDictionnaries() {
      return _orderBy(this.dictionnaries, 'order', 'asc')
    },

    disabled() {
      return !this.valid || this.loading
    },
    validationError() {
      if (this.validation.id !== 0) return ''
      return this.validation.error[0] || ''
    },
  },
  async mounted() {
    try {
      const response = await this.$axios.$get('dictionnaries')
      this.dictionnaries = response.data
    } catch (e) {}
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    remove(index) {
      this.$dialog.show({
        title: 'Delete',
        message: 'Are you sure you want to delete this dictionnary?',
        okFunction: () => {
          this.removeConfirm(index)
        },
      })
    },
    removeConfirm(dictionnary) {
      this.update('delete', 'deleted', dictionnary)
    },

    add() {
      this.update('post', 'added', this.dictionnary)
    },

    edit(dictionnary) {
      this.update('patch', 'updated', dictionnary)
    },

    async update(method, action, dictionnary) {
      this.validation = {}
      this.loading = true
      try {
        let response = null
        switch (method) {
          case 'post':
            response = await this.$axios.$post(`dictionnaries`, dictionnary)
            this.dictionnary.name = ''
            this.dictionnary.order = 0
            this.dictionnary.color = '#ffffff'
            this.dictionnaries.push(response.data)
            break
          case 'patch':
            response = await this.$axios.$patch(
              `dictionnaries/${dictionnary.id}`,
              dictionnary
            )
            break
          case 'delete':
            response = await this.$axios.$delete(
              `dictionnaries/${dictionnary.id}`
            )
            this.dictionnaries = this.dictionnaries.filter(
              (d) => d.id !== dictionnary.id
            )
            break
        }

        this.$notifier.success({ message: `Dictionnary ${action}!` })
      } catch (e) {
        if (e.response && e.response.status === 422) {
          const id = dictionnary.id || 0
          this.validation = {
            id,
            error: Object.values(e.response.data.errors),
          }
        }
      }
      this.loading = false
    },
  },
}
</script>
