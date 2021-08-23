//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//076016817e5a6cc4f6f3e097b95dc4f0
console.log("Weather App script initiated");

const weatherApi = {
	key: "076016817e5a6cc4f6f3e097b95dc4f0",
	baseUrl: "https://api.openweathermap.org/data/2.5/weather?",
};

// get location name from input box
document.getElementById("searchForm").addEventListener("keydown", (e) => {
	if (e.key == "Enter") {
		let city = e.target.value;
		getWeatherReport(city);
	}
});

//get weather Report
function getWeatherReport(city) {
	fetch(`${weatherApi.baseUrl}q=${city}&appid=${weatherApi.key}&units=metric`)
		.then((res) => {
			return res.json();
		})
		.then((res) => showWeatherReport(res));
}

//Show weather report
function showWeatherReport(weather) {
	console.log(weather);

	let city = document.getElementById("city");
	city.innerText = `${weather.name}, ${weather.sys.country}`;

	let temperature = document.getElementById("temp");
	temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

	let minMaxTemp = document.getElementById("min-max");
	minMaxTemp.innerHTML = `${Math.floor(
		weather.main.temp_min,
	)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

	let weatherType = document.getElementById("weather");
	weatherType.innerText = `${weather.weather[0].main}`;

	let date = document.getElementById("date");
	let todayDate = new Date();
	date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('images/Clear sky..jpg')";
        
    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('images/front23.jpg')";
        
    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('images/12front.jpg')";
        
    }     else if(weatherType.textContent == 'Rain') {
        
        document.body.style.backgroundImage = "url('images/Rainy.jpg')";
        
    } else if(weatherType.textContent == 'Mist') {
        
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    

   } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('images/thunder.jpg')";

    
        
        
    }
	const widgetTable = document.getElementById("widgetTable");
	console.log (city)
	let cityName=document.getElementById("input-box").value;

fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=b4be1096f04e4bbf92a4653926a54962`).then((apiResponse) => {
    // console.log(apiResponse);
    return apiResponse.json();
}).then((apiData) => {
    let weatherArray = apiData.data;
    for (let index = 0; index < 7; index++) {
        let dayByDayData = weatherArray[index];
        var row = widgetTable.insertRow();
        var cell1 = row.insertCell(0);
		let dateandtime = dayByDayData.datetime.toString().substring(5);

        cell1.innerHTML = dateandtime;
		
        var cell2 = row.insertCell(1);
		
	   cell2.innerHTML = `<img src="https://www.weatherbit.io/static/img/icons/${dayByDayData.weather.icon}.png" alt="" id="image">`;

		
        var cell3 = row.insertCell(2);
        cell3.innerHTML = `${dayByDayData.min_temp}&#176;C`;
        var cell4 = row.insertCell(3);
        cell4.innerHTML = `${dayByDayData.max_temp}&#176;C`;
    }
}).catch((error) => {
    console.log(error);
}); 



	// display weather box after box
	const weatherBody = document.querySelector(".Weather-body");
	weatherBody.style.display = "block";
}

//date manage
function dateManage(dateArg) {
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	let months = [
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

	let year = dateArg.getFullYear();
	let month = months[dateArg.getMonth()];
	let date = dateArg.getDate();
	let day = days[dateArg.getDay()];

	return `${date} ${month} (${day}), ${year}`;
}