export const read = async (context, term) => {
  try {
    const response = await context.$axios.$get(`terms/${term.id}`)
    context.$notifier.success({ message: 'Term updated' })
    return response.data
  } catch (e) {
    context.$notifier.error500()
  }
}

export const create = async (context) => {
  try {
    const response = await context.$axios.$post('terms')
    context.$notifier.success({ message: 'Term created' })
    return response.data
  } catch (e) {
    context.$notifier.error500()
  }
  return false
}

export const update = async (context, term) => {
  try {
    await context.$axios.$patch(`terms/${term.id}`, term)
    context.$notifier.success({ message: 'Term updated' })
    return true
  } catch (e) {
    context.$notifier.error500()
  }
  return false
}

export const destroy = async (context, term) => {
  try {
    await context.$axios.$delete(`terms/${term.id}`)
    context.$notifier.success({ message: 'Term updated' })
    return true
  } catch (e) {
    context.$notifier.error500()
  }
  return false
}
