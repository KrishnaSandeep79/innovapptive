const {
    Kuzzle,
    WebSocket
  } = require('kuzzle-sdk');
  
  const kuzzle = new Kuzzle(new WebSocket('kuzzle'));

var lat = document.getElementById("lat");
var long = document.getElementById("long");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
var latitude = 17.386451200000003
var longitude = 78.3728345
function showPosition(position) {
  if(Number.parseFloat(position.coords.latitude).toPrecision(2) == Number.parseFloat(latitude).toPrecision(2) && 
Number.parseFloat( position.coords.longitude).toPrecision(2) == Number.parseFloat(longitude).toPrecision(2))
  {
    alert("laltitude:"+position.coords.latitude+",longitude:"+position.coords.longitude);
     window.location.href="login";
  }
  else
  {
      x.innerHTML = "Wrong";
  }
}
