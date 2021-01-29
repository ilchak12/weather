let cityName = document.querySelector(".get-city-name");
let getWeatherBtn = document.querySelector(".get-weather-btn");

class Weather {
    constructor(city, temp, pressure, desc, humidity, windSpeed, windDeg, icon, parent) {
        this.city = city;
        this.temp = temp;
        this.pressure = pressure;
        this.desc = desc;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.windDeg = windDeg;
        this.icon = icon;
        this.parent = document.querySelector(".weather-block");
    }
    render() {
        let weatherBlock = document.createElement("div");
        weatherBlock.classList.add("weather");
        weatherBlock.innerHTML = `  
            <div class="weather-info">
                <div class="weather-title">
                    <h2>${this.city}</h2>
                </div>
                <p class="temp">Temperature: ${this.temp}&#176;C</p>
                <p class="desc">${this.desc}</p>
                <p class="pressure">Pressure: ${this.pressure} hPa</p>
                <p class="humidity">Humidity: ${this.humidity}%</p>
                <div class="wind">
                    <p class="wind-speed">Wind speed: ${this.windSpeed} km/h</p>
                    <p class="wind-deg">Wind degrees: ${this.windDeg}</p>
                </div>
            </div>
            <div class="weather-icon">
                <img src="https://openweathermap.org/img/w/${this.icon}.png" alt="">
            </div>
        `
        var weatherBlockDel = document.querySelector(".weather");
        if(!weatherBlockDel) {
            this.parent.append(weatherBlock);
        } else {
            weatherBlockDel.remove();
            this.parent.append(weatherBlock);
        }
    }
}

getWeatherBtn.addEventListener("click", function() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric&APPID=5d066958a60d315387d9492393935c19`)
    .then(response => response.json())
    .then(data => {
        new Weather (
            data.name,
            data.main.temp,
            data.main.pressure,
            data.weather.map((item) => item.description),
            data.main.humidity,
            data.wind.speed,
            data.wind.deg,
            data.weather.map((item) => item.icon)
        ).render()
    })
})

