export function flattenDeepArray(array, key) {
  const flat = (r, a) => {
    const b = {}
    Object.keys(a).forEach(function (k) {
      if (k !== key) {
        b[k] = a[k]
      }
    })
    r.push(b)
    if (Array.isArray(a[key])) {
      b[key] = a[key].map(function (a) {
        return a.id
      })
      return a[key].reduce(flat, r)
    }
    return r
  }

  return array.reduce(flat, [])
}

export function flattenCategories(array) {
  const key = 'children'
  const total = []

  // const flat = (total, currentValue, currentIndex) => {
  //   const b = {}
  //   let parentId = parentId || null
  //   Object.keys(currentValue).forEach(function (k) {
  //     if (k !== key) {
  //       b[k] = currentValue[k]
  //     }
  //     b.order = currentIndex
  //     b.parent_id = parentId
  //   })
  //   total.push(b)
  //   if (Array.isArray(currentValue[key])) {
  //     parentId = currentValue[key].length ? b.id : null // we reset parentId if empty array
  //     b[key] = currentValue[key].map(function (a) { return a.id })
  //     return currentValue[key].reduce(flat, total)
  //   }
  //   return total
  // }
  // return array.reduce(flat, [])

  const flat = (element, index, parentId) => {
    const b = {}
    Object.keys(element).forEach(function (k) {
      if (k !== key) {
        b[k] = element[k]
      }
      b.order = index
      b.parent_id = parentId
    })
    total.push(b)
    if (Array.isArray(element[key])) {
      b[key] = element[key].map(function (a) {
        return a.id
      })
      element[key].forEach((element, index) => flat(element, index, b.id))
    }
  }
  // return array.reduce(flat, []) // reducer & initialValue
  array.forEach((element, index) => flat(element, index, null))
  return total
}
