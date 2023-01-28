let sunsetTime;
let sunriseTime;
let risecountDown;
let setCountDown;
let interval;
let todayDate;
// console.log(todayDate);
let timeObj;
let index = 1;
let list;
fetch('https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today')
  .then((response) => response.json())
  .then((data) => {
    const sunrise = data.results.sunrise
    const sunset = data.results.sunset
    sunsetTime = sunset.split(':', 2).join(':')
    sunriseTime = sunrise.split(':', 2).join(':')
    console.log({ sunsetTime, sunriseTime })
    let riseTimeArr = sunrise.split(':', 3);
    let setTimeArr = sunset.split(':', 3);
    todayDate = new Date();
    // syntax: new Date(year, monthIndex, day, hours, minutes, seconds)
    riseTimeObj = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), riseTimeArr[0], riseTimeArr[1], riseTimeArr[2].split(" ")[0]);
    setTimeObj = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), setTimeArr[0], setTimeArr[1], setTimeArr[2].split(" ")[0]);

    console.log("rise= ", riseTimeObj, "set= ", setTimeObj);
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
function switchTimes() {
  if (index === 0) {
    index = 1
    document.querySelector('.sun').style.animation = "backwards sun-animate-reverse 3s "
    document.querySelector('.main-gradient').style.animation = "backwards gradient-reverse 3s"
  } else {
    index = 0
    document.querySelector('.sun').style.animation = "forwards sun-animate 3s"
    document.querySelector('.main-gradient').style.animation = "forwards gradient 3s"
  }
  clearInterval(interval);
  interval = setInterval(countdown, 1000, index);
  typeToHtml()
}

function countdown(index) {
  todayDate = new Date().getTime();
  console.log("now", todayDate);


  let word;
  if (index === 1) {
    riseCountDown = riseTimeObj.getTime() - todayDate;
    // riseCountDown -= 1000;
    // console.log(riseCountDown.toString());
    let timeObj = new Date(riseCountDown);
    var days = Math.floor(riseCountDown / (1000 * 60 * 60 * 24));
    var hours = Math.floor((riseCountDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((riseCountDown % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((riseCountDown % (1000 * 60)) / 1000);

    word = "sunrise";
    document.getElementById("countdownField").innerHTML = hours + ":" + minutes + ":" + seconds + " to " + word;
  } else {
    console.log('count to sunset');
    // setCountDown -= 1000;
    setCountDown = setTimeObj.getTime() - todayDate;
    console.log('count to rise');
    // console.log(setCountDown.toString());
    let timeObj = new Date(setCountDown);
    var days = Math.floor(setCountDown / (1000 * 60 * 60 * 24));
    var hours = Math.floor((setCountDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((setCountDown % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((setCountDown % (1000 * 60)) / 1000);
    word = "sunset";
    document.getElementById("countdownField").innerHTML = hours + ":" + minutes + ":" + seconds + " to " + word;
  }

  // if (riseCountDown < 0 || setCountDown < 0) {
  //   document.getElementById("countdownField").innerHTML = "Here come's the " + word + "!";
  //   clearInterval(count);
  // }
}
function typeToHtml() {
  document.querySelector('.time-description').innerHTML = list[index].timeOfDay
  document.querySelector('.time').innerHTML = `${list[index].time} ${list[index].ampm}`
}

