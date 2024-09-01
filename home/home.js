let searchInput = document.querySelector("#search");
let region = document.querySelector('#location');
let firstDayDegreeNum = document.querySelector('#degree-num');
let FirstDayConditionIcon = document.querySelector('#temp-icon');
let FirstDayConditionText = document.querySelector('#condition-text');
let currentStats = document.querySelector('#current-stats');
let forecastDayDegree = Array.from(document.querySelectorAll('.forecastDayDegree'));
let forecastNightDegree = Array.from(document.querySelectorAll('.forecastNightDegree'));
let forecastCondition = Array.from(document.querySelectorAll('.forecastCondition'));
let forecastIcon = Array.from(document.querySelectorAll('.forecastIcon'));
let currentDayNum = document.querySelector('#currentDay');
let forecastDay = Array.from(document.querySelectorAll('.forecastDay'));
let contactClick = document.querySelector('.contactClick');
let currentMonth = document.querySelector('#currentMonth');

// get current day
let currentDate = new Date();
let currentDay = currentDate.getDay();
let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


// get current month
const currentMonths = new Date();
const Month = currentMonths.getMonth();
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentMonthName = monthNames[Month];
console.log(currentMonthName);
// let currentDayName = daysOfWeek[currentDay];


if(navigator.geolocation.getCurrentPosition(function(pos){
   console.log(pos);
   const lat = pos.coords.latitude;
   const long = pos.coords.longitude;
   getCurrentWeather(`${lat}, ${long}`)
})){
   console.log('weather');
}

contactClick.addEventListener('click', function(){
   console.log('contact');
   window.location.href = "../contact/contact.html";
})

// getCurrentWeather('cairo');

searchInput.addEventListener('input', function (e) {
   console.log(e);
   getCurrentWeather(searchInput.value);
})

async function getCurrentWeather(city) {
   let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0f230fed279e4af3af7154335241106&q=${city}&days=3`);
   let data = await response.json();

   // console.log(data.forecast.forecastday[1].date.substring(data.forecast.forecastday[1].date.length - 2));
   console.log(data);
   console.log(data.forecast.forecastday[1]);
   displayCurrent(data);
   displaySecond(data);
   displayThird(data);
}

function displayCurrent(data) {
   let day = data.forecast.forecastday[0].date;
   currentDayNum.innerHTML = day.substring(day.length - 2);
   forecastDay[0].innerHTML = daysOfWeek[currentDay];
   currentMonth.innerHTML = currentMonthName;
   region.innerHTML = data.location.name;
   firstDayDegreeNum.innerHTML = data.current.temp_c;
   FirstDayConditionIcon.src = `https:${data.current.condition.icon}`;
   FirstDayConditionText.innerHTML = data.current.condition.text;
   currentStats.innerHTML = `<span class="me-3 me-xl-5 grey-color"><img src="../images/icon-umberella.png" alt="">
                                    ${data.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
                                <span class="me-3 me-xl-5 grey-color"><img src="../images/icon-wind.png" alt="">
                                    ${data.current.wind_kph}</span>
                                <span class="me-3 me-xl-5 grey-color"><img src="../images/icon-compass.png" alt="">
                                    East</span>`
}

function displaySecond(data) {
   forecastDay[1].innerHTML = daysOfWeek[currentDay+1];
   forecastDayDegree[0].innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
   forecastNightDegree[0].innerHTML = data.forecast.forecastday[1].day.mintemp_c;
   forecastCondition[0].innerHTML = data.forecast.forecastday[1].day.condition.text;
   forecastIcon[0].src = `https:${data.forecast.forecastday[1].day.condition.icon}`;
}

function displayThird(data) {
   forecastDay[2].innerHTML = daysOfWeek[currentDay+2];
   forecastDayDegree[1].innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
   forecastNightDegree[1].innerHTML = data.forecast.forecastday[2].day.mintemp_c;
   forecastCondition[1].innerHTML = data.forecast.forecastday[2].day.condition.text;
   forecastIcon[1].src = `https:${data.forecast.forecastday[2].day.condition.icon}`;
}