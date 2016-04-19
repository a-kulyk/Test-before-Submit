$(document).ready(function() {
  var $form = $(".form-horizontal"),
    $input = $form.find(".form-control"),
    $button = $form.find(".btn");

  $form.submit(testInput);

  function testInput(event) {
    event.preventDefault(); // avoiding page refresh

    $.ajax({           // sending request for testing input value
        type: "POST",
        url: '/index',
        data: { value: $input.val() },
        dataType: "json"
    }).done(function(data) {
        if (data.testResult === "OK") {
          changebutton();               // if test is passed - create a submit button
        } else if (data.testResult === "KO") {
          $(".form-group").addClass("has-error has-feedback"); //if not passed - highlight input
          alert(data.testResultDetail);
          $input.val('');
          $(".form-group").removeClass("has-error has-feedback");
        }
    });
  }

  function changebutton() {
    if (!$button.hasClass("btn-danger")) {
      $button.addClass("btn-danger").text("Submit");  // changing button and
      $form.off().submit(sendData);                   // replacing submit handler
      $input.one("keypress", onProceedInput);         // triggers if user continues entering after test
    } else {
      $button.removeClass("btn-danger").text("Test"); // returning form to initial state
      $form.off().submit(testInput);
      $input.off();
    }
  }

  function sendData() {                             // here we may send submitted input 
    event.preventDefault();                         // to server (not a part of the task).
    $input.val('');                                 // clearing form
    changebutton();
    $(".notification").fadeIn().delay(1000).fadeOut(); // displaying message for a second
  }

  function onProceedInput() {
    if (event.keyCode !== 13) {
      changebutton();
    }
  }
});