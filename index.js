const inputCity = document.getElementById("inputId");
const searchBtn = document.getElementById("btnId");

searchBtn.addEventListener("click", () => {
  if (inputCity.value) {
    datefunc();
    getWeatherInfo();
  }
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

    // Parsing raw data
    const weatherData = await weatherDataFetch.json();
    // console.log(weatherData);

    // Declarations
    const city = document.getElementById("city");
    const temp = document.getElementById("temp");
    const weatherInfo = document.getElementById("weatherInfo");
    const tempMax = document.getElementById("tempMax");
    const tempMin = document.getElementById("tempMin");

    // City Name
    city.innerText = weatherData.name;

    // Weather Icon and Description
    weatherInfo.innerHTML = `
        <img
          src=" https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"
          alt="weather image"
        />
        <p>${weatherData.weather[0].description}</p>`;

    // Actual temperature in Celcius
    temp.innerText = `${weatherData.main.temp}°C`;

    // Temperature Max and Min
    tempMax.innerHTML = `
        <h5>High</h5>
        <p >${weatherData.main.temp_max}°C</p>
        `;
    tempMin.innerHTML = `
        <h5>Low</h5>
        <p >${weatherData.main.temp_min}°C</p>
        `;

    inputCity.value = "";
  } catch (err) {
    console.log(err);
  }
};
