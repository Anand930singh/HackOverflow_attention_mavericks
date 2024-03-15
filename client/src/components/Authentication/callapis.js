const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    const requestData = {
      requestBody: formDataObject['username']
    };
    console.log(requestData)
    // Convert JSON object to a string
    const requestBody = JSON.stringify(requestData);
    const fastApiResponse = await fetch('http://localhost:8000/sentiment_analysis', { // Replace 'http://fastAPI_URL' with the URL of your fastAPI endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody
    });
    const fastApiData = await fastApiResponse.json();
    console.log(fastApiData);
  };