import { store } from '@/store/store'

export function customUserTickets() {
  
  const customTicketList = fetch('https://jsonplaceholder.typicode.com/albums')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      } else {
        return response.json()
      }
    })
    .then((json) => {
      // TODO - add response to global vuex object so that it's reactive on login
      store.dispatch('savePosts', json)
      return json
    })
    .catch((error) => {
      console.error('Error:', error)
      return error
    })

  return customTicketList
}