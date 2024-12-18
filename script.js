const apiKey = '024639c550cd4c2ed355ca7f1cf62618'; // Your Weatherstack API key
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

searchButton.addEventListener('click', fetchWeather);

async function fetchWeather() {
    const city = cityInput.value.trim();

    if (!city) {
        weatherResult.innerHTML = '<p class="error">Please enter a city name.</p>';
        return;
    }

    try {
        const response = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function displayWeather(data) {
    if (data.success === false) {
        weatherResult.innerHTML = `<p class="error">${data.error.info}</p>`;
        return;
    }

    const { location, current } = data;
    const weatherHTML = `
        <h2>${location.name}, ${location.country}</h2>
        <p>Temperature: ${current.temperature} °C</p>
        <p>Weather: ${current.weather_descriptions[0]}</p>
        <p>Humidity: ${current.humidity}%</p>
    `;
    weatherResult.innerHTML = weatherHTML;
}
