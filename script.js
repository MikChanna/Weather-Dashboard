$(document).ready(function () {
  // DOM Elements
  var buttonArea = $(".buttonArea");
  var dashboard = $(".dashboard");
  var forecast = $(".forecast");
  var citynames = [];
  var clear =
    "https://www.clipartmax.com/png/middle/24-248320_sunny-weather-symbol-transparent.png";
  var cloudy =
    "https://c7.uihere.com/files/46/200/53/t-shirt-cloud-weather-clip-art-vector-cloudy-weather-forecast-icon-material.jpg";
  var rain =
    "https://www.pinclipart.com/picdir/middle/27-270336_clouds-weather-rain-rain-clip-art-png-transparent.png";

  // event listener for search button
  $("#button").on("click", function (event) {
    event.preventDefault();

    var city = $("#search").val().trim();
    var key = "da6d702ce9ba1524729fa879b5abc291";
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      key;
    citynames.push(city);
    console.log(citynames);
    // ajax call
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      mainDash();
      renderButton();
      getForecast();

      // function to display main dashboard weather
      function mainDash() {
        dashboard.empty();
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
      // function to render buttons, named after the city
      function renderButton() {
        $(".buttonArea").empty();
        for (var i = 0; i < citynames.length; i++) {
          var button = $("<button>").attr("data-name", citynames[i]);
          button.addClass("button");
          button.text(citynames[i]);
          buttonArea.append(button);
        }
        // function to generated 5-day forecast
      }
      function getForecast() {
        var divNames = ["div1", "div2", "div3", "div4", "div5"];
        forecast.empty();

        // var k = response.list[0].main.temp;
        // var temp = 1.8 * (k - 273) + 32;
        // var formatTemp = temp.toFixed(1);

        for (var i = 0; i < divNames.length; i++) {
          var divs = $("<div>");
          divs.addClass("forecastDiv");
          divs.attr("ID", divNames[i]);
          var image = $(
            "<img src = '' data-rain = 'https://www.pinclipart.com/picdir/middle/27-270336_clouds-weather-rain-rain-clip-art-png-transparent.png' data-clear = 'https://www.clipartmax.com/png/middle/24-248320_sunny-weather-symbol-transparent.png' data-cloudy = 'https://c7.uihere.com/files/46/200/53/t-shirt-cloud-weather-clip-art-vector-cloudy-weather-forecast-icon-material.jpg' data-status = 'none'>"
          );
          forecast.append(divs);
          divs.append(image);
        }

        var div1 = $("#div1");
        var formattedDate1 = moment(response.list[8].dt_txt).format("MMMM Do");
        var date1 = $("<p>").text(formattedDate1);
        div1.append(date1);

        var div2 = $("#div2");
        var formattedDate2 = moment(response.list[16].dt_txt).format("MMMM Do");
        var date2 = $("<p>").text(formattedDate2);
        div2.append(date2);

        var div3 = $("#div3");
        var formattedDate3 = moment(response.list[24].dt_txt).format("MMMM Do");
        var date3 = $("<p>").text(formattedDate3);
        div3.append(date3);

        var div4 = $("#div4");
        var formattedDate4 = moment(response.list[32].dt_txt).format("MMMM Do");
        var date4 = $("<p>").text(formattedDate4);
        div4.append(date4);

        var div5 = $("#div5");
        var formattedDate5 = moment(response.list[40].dt_txt).format("MMMM Do");
        var date5 = $("<p>").text(formattedDate5);
        div5.append(date5);
      }
    });
  });
});
