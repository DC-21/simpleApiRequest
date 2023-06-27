import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [selectedQ, setSelectedQ] = useState('adidas'); // Default value

  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete',
      params: {
        q: selectedQ,
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
  }, [selectedQ]); // Fetch data when selectedQ changes

  const handleSelectChange = (event) => {
    setSelectedQ(event.target.value);
  };

  return (
    <div className="items-center h-screen justify-center text-center">
      <div>
        <label htmlFor="selectQ">Select Q:</label>
        <select id="selectQ" value={selectedQ} onChange={handleSelectChange}>
          <option value="adidas">Adidas</option>
          <option value="tesla">Tesla</option>
          <option value="apple">Apple</option>
          <option value="apple">Microsoft</option>
          <option value="apple">Samsung</option>
        </select>
      </div>
      
      {data ? (
        <div>
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
