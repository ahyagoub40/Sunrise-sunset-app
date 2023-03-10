const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASEURL;
const supabaseAnonKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

let sunsetTime;
let sunriseTime;
let risecountDown;
let setCountDown;
let interval;
let todayDate;
let timeObj;
let index = 1;
let list;
fetch(
  "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today"
)
  .then((response) => response.json())
  .then((data) => {
    const sunrise = data.results.sunrise
    const sunset = data.results.sunset
    sunsetTime = sunset.split(':', 2).join(':')
    sunriseTime = sunrise.split(':', 2).join(':')
    let riseTimeArr = sunrise.split(':', 3);
    let setTimeArr = sunset.split(':', 3);
    todayDate = new Date();
    // syntax: new Date(year, monthIndex, day, hours, minutes, seconds)
    riseTimeObj = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 1, riseTimeArr[0], riseTimeArr[1], riseTimeArr[2].split(" ")[0]);
    setTimeObj = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), `${parseInt(setTimeArr[0],10) + 12}`, setTimeArr[1], setTimeArr[2].split(" ")[0]);

    list = [
      {
        timeOfDay: "Sunrise",
        time: sunriseTime,
        ampm: "AM",
      },
      {
        timeOfDay: "Sunset",
        time: sunsetTime,
        ampm: "PM",
      },
    ];
    typeToHtml();
  });

/// fetch from database

const main = async () => {
  let { data, error } = await supabase.from("sunData2").select("*").limit(5);

  if (error) {
    console.log(error);
    return;
  }
  const sunrise = data[0].sunrise;
  const sunset = data[0].sunset;
  console.log("sunrise", sunrise);
  console.log("sunset", sunset);
  sunsetTime = sunset.split(":", 2).join(":"); // should be a string format
  sunriseTime = sunrise.split(":", 2).join(":");

  let riseTimeArr = sunrise.split(":", 3);
  let setTimeArr = sunset.split(":", 3);
  todayDate = new Date();
  // syntax: new Date(year, monthIndex, day, hours, minutes, seconds)
  riseTimeObj = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    todayDate.getDate(),
    riseTimeArr[0],
    riseTimeArr[1],
    riseTimeArr[2].split(" ")[0]
  );
  setTimeObj = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    todayDate.getDate(),
    setTimeArr[0],
    setTimeArr[1],
    setTimeArr[2].split(" ")[0]
  );

  list = [
    {
      timeOfDay: "Sunrise",
      time: sunriseTime,
      ampm: "AM",
    },
    {
      timeOfDay: "Sunset",
      time: sunsetTime,
      ampm: "PM",
    },
  ];
  typeToHtml();
};
main();

function switchTimes() {
  if (index === 0) {
    index = 1;
    document.querySelector(".sun").style.animation =
      "backwards sun-animate-reverse 3s ";
    document.querySelector(".main-gradient").style.animation =
      "backwards gradient-reverse 3s";
  } else {
    index = 0;
    document.querySelector(".sun").style.animation = "forwards sun-animate 3s";
    document.querySelector(".main-gradient").style.animation =
      "forwards gradient 3s";
  }
  clearInterval(interval);
<<<<<<< HEAD
  interval = setInterval(countdown, 1000, index);
  typeToHtml();
=======
  interval = setInterval(countdown, 0, index);
  typeToHtml()
>>>>>>> c29a33a3c072fd1f9f6ac9213d76728b14a26036
}

function countdown(index) {
  todayDate = new Date();

  let word;
  if (index === 0) {

    riseCountDown = riseTimeObj - todayDate;
    // riseCountDown -= 1000;
    let timeObj = new Date(riseCountDown);
    var days = Math.floor(riseCountDown / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (riseCountDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((riseCountDown % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((riseCountDown % (1000 * 60)) / 1000);

    word = "sunrise";
    document.getElementById("countdownField").innerHTML =
      hours + ":" + minutes + ":" + seconds + " to " + word;
  } else {
    // setCountDown -= 1000;
    setCountDown = setTimeObj - todayDate;

    let timeObj = new Date(setCountDown);
    var days = Math.floor(setCountDown / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (setCountDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((setCountDown % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((setCountDown % (1000 * 60)) / 1000);
    word = "sunset";
    document.getElementById("countdownField").innerHTML =
      hours + ":" + minutes + ":" + seconds + " to " + word;
  }

  // if (riseCountDown < 0 || setCountDown < 0) {
  //   document.getElementById("countdownField").innerHTML = "Here come's the " + word + "!";
  //   clearInterval(count);
  // }
}
function typeToHtml() {
  document.querySelector(".time-description").innerHTML = list[index].timeOfDay;
  document.querySelector(
    ".time"
  ).innerHTML = `${list[index].time} ${list[index].ampm}`;
}
