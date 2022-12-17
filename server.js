let sunsetTime;
let sunriseTime;
fetch('https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today')
  .then((response) => response.json())
  .then((data) => {
    const sunrise = data.results.sunrise
    const sunset = data.results.sunset
    sunsetTime = sunset.split(':', 2).join(':')
    sunriseTime = sunrise.split(':', 2).join(':')
    console.log({sunsetTime, sunriseTime})
    document.querySelector('.time').innerHTML = `${sunriseTime} AM`
  }
    );