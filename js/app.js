$(document).ready(function() {

  //populate all wines from /api/7f8409/wines endpoint on document.load
  $.ajax({
    url: "https://myapi.profstream.com/api/57aa39/wines",
    type: "GET",
    success: function(wines, textStatus, jqXHR) {
      wines.forEach(function(wine) {

        //Step 1: Retrieve innerHTML of wine template
        var source = $("#wine-template").html();

        //Step 2: Compile HTMl with values from wine JSON, populating macros
        var wineTemplate = Handlebars.compile(source);

        //Step 3: Append compiled HTML back on top level container
        $(".container").append(wineTemplate(wine));
      });
    },
    error: function() {
      alert("Something went wrong!");
    }
  });

  $(document).on("click", ".modal-footer > .btn.btn-primary", function() {

    $.ajax({
      url: "https://myapi.profstream.com/api/57aa39/wines",
      type: "POST",
      data: {
        name: $("#name").val(),
        year: $("#year").val(),
        grapes: $("#grapes").val(),
        country: $("#country").val(),
        region: $("#region").val(),
        price: $("#price").val(),
        description: $("#description").val(),
      },
      success: function(wine) {
        console.log(wine);
      },
      error: function() {
        alert("Something went wrong!");
      }
    });
  });
});
