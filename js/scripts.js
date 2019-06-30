window.onload = function(e){
  //alert("test onload window");
  var text = document.querySelector(".block__text");
  //  alert(text.innerHTML);
  var weather = document.querySelector(".block__weather");
   
  var tempValue;

  updateTime();
  updateWeather();
  setInterval(updateTime,1000);
  setInterval(updateWeather,60000);

    
   // text.innerHTML = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;{}

   // text.innerHTML = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();

    //text.innerHTML = time.getTime().;
  function updateTime(){
      var time = new Date();
      var hours = time.getHours();
      var minutes = time.getMinutes();
      var seconds = time.getSeconds();

      if(hours < 10) hours = "0" + hours;
      if(minutes < 10) minutes = "0" + minutes;
      if(seconds < 10) seconds = "0" + seconds;

      text.innerHTML = hours + ":" + minutes + ":" + seconds;
    }
  function updateWeather(){
    var s_city = "Orenburg,RU";
    var appid = "faadcd39ae324cfaaa256855811fb3fe";
    
    //var newRequest = new XMLHttpRequest();

    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

    var newRequest = new XHR();

    newRequest.open("GET",
    "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=Orenburg,RU&appid=faadcd39ae324cfaaa256855811fb3fe");
    
    newRequest.setRequestHeader('Access-Control-Allow-Origin', 'http://openweathermap.org');
    newRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    

    newRequest.onload = () => {
        var ourWeather = JSON.parse(newRequest.responseText);
        console.log(ourWeather);
        console.log(ourWeather["main"]); 
        console.log(ourWeather["main"]["temp"] -273.15);

        var name = ourWeather["name"];
        tempValue = (ourWeather["main"]["temp"] - 273.15).toFixed(0);

        weather.innerHTML = name + " " + tempValue + "°C";

    }


    newRequest.onerror = err => console.error('Ошибка');

    newRequest.setRequestHeader('Access-Control-Allow-Headers', '*');
    // newRequest.setRequestHeader('Content-type', 'application/ecmascript');
     newRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
     
    newRequest.send();

    }
}

