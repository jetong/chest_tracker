// restrict username to alpha-numberic characters
$("input[name='username']").keyup(function() {
  var regex = /[^a-z0-9]/gi;
  var usernameField = $("input[name='username']");
  usernameField.val(usernameField.val().replace(regex, ""));
});

// restrict days field to numbers
$("input[name='days']").keyup(function() {
  var regex = /[^0-9]/g;
  var daysField = $("input[name='days']");
  daysField.val(daysField.val().replace(regex, ""));
});

// restrict hours field to numbers
$("input[name='hours']").keyup(function() {
  var regex = /[^0-9]/g;
  var hoursField = $("input[name='hours']");
  hoursField.val(hoursField.val().replace(regex, ""));
});

// restrict minutes field to numbers
$("input[name='minutes']").keyup(function() {
  var regex = /[^0-9]/g;
  var minutesField = $("input[name='minutes']");
  minutesField.val(minutesField.val().replace(regex, ""));
});

// restrict availableChests field to numbers
$("input[name='availableChests']").keyup(function() {
  var regex = /[^0-9]/g;
  var availableChestsField = $("input[name='availableChests']");
  availableChestsField.val(availableChestsField.val().replace(regex, ""));
});

// handle err msg for username field
$("input[name='username']").change(function() {
  setTimeout(check, 200);		// delay error message
  function check() {
    var usernameField = $("input[name='username']");
    var username = usernameField.val();
    if(username.length < 3) {
      $("#name-length").show();
      $("#error-message").show();
      usernameField.focus().select();
    } else {
      $("#name-length").hide();
      $("#error-message").hide();
    }
  }
});

// handle err msg for days field
$("input[name='days']").change(function() {
  var days = parseInt($("input[name='days']").val());
  if(!isInRange(days,0,6)) {
    $(this).focus().select();
    $("#days-hours-minutes").show();
    $("#error-message").show();
  } else {
    $("#days-hours-minutes").hide();
    $("#error-message").hide();
  }
});

// handle err msg for hours field
$("input[name='hours']").change(function() {
  var hours = parseInt($("input[name='hours']").val());
  if(!isInRange(hours,0,23)) {
    $(this).focus().select();
    $("#days-hours-minutes").show();
    $("#error-message").show();
  } else {
    $("#days-hours-minutes").hide();
    $("#error-message").hide();
  }
});

// handle err msg for minutes field
$("input[name='minutes']").change(function() {
  var minutes = parseInt($("input[name='minutes']").val());
  if(!isInRange(minutes,0,59)) {
    $(this).focus().select();
    $("#days-hours-minutes").show();
    $("#error-message").show();
  } else {
    $("#days-hours-minutes").hide();
    $("#error-message").hide();
  }
});

// handle err msg for availableChests field
$("input[name='availableChests']").change(function() {
  var availableChests = parseInt($("input[name='availableChests']").val());
  if(!isInRange(availableChests,0,4)) {
    $(this).focus().select();
    $("#available-chests").show();
    $("#error-message").show();
  } else {
    $("#available-chests").hide();
    $("#error-message").hide();
  }
});

function isInRange(value, min, max) {
  if(Number.isInteger(value) && (value >= min && value <= max)) {
    return true;
  } else {
    return false;
  }
}

// got to handleForm route for processing only if all fields are valid
$("input[name='submit']").click(function() {
  var isValid = true;

  if($("input[name='username']").val().length < 3) {
    isValid = false;
  }
  var days = parseInt($("input[name='days']").val());
  if(!isInRange(days,0,6)) {
    isValid = false;
  }
  var hours = parseInt($("input[name='hours']").val());
  if(!isInRange(hours,0,23)) {
    isValid = false;
  }
  var minutes = parseInt($("input[name='minutes']").val());
  if(!isInRange(minutes,0,59)) {
    isValid = false;
  }
  var availableChests = parseInt($("input[name='availableChests']").val());
  if(!isInRange(availableChests,0,4)) {
    isValid = false;
  }

  if(isValid) {
    return true;
  } else {
    return false;
  }
});
