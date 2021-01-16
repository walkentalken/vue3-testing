export function defaultTickets() {
  
  const ticketList = fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      } else {
        return response.json()
      }
    })
    .then((json) => {
      return json
    })
    .catch((error) => {
      console.error('Error:', error)
      return error
    })
    
  return ticketList
}