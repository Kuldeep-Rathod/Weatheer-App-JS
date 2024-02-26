const apiKey = `ea95432aee1143958fa164341240902`;
// const city = "mahuva";



async function fetchWeatherData(city) {
    try{
        const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );
    
        if (!response.ok){
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();
        console.log(data);
        // console.log(data.current.temp_c);
        // console.log(data.current.wind_kph);
        // console.log(data.current.humidity);
        // console.log(data.current.vis_km);
        // console.log(data.location.name);
        // console.log(data.current.condition.text);
        updateWeatherUI(data);
    } catch (error) {
        console.error(error);
    }
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const wind = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");
const description = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionicon = document.querySelector(".description i");

// fetchWeatherData();

function updateWeatherUI(data) {
    cityElement.textContent = data.location.name;

    temperature.textContent = `${Math.round(data.current.temp_c)}°`;

    wind.textContent = `${data.current.wind_kph} km/h`;

    humidity.textContent = `${data.current.humidity}%`;

    visibility.textContent = `${data.current.vis_km} km`;

    description.textContent = `${data.current.condition.text}`;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();


    let status = data.current.condition.text;
    const weatherIconName = getWeatherIconName(status.trim());
    descriptionicon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;

}


const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input")

formElement.addEventListener('submit', function(e){
    e.preventDefault();

    const city = inputElement.value;
    if(city !== ""){
        fetchWeatherData(city);
        inputElement.value = "";
    }

});

function getWeatherIconName(weatherCondition) {

    const iconMap ={
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };
    return iconMap[weatherCondition] || "help"

}