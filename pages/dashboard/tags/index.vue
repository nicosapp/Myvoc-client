<template>
  <div><ChipAttributes label="Tag" endpoint="tags" /></div>
</template>

<script>
import ChipAttributes from '../components/ChipAttributes'
export default {
  middleware: ['verified'],
  components: {
    ChipAttributes,
  },
  layout: 'dashboard',
}
</script>
