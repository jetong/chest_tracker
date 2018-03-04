$("input[name='username']").keyup(function() {
  var regex = /[^a-z0-9]/gi;
  var usernameField = $("input[name='username']");
  usernameField.val(usernameField.val().replace(regex, ""));
});

$("input[name='username']").change(function() {
  setTimeout(check, 250);		// delay error message
  function check() {
    var usernameField = $("input[name='username']");
    var username = usernameField.val();
    if(username.length < 3) {
      $(this).focus();
      $("#name-length").show();
      $("#error-message").show();
    } else {
      $("#name-length").hide();
      $("#error-message").hide();
    }
  }
});

$("input[name='days']").change(function() {
  var days = parseInt($("input[name='days']").val());
  if(!isInRange(days,0,6)) {
    $(this).focus();
    $("#days-hours-minutes").show();
    $("#error-message").show();
  } else {
    $("#days-hours-minutes").hide();
    $("#error-message").hide();
  }
});

$("input[name='hours']").change(function() {
  var hours = parseInt($("input[name='hours']").val());
  if(!isInRange(hours,0,23)) {
    $(this).focus();
    $("#days-hours-minutes").show();
    $("#error-message").show();
  } else {
    $("#days-hours-minutes").hide();
    $("#error-message").hide();
  }
});

$("input[name='minutes']").change(function() {
  var minutes = parseInt($("input[name='minutes']").val());
  if(!isInRange(minutes,0,59)) {
    $(this).focus();
    $("#days-hours-minutes").show();
    $("#error-message").show();
  } else {
    $("#days-hours-minutes").hide();
    $("#error-message").hide();
  }
});

$("input[name='availableChests']").change(function() {
  var availableChests = parseInt($("input[name='availableChests']").val());
  if(!isInRange(availableChests,0,4)) {
    $(this).focus();
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
