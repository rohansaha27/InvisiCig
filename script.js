// script.js

// Function to handle the retrieval of the AQI and calculating the cigarette equivalent
function fetchAQI() {
  // Getting the city from the input field
  var city = document.getElementById('city').value.trim();

  // If the city is not provided, display an error message
  if (!city) {
    document.getElementById('error-message').textContent = 'Please enter a valid city.';
    return;
  }

  // Constructing the URL for the AQI service API
  var apiUrl = "https://api.waqi.info/feed/" + city + "/?token=184a13ff7822fd342fdf6fc43fdda2b1a8d41ea1";

  // Fetching data from the AQI service
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parsing the JSON data from the response
    })
    .then(data => {
      if (data.status !== "ok") {
        throw new Error('Error fetching the AQI');
      }
      var aqi = data.data.aqi; // Getting the AQI value from the response data
      displayResults(aqi); // Displaying the results based on the AQI
    })
    .catch(error => {
      // If there is an error during the fetch, display an error message
      document.getElementById('error-message').textContent = 'Invalid input or network error.';
      console.error('Fetch operation error:', error);
    });
}

// Function to display the results based on the AQI
function displayResults(aqi) {
  // Calculating the equivalent number of cigarettes based on the AQI
  var cigarettesEquivalent = Math.round(aqi / 22); // Rounded to the nearest whole number

  // Updating the content of the AQI result element
  document.getElementById('aqi-result').textContent = "AQI: " + aqi;

  // Updating the content of the cigarette result element with the new label
  document.getElementById('cigarette-result').textContent = "Cigarettes Smoked: " + cigarettesEquivalent;

  // Hiding the home screen and showing the results screen
  document.getElementById('home-screen').style.display = 'none';
  document.getElementById('results-screen').style.display = 'block';
}

// Function to handle the action of the "Back" button
function goBack() {
  // Clearing any previous error message
  document.getElementById('error-message').textContent = '';

  // Clearing the input field
  document.getElementById('city').value = '';

  // Hiding the results screen and showing the home screen
  document.getElementById('results-screen').style.display = 'none';
  document.getElementById('home-screen').style.display = 'block';
}
