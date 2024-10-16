const apiKey = ''; put your API 
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
        if (!data || !data.location || !data.current) {
            throw new Error('Unexpected response structure.');
        }

        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {
    errorMessage.textContent = ''; 
    const { name, country } = data.location;
    const { temp_c, condition } = data.current;
    const forecast = data.forecast.forecastday;

    let forecastHTML = `<h2>${name}, ${country}</h2>`;
    forecastHTML += `<p>Current Temperature: ${temp_c}°C</p>`;
    forecastHTML += `<p>Condition: ${condition ? condition.text : 'N/A'}</p>`;
    if (condition && condition.icon) {
        forecastHTML += `<img src="${condition.icon}" alt="${condition.text}">`;
    }
    forecastHTML += `<h3>Upcoming Forecast</h3><ul>`;

    forecast.forEach(day => {
        forecastHTML += `<li>${day.date} <br> <br> <div> ${day.day.avgtemp_c}°C </div> <br> ${day.day.condition.text}</li>`;
    });

    forecastHTML += '</ul>';
    weatherInfo.innerHTML = forecastHTML;
}

function showError(message) {
    weatherInfo.innerHTML = '';
    errorMessage.textContent = message;
}
