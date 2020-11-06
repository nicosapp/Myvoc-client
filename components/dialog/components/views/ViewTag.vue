<template>
  <ViewChipPropertyTemplate :items="term.tags" label="Tags" color="accent" />
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
