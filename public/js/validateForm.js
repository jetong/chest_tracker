$("input[name='username']").blur(function() {
  var usernameField = $("input[name='username']");
  var username = usernameField.val();
  if(username.length < 3) {
    $("#name-length").show();
    $("#error-message").show();
  } else {
    $("#name-length").hide();
    $("#error-message").hide();
  }
}

function validateForm() {
  var name = $("#name-input").val();
  if (name == "") {
    $("#errorMessages").append("<li>Please enter name</li>");
  }
}
