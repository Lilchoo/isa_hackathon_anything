// frontend/script.js

document.addEventListener('DOMContentLoaded', () => {
    const getResultForm = document.getElementById('getResultForm');
    const submitDataForm = document.getElementById('submitDataForm');
    const resultContainer = document.getElementById('resultContainer');
  
    getResultForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('getName').value;
  
      // Make a GET request
      fetch(`http://localhost:3000/result?name=${name}`)
        .then(response => response.json())
        .then(data => {
          console.log('GET Request Result:', data);
          // Handle the response data as needed
          resultContainer.innerHTML = `<p>ID: ${data.id}</p><p>Name: ${data.name}</p><p>Data: ${data.data}</p>`;
        })
        .catch(error => console.error('Error:', error));
    });
  
    submitDataForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('postName').value;
      const data = document.getElementById('postData').value;
  
      // Make a POST request
      fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, data }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('POST Request Result:', data);
          resultContainer.innerHTML = `created: <p>ID: ${data.id}</p><p>Name: ${data.name}</p><p>Data: ${data.data}</p>`;
          // Handle the response data as needed
        })
        .catch(error => console.error('Error:', error));
    });
  });
  