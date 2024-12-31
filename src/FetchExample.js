import React, { useState } from 'react';

const FetchExample = () => {
  // State to store data, loading status, and error message
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // Initially not loading
  const [error, setError] = useState(null);

  // Function to fetch data when the button is clicked
  const handleFetchData = async () => {
    setLoading(true); // Set loading to true when starting the fetch
    setError(null); // Reset any previous errors

    try {
      // Make a GET request to the REST API
      const response = await fetch('http://127.0.0.1:5000/add?num1=10&num2=20');
      alert("Response received")
      // Check if the response is successful (status code 200)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Parse the response body as JSON
      const result = await response.json();
      alert(result.result)
      // Update state with the fetched data
      //setData(result);
    } catch (error) {
      // If there's an error, update the error state
      setError(error);
    } finally {
      // Set loading to false after the request is completed
      setLoading(false);
    }
  };

  // Conditional rendering based on the loading and error states
  return (
    <div>
      <button onClick={handleFetchData}>Add Two Numbers</button>

      {loading && <div>Loading...</div>}

      {error && <div>Error: {error}</div>}

      {data && (
        <div>
          <h1>Posts</h1>
          <ul>
            {data.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FetchExample;
