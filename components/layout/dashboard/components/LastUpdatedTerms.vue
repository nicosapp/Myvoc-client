<template>
  <DashboardBoxTemplate
    label="Last updated"
    endpoint="lastUpdated"
    :dictionnary="dictionnary"
  />
</template>
<script>
export default {
  props: {
    dictionnary: {
      type: String,
      required: true,
    },
  },
}
</script>
