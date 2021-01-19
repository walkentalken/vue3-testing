export function searchEvents(inputText) {
  const searchResults = fetch('https://6007029b3698a80017de2751.mockapi.io/search/events?name=' + encodeURI(inputText))
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

  return searchResults
}