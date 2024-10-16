 ## For Live Preview go to: https://daily-weather-shoeb.netlify.app/

The** Daily Weather** website is a user-friendly application that allows users to check the weather forecast for specific cities. Key features include:

- **City Search:** Users can enter a city name to retrieve current weather data.
- **Weather Information:** The app displays the current temperature, weather conditions, and a three-day forecast.
- **Error Handling:** User-friendly error messages guide users if they enter an invalid city name or if the API fails to return data.
- **Responsive Design:** The layout is designed to be visually appealing and functional across various devices.

  ### Key Components and Functionality

#### API Key
- Use API from  https://www.weatherapi.com/

#### DOM Elements
- Uses `document.getElementById` to reference key elements:
  - `searchButton`: The button that triggers the search.
  - `cityInput`: The input field for entering the city name.
  - `weatherInfo`: The div where weather data will be displayed.
  - `errorMessage`: The div for displaying error messages.

#### Event Listener
- An event listener is added to the search button:
  - When clicked, it retrieves the city name from the input.
  - If a city is provided, it calls `fetchWeather(city)`. If not, it displays an error message.

#### Fetching Weather Data
- The `fetchWeather` function constructs the API URL and fetches weather data:
  - Uses `fetch` to make an asynchronous request.
  - Handles errors based on the response status and checks the structure of the returned data.
  - If the response is valid, it calls `displayWeather(data)` to render the information.

#### Displaying Weather Data
- The `displayWeather` function formats and displays the weather data:
  - Extracts relevant information such as city name, temperature, and weather conditions.
  - Constructs HTML to show current weather and a forecast for the next few days.
 
## Screenshot 
![image](https://github.com/user-attachments/assets/c0955998-4fdb-403e-b08e-05bbcdd42fbd)
![image](https://github.com/user-attachments/assets/8480fdc9-6d35-4dc3-a496-ea491486da96)


  - Uses a loop to create a list of upcoming forecast days.

#### Error Handling
- The `showError` function is called when an error occurs:
  - Clears previous weather information.
  - Displays the provided error message to the user.
