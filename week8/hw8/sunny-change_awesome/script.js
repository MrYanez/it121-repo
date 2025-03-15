const API_KEY = "9ed502d1175e70586a0e74fc0c914951";

// Convert Kelvin to Fahrenheit
const kelvinToF = k => ((k - 273.15) * 9/5 + 32).toFixed(2);

// Update clock
const updateClock = () => {
  $('#current-time').text(`Current time: ${new Date().toLocaleTimeString()}`);
};

// Get weather data
const getWeather = async (city, state) => {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},USA&limit=1&appid=${API_KEY}`;
  const geoData = await (await fetch(geoUrl)).json();

  if (!geoData.length) throw new Error('City not found');

  const { lat, lon } = geoData[0];
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  return await (await fetch(forecastUrl)).json();
};

// Create forecast HTML
const createForecastCard = (forecast, lat, lon) => {
  const date = new Date(forecast.dt * 1000);
  const weather = forecast.weather[0];

  return `
    <div class="forecast-day">
      <div class="date-container">
        <div class="date-info">
          <h3>${date.toLocaleDateString('en-US', { weekday: 'long' })}</h3>
          <p>${date.toLocaleDateString()}</p>
        </div>
        <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="${weather.description}"/>
      </div>
      <div class="temp-range">
        <p><strong>High:</strong> ${kelvinToF(forecast.main.temp_max)}°F</p>
        <p><strong>Low:</strong> ${kelvinToF(forecast.main.temp_min)}°F</p>
      </div>
      <p><strong>Current:</strong> ${kelvinToF(forecast.main.temp)}°F</p>
      <p><strong>Humidity:</strong> ${forecast.main.humidity}%</p>
      <p><strong>Weather:</strong> ${weather.main}</p>
      <p><strong>Description:</strong> ${weather.description}</p>
      <p><strong>Location:</strong> ${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E</p>
    </div>
  `;
};

$(document).ready(() => {
  setInterval(updateClock, 1000);
  updateClock();

  $('button').on('click', async (e) => {
    e.preventDefault();

    const city = $('input[name="city"]').val().trim();
    const state = $('select[name="state"]').val();

    if (!city) {
      $('#forecast').html('Please enter a city');
      return;
    }

    $('button').prop('disabled', true);

    try {
      const data = await getWeather(city, state);
      const { lat, lon } = data.city.coord;

      $('h3').text(`Daily Weather Forecast for ${city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}, ${state}`);

      const forecastHtml = data.list
        .filter((_, i) => i % 8 === 0)
        .map(forecast => createForecastCard(forecast, lat, lon))
        .join('');

      $('#forecast').html(`<div class="forecast-container">${forecastHtml}</div>`);
    } catch (error) {
      $('#forecast').html('Error fetching weather data');
      console.error('Weather API error:', error);
    } finally {
      $('button').prop('disabled', false);
    }
  });
});