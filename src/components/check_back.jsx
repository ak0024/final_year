import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Back() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/data')
      .then(response => {
        setMessage(response.data.message);
        console.log(response)
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });
  }, []);

  return (
    <div>
      <h1>Fetch Data Example</h1>
      <p>{message}</p>
    </div>
  );
}

export default Back;
