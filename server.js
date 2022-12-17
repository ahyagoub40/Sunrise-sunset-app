let sunsetTime;
let sunriseTime;
let index = 0;
let list;
fetch('https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today')
  .then((response) => response.json())
  .then((data) => {
    const sunrise = data.results.sunrise
    const sunset = data.results.sunset
    sunsetTime = sunset.split(':', 2).join(':')
    sunriseTime = sunrise.split(':', 2).join(':')
    console.log({sunsetTime, sunriseTime})
    list = [
      {
        timeOfDay: 'Sunrise',
        time: sunriseTime,
        ampm: 'AM'
      },
      {
        timeOfDay: 'Sunset',
        time: sunsetTime,
        ampm: 'PM'
      }
    ]
    
    
    typeToHtml()
  }
  );
  function switchTimes () {
    if (index === 0) {
      index = 1
    } else  {
      index = 0
    }
    typeToHtml()
  }
  
  function typeToHtml () {
    document.querySelector('.time-description').innerHTML = list[index].timeOfDay
    document.querySelector('.time').innerHTML = `${list[index].time} ${list[index].ampm}`
  }
  