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
        <div v-for="(dictionnary, index) in orderedDictionnaries" :key="index">
          <DictionnaryItem
            :dictionnary="dictionnary"
            @update="edit"
            @delete="remove"
          >
          </DictionnaryItem>
        </div>
        <v-form ref="form" v-model="valid" @submit.prevent="add">
          <div class="d-flex align-baseline mb-3" style="width: 100%">
            <v-text-field
              v-model="order"
              class=""
              style="max-width: 20%"
              filled
              label="Order"
            ></v-text-field>
            <v-text-field
              v-model="name"
              :rules="[rules.required, rules.min(3, name)]"
              class="flex-grow-1 mx-3"
              filled
              label="Name"
            ></v-text-field>
            <div><ColorPickerButton v-model="color" class="mx-2" /></div>
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
import validationRules from '@/mixins/helper/formValidationRules'
import { orderBy as _orderBy } from 'lodash'

import DictionnaryItem from './DictionnaryItem'

export default {
  components: {
    DictionnaryItem,
  },
  mixins: [validationRules],
  middleware: ['verified'],
  layout: 'dashboard',
  data() {
    return {
      valid: true,
      loading: false,
      dictionnaries: null,
      editable: [],
      order: 0,
      name: '',
      color: '#ffffff',
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
      const dictionnary = {
        order: this.order,
        name: this.name,
        color: this.color,
      }
      this.update('post', 'added', dictionnary)
    },

    edit(dictionnary) {
      this.update('patch', 'updated', dictionnary)
    },

    async update(method, action, dictionnary) {
      this.loading = true
      try {
        let response = null
        switch (method) {
          case 'post':
            response = await this.$axios.$post(`dictionnaries`, dictionnary)
            this.name = ''
            this.order = 0
            this.color = ''
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
      } catch (e) {}
      this.loading = false
    },
  },
}
</script>
