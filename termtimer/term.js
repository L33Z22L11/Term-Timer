!function clock() {
  var now = new Date();
  var start = new Date("2022-02-16");
  var end = new Date("2022-06-07");
  var last = now - start,
    D = parseInt(last / 86400000),
    lastD = last - D * 86400000,
    H = parseInt(lastD / 3600000),
    lastH = lastD - H * 3600000,
    M = parseInt(lastH / 60000),
    lastM = lastH - M * 60000,
    S = parseInt(lastM / 1000);
  var all = end - start,
    P = parseInt((last / all) * 10000000) / 100000;
  document.getElementById("d").innerHTML = D;
  document.getElementById("h").innerHTML = H;
  document.getElementById("m").innerHTML = M;
  document.getElementById("s").innerHTML = S;
  document.getElementById("p").innerHTML = P;
  setTimeout(clock, 500);
}();
