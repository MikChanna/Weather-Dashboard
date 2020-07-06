$(document).ready(function () {
  // DOM Elements
  var buttonArea = $(".buttonArea");
  var dashboard = $(".dashboard");
  var forecast = $(".forecast");
  var citynames = [];
  var clear =
    "https://www.clipartmax.com/png/middle/24-248320_sunny-weather-symbol-transparent.png";
  var cloud =
    "https://c7.uihere.com/files/46/200/53/t-shirt-cloud-weather-clip-art-vector-cloudy-weather-forecast-icon-material.jpg";
  var rain =
    "https://www.pinclipart.com/picdir/middle/27-270336_clouds-weather-rain-rain-clip-art-png-transparent.png";

  // event listener for search button
  $("#button").on("click", function (event) {
    event.preventDefault();
    var city = $("#search").val().trim();
    citynames.push(city);

    renderButton();

    // function to render buttons, named after the city
    function renderButton() {
      $(".buttonArea").empty();
      for (var i = 0; i < citynames.length; i++) {
        var button = $("<button>").attr("data-name", citynames[i]);
        button.addClass("buttons");
        button.text(citynames[i]);
        buttonArea.append(button);
      }
    }

    $(".buttons").on("click", function (event) {
      event.preventDefault();

      var cityN = $(this).attr("data-name");
      var key = "da6d702ce9ba1524729fa879b5abc291";
      var queryURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityN +
        "&appid=" +
        key;

      // ajax call
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        mainDash();
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
          // retrieves weather and adds image
          var picture = $("<img>");
          var weather = response.list[0].weather[0].main;

          if (weather === "Rain") {
            picture.attr("src", rain);
          }
          if (weather === "Clouds") {
            picture.attr("src", cloud);
          }
          if (weather === "Clear") {
            picture.attr("src", clear);
          }
          picture.attr("width", "100px");
          picture.attr("height", "100px");

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

          dashboard.append(cityName, picture, minidash, humLine, windLine);
        }

        // function to generated 5-day forecast

        function getForecast() {
          var divNames = ["div1", "div2", "div3", "div4", "div5"];
          forecast.empty();

          for (var i = 0; i < divNames.length; i++) {
            var divs = $("<div>");
            divs.addClass("forecastDiv col-lg-2");
            divs.attr("ID", divNames[i]);

            forecast.append(divs);
          }

          var div1 = $("#div1");
          var formattedDate1 = moment(response.list[7].dt_txt).format(
            "MMMM Do"
          );
          var date1 = $("<p>").text(formattedDate1);
          var k1 = response.list[7].main.temp;
          var temp1 = 1.8 * (k1 - 273) + 32;
          var formatTemp1 = $("<p>").text("Temperature: " + temp1.toFixed(1));
          var hum1 = $("<p>").text(
            "Humidity: " + response.list[7].main.humidity
          );
          var picture1 = $("<img>");
          var weather1 = response.list[7].weather[0].main;

          if (weather1 === "Rain") {
            picture1.attr("src", rain);
          }
          if (weather1 === "Clouds") {
            picture1.attr("src", cloud);
          }
          if (weather1 === "Clear") {
            picture1.attr("src", clear);
          }
          picture1.attr("width", "50px");
          picture1.attr("height", "50px");
          div1.append(date1, picture1, formatTemp1, hum1);

          var div2 = $("#div2");
          var formattedDate2 = moment(response.list[15].dt_txt).format(
            "MMMM Do"
          );
          var date2 = $("<p>").text(formattedDate2);
          var k2 = response.list[15].main.temp;
          var temp2 = 1.8 * (k2 - 273) + 32;
          var formatTemp2 = $("<p>").text("Temperature: " + temp2.toFixed(1));
          var hum2 = $("<p>").text(
            "Humidity: " + response.list[15].main.humidity
          );
          var picture2 = $("<img>");
          var weather2 = response.list[15].weather[0].main;

          if (weather2 === "Rain") {
            picture2.attr("src", rain);
          }
          if (weather2 === "Clouds") {
            picture2.attr("src", cloud);
          }
          if (weather2 === "Clear") {
            picture2.attr("src", clear);
          }
          picture2.attr("width", "50px");
          picture2.attr("height", "50px");
          div2.append(date2, picture2, formatTemp2, hum2);

          var div3 = $("#div3");
          var formattedDate3 = moment(response.list[23].dt_txt).format(
            "MMMM Do"
          );
          var date3 = $("<p>").text(formattedDate3);
          var k3 = response.list[23].main.temp;
          var temp3 = 1.8 * (k3 - 273) + 32;
          var formatTemp3 = $("<p>").text("Temperature: " + temp3.toFixed(1));
          var hum3 = $("<p>").text(
            "Humidity: " + response.list[23].main.humidity
          );
          var picture3 = $("<img>");
          var weather3 = response.list[23].weather[0].main;

          if (weather3 === "Rain") {
            picture3.attr("src", rain);
          }
          if (weather3 === "Clouds") {
            picture3.attr("src", cloud);
          }
          if (weather3 === "Clear") {
            picture3.attr("src", clear);
          }
          picture3.attr("width", "50px");
          picture3.attr("height", "50px");
          div3.append(date3, picture3, formatTemp3, hum3);

          var div4 = $("#div4");
          var formattedDate4 = moment(response.list[31].dt_txt).format(
            "MMMM Do"
          );
          var date4 = $("<p>").text(formattedDate4);
          var k4 = response.list[31].main.temp;
          var temp4 = 1.8 * (k4 - 273) + 32;
          var formatTemp4 = $("<p>").text("Temperature: " + temp4.toFixed(1));
          var hum4 = $("<p>").text(
            "Humidity: " + response.list[31].main.humidity
          );
          var picture4 = $("<img>");
          var weather4 = response.list[31].weather[0].main;

          if (weather4 === "Rain") {
            picture4.attr("src", rain);
          }
          if (weather4 === "Clouds") {
            picture4.attr("src", cloud);
          }
          if (weather4 === "Clear") {
            picture4.attr("src", clear);
          }
          picture4.attr("width", "50px");
          picture4.attr("height", "50px");
          div4.append(date4, picture4, formatTemp4, hum4);

          var div5 = $("#div5");
          var formattedDate5 = moment(response.list[39].dt_txt).format(
            "MMMM Do"
          );
          var date5 = $("<p>").text(formattedDate5);
          var k5 = response.list[39].main.temp;
          var temp5 = 1.8 * (k5 - 273) + 32;
          var formatTemp5 = $("<p>").text("Temperature: " + temp5.toFixed(1));
          var hum5 = $("<p>").text(
            "Humidity: " + response.list[39].main.humidity
          );
          var picture5 = $("<img>");
          var weather5 = response.list[39].weather[0].main;

          if (weather5 === "Rain") {
            picture5.attr("src", rain);
          }
          if (weather5 === "Clouds") {
            picture5.attr("src", cloud);
          }
          if (weather5 === "Clear") {
            picture5.attr("src", clear);
          }
          picture5.attr("width", "50px");
          picture5.attr("height", "50px");
          div5.append(date5, picture5, formatTemp5, hum5);
        }
      });
    });
  });
});
