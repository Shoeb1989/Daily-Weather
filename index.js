const apiKey = '9c088cea413c4c5999a151310241510';
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
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=6`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
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

    let forecastHTMLLeft = `<h2>${name}, ${region}, ${country}</h2>`;
    forecastHTMLLeft += `<p>Current Temperature: ${temp_c}°C</p>`;
    forecastHTMLLeft += `<p>Condition: ${condition.text}</p>`;
    forecastHTMLLeft += `<img src="${condition.icon}" alt="${condition.text}">`;
    forecastHTMLLeft += `<h3>Upcoming Forecast</h3><ul>`;

    let forecastHTMLRight = ``;

    forecast.slice(0, 3).forEach(day => {
        forecastHTMLLeft += `<li>${day.date}: <br>${day.day.avgtemp_c}°C <br>${day.day.condition.text}</li>`;
    });

    forecast.slice(3).forEach(day => {
        forecastHTMLRight += `<li>${day.date}: <br>${day.day.avgtemp_c}°C <br>${day.day.condition.text}</li>`;
    });

    forecastHTMLLeft += '</ul>';
    forecastHTMLRight += '</ul>';

    document.querySelector('.forecast-left').innerHTML = forecastHTMLLeft;
    document.querySelector('.forecast-right').innerHTML = forecastHTMLRight;
}


function showError(message) {
    weatherInfo.innerHTML = '';
    errorMessage.textContent = message;
}
