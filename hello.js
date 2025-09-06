// Get the chatId (Node.js compatible - localStorage not available)
const chatId = 5729797;

// Check if chatId is available (using hardcoded value since localStorage not available in Node.js)
if (chatId) {
    // Hit the API
    fetch(`http://localhost:${process.env.PORT || 3000}/login-count/${chatId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Handle the response data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
} else {
    console.error('chatId not found in localStorage.');
}
