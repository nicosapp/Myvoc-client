<template>
  <DashboardBoxTemplate
    label="Last created"
    endpoint="lastCreated"
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
