import React, { useEffect, useState } from "react";
import axios from "axios";
import News from "./assets/components/News";

function App() {
  const [data, setData] = useState(null);
  const [selectedQ, setSelectedQ] = useState("adidas"); // Default value

  const fetchData = async () => {
    const options = {
      method: "GET",
      url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete",
      params: {
        q: selectedQ,
        region: "US",
      },
      headers: {
        "X-RapidAPI-Key": "46e48277d1msh69f16805832974bp10d7b2jsn03c483dfb382",
        "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
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
  }, [selectedQ]);

  const handleSelectChange = (event) => {
    setSelectedQ(event.target.value);
  };

  return (
    <div className="items-center h-screen justify-center text-center">
      <button className="bg-blue-100">
        <News />
      </button>
      <div className="container">
        <label htmlFor="selectQ">Select Qoute:</label>
        <select id="selectQ" value={selectedQ} onChange={handleSelectChange}>
          <option value="adidas">Adidas</option>
          <option value="tesla">Tesla</option>
          <option value="apple">Apple</option>
          <option value="nike">Nike</option>
          <option value="google">Google</option>
          <option value="amazon">Amazon</option>
          <option value="microsoft">Microsoft</option>
          <option value="facebook">Facebook</option>
        </select>
      </div>

      {data ? (
        <div className="bg-blue-400 mt-4">
          {data.map((item) => (
            <div key={item.symbol} className="pt-4">
              <p>Symbol: {item.symbol}</p>
              <p>Shortname: {item.shortname}</p>
              <p>Exchange: {item.exchange}</p>
              <p>Quote Type: {item.quoteType}</p>
              {item.news ? (
                <div>
                  <p>News:</p>
                  <ul>
                    {item.news.map((newsItem) => (
                      <li key={newsItem.uuid}>{newsItem.title}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No news available for this item.</p>
              )}
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
