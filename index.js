/*Get the current Weather and
    Hourly forecast weather */
function getWeather() {

    const apiKey = '533903971da63e02dfb2a79ae4adc07d';
    const city = document.getElementById('city').value;

    if (!city) {
        alert("Please enter a City");
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    // var currentData = await fetch(currentWeatherUrl)
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);  //Display current weather by invoking function 
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);  //Display hourly forecast data by invoking function 
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

// Display and Update current Weather based on the captured data
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInofDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    //Clear previous content
    tempDivInfo.innerHTML = '';
    weatherInofDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';

    //Check if Recieved data contains error code
    if (data.cod === '404') {
        weatherInofDiv.innerHTML = `<p>${data.message}</p>`;
    } else {

        //Assign Captured weather information from API
        const cityName = data.name;
        const temperature = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        //Display weather information
        tempDivInfo.innerHTML = `<p>${temperature}°C</p>`;
        weatherInofDiv.innerHTML = `<p>${cityName}</p>
            <p>${desc}</p>`;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = desc;

        showImage();
    }
}

// Display and Update hourly forecast data
function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hrs = hourlyData.slice(0,8);  //Display the next 24 hours (3-hour intervals)

    next24Hrs.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
        <div class = "hourly-item">
        <span>${hour}:00</span>
        <img src = "${iconUrl}" alt = "Hourly weather icon">
        <span>${temperature}°C</span></div>`;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

/*Make the image visible once it's loaded*/
function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}
