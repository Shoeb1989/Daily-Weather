
const apiKey = 'e3ccc369eeb242e6afc143710241610';
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');




searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        showError('Please enter a city name.');
    }
});

async function fetchWeather(city) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
    console.log(`Fetching from URL: ${url}`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.error.message}`);
            
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {
    errorMessage.textContent = ''; // Clear previous error messages
    const { name, region, country } = data.location;
    const { temp_c, condition } = data.current;
    const forecast = data.forecast.forecastday;

    let forecastHTML = `<h2>${name}, ${region}, ${country}</h2>`;
    forecastHTML += `<p>Current Temperature: ${temp_c}°C</p>`;
    forecastHTML += `<p>Condition: ${condition.text}</p>`;
    forecastHTML += `<img src="${condition.icon}" alt="${condition.text}">`;
    forecastHTML += `<h3>Upcoming Forecast</h3><ul>`;


    forecast.forEach(day => {
        forecastHTML += `<li>${day.date} <br><br> ${day.day.avgtemp_c}°C <br><br> ${day.day.condition.text}</li>`;
    });

    forecastHTML += '</ul>';
    weatherInfo.innerHTML = forecastHTML;
}

function showError(message) {
    weatherInfo.innerHTML = '';
    errorMessage.textContent = message;
}
