window.onload = function () {
  cd();
  progress();
};


function cd() {
  var last = new Date("2022-06-07") - new Date();
  var days = parseInt(last / 1000 / 60 / 60 / 24, 10);
  var hours = parseInt((last / 1000 / 60 / 60) % 24, 10);
  var minutes = parseInt((last / 1000 / 60) % 60, 10);
  var seconds = parseInt((last / 1000) % 60, 10);
  document.getElementById("ed").innerHTML = days;
  document.getElementById("eh").innerHTML = preZero(hours, 2);
  document.getElementById("em").innerHTML = preZero(minutes, 2);
  document.getElementById("es").innerHTML = preZero(seconds, 2);
  setTimeout(cd, 500);
}

function progress() {
  var preStart = new Date("2021-09-01");
  var now = new Date();
  var preEnd = new Date("2022-01-26");
  var ratio = ((now - preStart) / (preEnd - preStart)) * 100;
  var pi = parseInt(ratio);
  var pd = parseInt((ratio * 100000) % 100000);
  document.getElementById("pi").innerHTML = pi;
  document.getElementById("pd").innerHTML = preZero(pd, 5);
  var bar = document.getElementById("bar");
  bar.style.width = (100 - ratio) + "%";
  setTimeout(progress, 100);
}

function preZero(num, digit) {
  return ("000000" + num).slice(-digit);
}

function surZero(num, digit) { // 有bug，别用
  return (num + "000000").slice(0, digit);
}

function tabswitch() {
  var tab = document.getElementById("tab");
  tab.id = "list";
  var unfold = document.getElementById("unfold");
  unfold.remove();
  var unfold = document.getElementById("tabend");
  tabend.remove();
}
