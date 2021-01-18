import { store } from '@/store/store'

export function eventEndpoint(id) {
  
  const eventEndpoint = fetch('https://jsonplaceholder.typicode.com/albums/'+ id)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      } else {
        return response.json()
      }
    })
    .then((json) => {
      store.dispatch('setCurrentEvent', json)
      return json
    })
    .catch((error) => {
      console.error('Error:', error)
      return error
    })

  return eventEndpoint
}