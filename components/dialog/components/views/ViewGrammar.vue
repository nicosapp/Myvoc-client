<template>
  <ViewChipPropertyTemplate :items="term.grammars" label="Grammars" />
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
