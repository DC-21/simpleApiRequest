import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete',
      params: {
        q: 'adidas',
        region: 'US'
      },
      headers: {
        'X-RapidAPI-Key': '46e48277d1msh69f16805832974bp10d7b2jsn03c483dfb382',
        'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {data ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
