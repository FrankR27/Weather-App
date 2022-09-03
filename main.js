const getWeatherData = async (city) => {
  try {
    const URL = "https://api.openweathermap.org/data/2.5/weather";
    const response = await fetch(
      `${URL}?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=imperial`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Hubo un problemita ):");
  }
};

const searchCity = async () => {
  const city = document.getElementById("city-input").value;
  const data = await getWeatherData(city);
  showWeatherData(data);
};

document.getElementById("btn-search").onclick = () => searchCity();

const showWeatherData = (weatherData) => {
  if (weatherData.cod === "404") {
    document.getElementById("city-name").innerText = weatherData.message;
    document.getElementById("weather-type").innerText = "----";
    document.getElementById("temp").innerText = "--°";
    document.getElementById("min-temp").innerText = "--°";
    document.getElementById("max-temp").innerText = "--°";
    return;
  }
  document.getElementById("city-name").innerText = weatherData.name;
  document.getElementById("weather-type").innerText =
    weatherData.weather[0]["main"];
  document.getElementById("temp").innerText = weatherData.main["temp"];
  document.getElementById("min-temp").innerText = weatherData.main["temp_min"];
  document.getElementById("max-temp").innerText = weatherData.main["temp_max"];
};
