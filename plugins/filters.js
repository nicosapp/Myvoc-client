import Vue from 'vue'

Vue.filter('capitalize', (val) => {
  if (!val) {
    return ''
  }
  return val.charAt(0).toUpperCase() + val.slice(1)
})

Vue.filter('fullTerm', (item) => {
  if (!item) {
    return ''
  } else if (typeof item === 'string') {
    return item
  }
  return `${item.pre || ''} ${item.lang || ''} ${item.suf || ''}`
})
