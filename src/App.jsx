import React from 'react'
import axios from 'axios'

const App = () => {

  axios.get('http://localhost:3000/posts')
  .then(response => {
    // Handle successful response
    console.log(response.data);
  })
  .catch(error => {
    // Handle error
    console.error(error);
  });

  return (
    <div>
      
    </div>
  )
}

export default App
