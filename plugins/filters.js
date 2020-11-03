import Vue from 'vue'

Vue.filter('capitalize', (value) => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('fullTerm', (item) => {
  if (!item) {
    return ''
  } else if (typeof item === 'string') {
    return item
  }
  return `${item.pre || ''} ${item.lang || ''} ${item.suf || ''}`
})

Vue.filter('longTermTruncated', (value) => {
  if (!value) return ''
  if (typeof value !== 'string') return ''
  return value.length < 400 ? value : value.substring(0, 400) + '...'
})
