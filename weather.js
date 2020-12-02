let celsius;
let fahrenheit;

//array used to change backgroung image based on current weather description
const weatherInfo = [
    {
        description: "Thunderstorm",
        image: "lightning.jpg"
    },
    {
        description: "Rain",
        image: "rainy.jpg"
    },
    {
        description: "Snow",
        image: "snow.jpeg"
    },
    {
        description: "Fog",
        image: "foggy.jpg"
    },
    {
        description: "Clear",
        image: "sunny.jpg"
    },
    {
        description: "Clouds",
        image: "cloudy.jpg"
    },
]

window.addEventListener('load', (event) => {
    let lat;
    let long;
    let tempValue = document.querySelector('.number');
    let weatherDescription = document.querySelector('.description');
    let location = document.querySelector('.location');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5864e644a5dbbd751b95b65f3dea6514`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                //getting the data in Kelvin, convert to Celsius
                const temp = Math.round(data.main.temp-273.15);
                const main = data.weather[0].main;
                const name = data.name;
                tempValue.textContent = temp;
                weatherDescription.textContent = main;
                location.textContent = name;
                celsius = Math.round(data.main.temp-273.15);
                fahrenheit = Math.round(((data.main.temp-273.15)*(9/5)) + 32);
                //change background image based on weather description
                for (let i = 0; i < weatherInfo.length; i++) {
                    if(main == weatherInfo[i].description) {
                        document.body.style.backgroundImage = `url(/images/${weatherInfo[i].image})`;
                    }
                }
            });
        });
    }
});

//onclick: toggle between Celsius and Fahrenheit
function changeTemp() {
    let scale = document.querySelector('.scale');
    let number = document.querySelector('.number');
    if (scale.textContent == "°C") {
        scale.textContent = "°F";
        number.textContent = fahrenheit;    
    } else {
        scale.textContent = "°C";
        number.textContent = celsius;
    }
}

