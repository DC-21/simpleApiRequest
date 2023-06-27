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
      if (response.data && Array.isArray(response.data.quotes)) {
        setData(response.data.quotes);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="items-center bg-white justify-center text-center">
      {data ? (
        <div className='mt-4'>
          {data.map((item) => (
            <div key={item.symbol}>
              <p>Symbol: {item.symbol}</p>
              <p>Shortname: {item.shortname}</p>
              <p>Exchange: {item.exchange}</p>
              <p>Quote Type: {item.quoteType}</p>
              {/* Add more properties as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
