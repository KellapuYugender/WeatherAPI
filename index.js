const searchBtn = document.getElementById("btnId");
const inputCity = document.getElementById("inputId");

searchBtn.addEventListener("click", () => {
  datefunc();
  getWeatherInfo();
});

const datefunc = () => {
  const date = document.getElementById("date");
  const dateInst = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  date.innerText = `${months[dateInst.getMonth()]} ${dateInst.getDate()}, ${dateInst.getFullYear()}`;
};

const toCelsius = (tempF) => {
  return ((tempF - 32) * (5 / 9)).toFixed(2);
};
const getWeatherInfo = async () => {
  try {
    const weatherDataFetch = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=9b28038e783ca3531cbef9dba56beee5&units=metric`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    const weatherData = await weatherDataFetch.json();
    console.log(weatherData);

    const city = document.getElementById("city");
    const temp = document.getElementById("temp");
    const weatherInfo = document.getElementById("weatherInfo");
    const tempMax = document.getElementById("tempMax");
    const tempMin = document.getElementById("tempMin");

    city.innerText = weatherData.name;

    temp.innerText = `${weatherData.main.temp}°C`;

    weatherInfo.innerHTML = `
     <img
          src=" https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"
          alt="weather image"
          class = "icon-cls"
        />
        <p>${weatherData.weather[0].description}</p>`;

    tempMax.innerText = `${weatherData.main.temp_max}°C`;

    tempMin.innerText = `${weatherData.main.temp_min}°C`;
  } catch (err) {
    console.log(err);
  }
};
