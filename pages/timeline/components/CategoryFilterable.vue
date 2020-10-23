<template>
  <div class="overflow-hidden">
    <template v-if="!loading">
      <div
        class="lg:hover:bg-bg-primary py-3 px-4 flex items-center"
        :class="marginLeft"
      >
        <div class="flex-grow text-text-primary">
          <NizInputCheckbox
            v-model="checked"
            :value="category.id"
            name="category"
          >
            <div class="font-semibold">
              {{ category.name }}
            </div>
          </NizInputCheckbox>
        </div>
        <div
          class="rounded-full bg-bg-light text-text-primary h-6 w-6 flex items-center justify-center cursor-pointer"
          @click.prevent="open = !open"
        >
          <IconChevronLeft class="h-4 w-4 stroke-3 stroke-current" :class="{'hidden':open}" />
          <IconChevronDown class="h-4 w-4 stroke-3 stroke-current" :class="{'hidden':!open}" />
        </div>
      </div>
      <transition name="slide">
        <CategoryFilterable
          v-for="cat in category.children"
          v-show="open"
          :key="cat.id"
          :category="cat"
          :depth="depth + 1"
          :click="click"
          @click="click"
        />
      </transition>
    </template>
    <div v-else class="flex items-center justify-start px-5 py-2">
      <SkeletonBox class="h-5 w-6 mr-4 rounded-sm" />
      <SkeletonBox class="h-5 w-full rounded-lg" />
    </div>
  </div>
</template>

<script>
// import CategoryFilterable from '@/components/category/CategoryFilterable'
export default {
  name: 'CategoryFilterable',
  // components: {
  //   CategoryFilterable
  // },
  props: {
    category: {
      required: true,
      type: Object
    },
    depth: {
      required: false,
      type: Number,
      default: 0
    },
    last: {
      required: false,
      type: Boolean,
      default: false
    },
    click: {
      required: false,
      type: Function,
      default: null
    },
    loading: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checked: false,
      open: false
    }
  },
  computed: {
    marginLeft () {
      return `ml-${4 * this.depth}`
    }
  },
  watch: {
    checked () {
      this.$emit('click', this.category.id, this.checked)
    }
  }
}
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 200ms linear;
}
.slide-enter, .slide-leave-to{
  max-height:0px;
}
.slide-enter-to, .slide-leave{
  max-height:4rem;
}
</style>
