<template>
  <div><ChipAttributes label="Grammar" endpoint="grammars" /></div>
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
