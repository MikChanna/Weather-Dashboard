$(document).ready(function () {
  var dashboard = $(".dashboard");
  var forecast = $(".forecast");

  $("#button").on("click", function () {
    var cityName = $("#search").val().trim();
    var key = "da6d702ce9ba1524729fa879b5abc291";
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&appid=" +
      key;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(cityName);
      console.log(response);
    });
  });
});
