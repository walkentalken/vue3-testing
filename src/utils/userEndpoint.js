export function userEndpoint(id) {
  
  const userData = fetch('https://jsonplaceholder.typicode.com/users/'+ id)
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

  return userData
}