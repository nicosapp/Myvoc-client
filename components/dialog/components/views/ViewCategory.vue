<template>
  <ViewChipPropertyTemplate
    :items="term.categories"
    label="Categories"
    color="primary"
  />
</template>

<script>
export default {
  props: {
    term: {
      required: true,
      type: Object,
    },
  },
}
</script>
