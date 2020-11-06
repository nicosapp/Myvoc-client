<template>
  <div>
    <div class="text-caption">{{ label }}</div>
    <MarkdownForProperties
      class="preview-conjugation"
      :watches="extensions"
      :source="text"
    ></MarkdownForProperties>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      required: true,
      type: String,
    },
    label: {
      required: true,
      type: String,
    },
  },
  computed: {
    extensions() {
      return ['source']
    },
  },
}
</script>
