var API_ENDPOINT = "https://6gamu81o8k.execute-api.ap-south-1.amazonaws.com/production";

$(document).ready(function() {

  // Save message
  $("#savemessage").on("click", function() {
    var currentDate = new Date();
    var formattedDate = currentDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    var inputData = {
      "message": $('#msg').val(),
      "firstName": $('#fname').val(),
      "lastName": $('#lname').val(),
      "date": formattedDate
    };

    $.ajax({
      url: API_ENDPOINT,
      type: 'POST',
      data: JSON.stringify(inputData),
      contentType: 'application/json; charset=utf-8',
      success: function(response) {
        $("#messageSaved").text("Message Saved!");
        $('#msg').val('');
        $('#fname').val('');
        $('#lname').val('');
      },
      error: function(xhr) {
        alert("Error saving message: " + xhr.statusText);
      }
    });
  });

  // View messages
  $("#getmessages").on("click", function() {
    $.ajax({
      url: API_ENDPOINT,
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      success: function(response) {
        $("#showMessages").empty();
        $.each(response, function(i, data) {
          var messageCardHtml =
            '<div class="messageCard">' +
              '<div class="messageContent">' + data["message"] + '</div>' +
              '<div class="messageDetail">From: ' + data["firstName"] + ' ' + data["lastName"] + ' on ' + data["date"] + '</div>' +
            '</div>';
          $("#showMessages").append(messageCardHtml);
        });
      },
      error: function(xhr) {
        alert("Error loading messages: " + xhr.statusText);
      }
    });
  });

});
