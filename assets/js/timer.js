---
layout: none
---
var launch = {{ site.data.launch | jsonify }}[0];
console.log(launch)
// Set elements that will be used 
var launch_title = document.createElement("h1");
var launch_cta   = document.createElement("div");
var launch_cta_a = document.createElement("a");
launch_cta_a.href = launch["link"];
launch_cta_a.innerText = launch["cta_txt"];
launch_cta.className = "button alt";
launch_cta.appendChild(launch_cta_a);
launch_title.innerText = launch["title"];

// Set the date we're counting down to
var countDownDate = new Date(launch["date"]).getTime();
var days_el  = document.createElement("div");
days_el.className = "timer-element timer-days";
var hours_el = document.createElement("div");
hours_el.className = "timer-element timer-hours";
var mins_el  = document.createElement("div");
mins_el.className = "timer-element timer-mins";
var secs_el = document.createElement("div");
secs_el.className = "timer-element timer-secs";

// Update the count down every 1 second
if(launch["active"]){
  timerWrapper = document.getElementById("timer-wrapper");
  timerWrapper.prepend(launch_title);
  timerWrapper.append(launch_cta);
  var x = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    var oneS = 1000;
    var oneM = oneS * 60;
    var oneH = oneM * 60
    var oneD = oneH * 24;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / oneD);
    var hours = Math.floor((distance % oneD) / oneH);
    var minutes = Math.floor((distance % oneH) / oneM);
    var seconds = Math.floor((distance % oneM) / oneS);
    days_el.innerHTML  = days + "d ";
    hours_el.innerHTML = hours + "h ";
    mins_el.innerHTML  = minutes + "m ";
    secs_el.innerHTML  = seconds + "s ";
    timer_els = [[days, days_el], [hours, hours_el], [minutes, mins_el], [seconds, secs_el]]

    // Display the result in the element with id="demo"
    //document.getElementById("timer").innerHTML = days + "d " + hours + "h "
    //+ minutes + "m " + seconds + "s ";
    var print_timer_elements = (elements) =>{
      elements.forEach( (el) => {
          document.getElementById("timer").appendChild(el[1]);
      })
    }
    if(distance < oneD){
      timer_els.shift()
      print_timer_elements(timer_els);
    } else if(distance < oneH){
      timer_els.shift().shift();
      print_timer_elements(timer_els);
    } else{
      print_timer_elements(timer_els);
    }

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "Launch!";
    }
  }, 1000);
}
