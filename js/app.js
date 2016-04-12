$(document).ready(function() {

  //Retrieve innerHTML of wine template and compile handlebars template
  var source = $("#wine-template").html();
  var wineTemplate = Handlebars.compile(source);

  var baseURL = "https://myapi.profstream.com/api/54cad1/wines";

  //populates all wines from /api/7f8409/wines endpoint on document.load
  $.ajax({
    url: baseURL,
    type: "GET",
    success: function(wines, textStatus, jqXHR) {
      //cache wine-container selector
      var $wineContainer = $("#wine-container");

      //clear out contents of HTML should there be any
      $wineContainer.html("");

      wines.forEach(function(wine) {
        //Append compiled HTML back on top level container with handlebar macros populated
        $wineContainer.append(wineTemplate(wine));
      });
    },
    error: function() {
      alert("Something went wrong!");
    }
  });

  $("#new-wine-form").on("submit", function(event) {
    event.preventDefault();

    var wineData = {
      name: $("#name").val(),
      year: $("#year").val(),
      grapes: $("#grapes").val(),
      country: $("#country").val(),
      region: $("#region").val(),
      price: $("#price").val(),
      description: $("#description").val(),
      picture: $("#picture").val()
    };

    $.ajax({
      url: baseURL,
      type: "POST",
      data: wineData,
      success: function(wine) {
        $("#wine-container").append(wineTemplate(wineData));

        $("#add-wine-modal").modal("hide");

        $("#new-wine-form")[0].reset();
      },
      error: function() {
        alert("Something went wrong!");
      }
    });
  });
});
