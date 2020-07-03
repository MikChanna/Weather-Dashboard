$(document).ready(function () {
  // DOM Elements
  var buttonArea = $(".buttonArea");
  var dashboard = $(".dashboard");
  var forecast = $(".forecast");

  // event listener for search button
  $("#button").on("click", function () {
    var city = $("#search").val().trim();
    var key = "da6d702ce9ba1524729fa879b5abc291";
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      key;
    // ajax call
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      mainDash();
      renderButton();

      // function to display main dashboard weather
      function mainDash() {
        // retrieves city name and date
        var todaysDate = response.list[0].dt_txt;
        var formatDate = moment(todaysDate).format("MMMM Do YYYY");
        var cityName = $("<p class = 'dashtext'>").text(
          response.city.name + "  (" + formatDate + ")"
        );
        // retrieves temperature and converts to fahrenheit
        var minidash = $("<p class = 'temp'>");
        var k = response.list[0].main.temp;
        var temp = 1.8 * (k - 273) + 32;
        var formatTemp = temp.toFixed(1);
        minidash.text("Temperature: " + formatTemp);
        $(".dashtext").append(minidash);
        //retrieves humidity
        var humLine = $("<p class = 'humidity'>");
        var humidity = response.list[0].main.humidity;
        humLine.text("Humidity: " + humidity);
        console.log(humidity);
        // retrieves windspeed
        var windLine = $("<p class = 'wind'>");
        var windSpeed = response.list[0].wind.speed;
        windLine.text("Wind Speed: " + windSpeed);

        // retrieves UV Index
        //  var uvline = $("<p class = 'uv'>");
        //  var uvindext = response.list[0].wind.speed;
        //  windLine.text("Wind Speed: " + windSpeed);

        dashboard.append(cityName, minidash, humLine, windLine);
      }

      // function renderButton() {
      //   var cityName = response.city.name;
      //   var button = $("<button class = 'button'>").attr("data-name", cityName);
      //   $(".button").val("data-name");

      // }
    });
  });
});
