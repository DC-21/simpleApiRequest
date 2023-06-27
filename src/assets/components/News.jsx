import React, { useEffect } from 'react';
import axios from 'axios';

const News = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/get-details',
      params: {
        uuid: '9803606d-a324-3864-83a8-2bd621e6ccbd',
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
    } catch (error) {
      console.error(error);
    }
  };

  return <div></div>;
};

export default News;
