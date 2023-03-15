let tagsEl = document.getElementById("tags");
let tagInputEl = document.getElementById("tag-input");
let tagSuggestionsEl = document.getElementById("tag-suggestions");

let tags = Array.from(tagSuggestionsEl.options).map((option) => option.value);
let inputs = ""; // string to store input values

// Submit Button
let psubmit = document.getElementById("submitButton");
psubmit.disabled = true;
psubmit.style.backgroundColor = "grey";
psubmit.style.color = "#b2afaf";
psubmit.style.cursor = "not-allowed";
$("#submitButton").hover(
  function () {
    $(this).css("background-color", "#027502");
  },
  function () {
    $(this).css("background-color", "#02a102");
  }
);

tagInputEl.addEventListener("input", function (event) {
  let tag = this.value.trim();
  if (tags.includes(tag)) {
    // Submit Button
    psubmit.disabled = false;
    psubmit.style.backgroundColor = "#02a102";
    psubmit.style.color = "white";
    psubmit.style.cursor = "pointer";

    let tagEl = document.createElement("li");
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
    this.value = "";
    inputs += `${tag},`; // add input value to string
  }
});

tagInputEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

// Loading Bar Start
let form = document.querySelector("#prediction-form");
let submitButton = $("#submitButton");
let loadingBarContainer = document.querySelector("#loadingBarContainer");
let progress = document.querySelector(".progress");
let progressText = document.querySelector(".progress-text");

$(".prediction").hide();
$(".disease-overview").hide();
$(".disease-symptoms").hide();
$(".disease-treatment").hide();

form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent default form submission behavior
  loadingBarContainer.style.display = "block"; // show loading bar
  // submitButton.disabled = true; // disable submit button
  submitButton.css({
    "background-color": "grey",
    color: "rgb(178, 175, 175)",
    cursor: "not-allowed",
  });
  submitButton.prop("disabled", true); // disable submit button

  let width = 0;
  let intervalId = setInterval(() => {
    if (width === 100) {
      clearInterval(intervalId);
      progressText.textContent = "Done!";
      loadingBarContainer.style.display = "none"; // hide loading bar
      // submitButton.disabled = false; // enable submit button

      // save input values to a database or storage medium here
      console.log(inputs);

      return;
    }

    width++;

    if (width === 1) {
      progressText.textContent = "ᴘʀᴏᴄᴇꜱꜱɪɴɢ ᴅᴀᴛᴀ";
      progress.style.width = `${width}%`;
    } else if (width === 1) {
      progressText.textContent = "ꜱᴇɴᴅɪɴɢ ᴛᴏ ᴀᴘɪ";
      progress.style.width = `${width}%`;
    } else if (width === 10) {
      progressText.textContent = "ꜰᴇᴇᴅɪɴɢ ᴍᴏᴅᴇʟ";
      progress.style.width = `${width}%`;
    } else if (width === 30) {
      progressText.textContent = "ᴘʀᴇᴅɪᴄᴛɪɴɢ ᴅɪꜱᴇᴀꜱᴇ";
      progress.style.width = `${width}%`;
    } else if (width === 60) {
      progressText.textContent = "ꜰɪɴᴀʟ ᴘʀᴇᴅɪᴄᴛɪᴏɴ";
      progress.style.width = `${width}%`;
    } else if (width === 90) {
      progressText.textContent = "ʀᴇᴛʀɪᴇᴠɪɴɢ ᴅᴀᴛᴀ";
      progress.style.width = `${width}%`;
    } else if (width === 100) {
      // Ajax Request
      $.ajax({
        data: {
          input_symptoms: (inputs = inputs.slice(0, -1)),
        },
        type: "POST",
        url: "/",
      }).done(function (data) {
        $(".prediction").show();
        $(".disease-overview").show();
        $(".disease-symptoms").show();
        $(".disease-treatment").show();

        $(".main-prediction").text(data.prediction).show();
        $(".prediction-explanation").text(data.explanation).show();
        $(".symptoms-body").html(data.symptoms).show();
        $(".treatment-body").text(data.treatment).show();
      });
      // Ajax Request
    }
  }, 100);
});
// Loading Bar End

// Reset Button
function resetTags() {
  tagInputEl.value = "";
  tagsEl.innerHTML = "";
  psubmit.disabled = true;
  psubmit.style.backgroundColor = "grey";
  psubmit.style.color = "#b2afaf";
  psubmit.style.cursor = "not-allowed";
  tags = [];
  tags = Array.from(tagSuggestionsEl.options).map((option) => option.value);
  inputs = "";
  $(".prediction").hide();
  $(".disease-overview").hide();
  $(".disease-symptoms").hide();
  $(".disease-treatment").hide();
}

// $(".reset-button").click(function () {

// });
// Reset Button

// Back Button
$("#back-button-for-physical").click(function () {
  $(".main-page").show();
  $(".mental-health-prediction-page").hide();
  $(".disease-prediction-page").hide();
});
// Back Button

// disappear button format
$("#mental-health-button").click(function () {
  $(".main-page").hide();
  $(".disease-prediction-page").hide();
  $(".mental-health-prediction-page").show();
});
$("#physical-health-button").click(function () {
  $(".main-page").hide();
  $(".mental-health-prediction-page").hide();
  $(".disease-prediction-page").show();
});

function back_button_for_mental() {
  $(".main-page").show();
  $(".disease-prediction-page").hide();
  $(".mental-health-prediction-page").hide();
}

// Mental Health Assessment Start
// define global variables to keep track of the current question and the user's answers
let currentQuestion = 0;
let userAnswers = {};

// get all the questions and the next/prev buttons
let questions = document.querySelectorAll(".question");
let prevBtns = document.querySelectorAll(".prev");
let nextBtns = document.querySelectorAll(".next");

// function to show the current question and hide the rest
function showQuestion(n) {
  questions.forEach((question) => (question.style.display = "none"));
  questions[n].style.display = "block";
}

// function to update the current question and show it
function goToQuestion(n) {
  currentQuestion = n;
  showQuestion(currentQuestion);
}

// function to save the user's answer for the current question
function saveAnswer() {
  let inputEls = questions[currentQuestion].querySelectorAll("input");
  let answer = "";
  inputEls.forEach((inputEl) => {
    if (inputEl.checked) {
      answer = inputEl.value;
    }
  });
  userAnswers[currentQuestion] = answer;
}

// function to handle clicking the prev button
function handlePrev() {
  // save the current answer before going to the previous question
  saveAnswer();
  // go to the previous question if it exists
  if (currentQuestion > 0) {
    goToQuestion(currentQuestion - 1);
  }
}

// function to handle clicking the next button
function handleNext() {
  // save the current answer before going to the next question
  saveAnswer();
  // go to the next question if it exists
  if (currentQuestion < questions.length - 1) {
    goToQuestion(currentQuestion + 1);
  } else {
    // if this is the last question, display the user's answers
    console.log(userAnswers);
    // you could also submit the form or perform other actions here
  }
}

// add event listeners to the next/prev buttons
prevBtns.forEach((prevBtn) => prevBtn.addEventListener("click", handlePrev));
nextBtns.forEach((nextBtn) => nextBtn.addEventListener("click", handleNext));

// show the first question initially
showQuestion(currentQuestion);

// Mental Health Form (Second Form)
let SecondForm = document.querySelector(".mental-health-form");
$(".mental-health-results").hide();
SecondForm.addEventListener("submit", (event) => {
  saveAnswer();
  $(".mental-health-form").hide();
  $(".mental-health-results").show();
  event.preventDefault();
  console.log(userAnswers);
  mental_data = Object.values(userAnswers)
    .map((val) => (val === "" ? "0" : val))
    .join(",");
  // Ajax Request
  $.ajax({
    data: {
      mental_report: mental_data,
    },
    type: "POST",
    url: "/mental",
  }).done(function (data) {
    // for mental result [heading]
    mental_data_from_model = data.mental_report;
    $("#start-asses").text("RESULTS").show();
    $("#start-asses").css({
      color: "white",
      "background-color": "green",
      margin: "10px 0 0 0",
      padding: "7px 10px 4px 10px",
      "border-radius": "5px",
      display: "inline-block",
      "font-weight": "500",
      position: "relative",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, 50%)",
      "font-size": "27px",
      border: "3px solid #cbc5c5",
      "z-index": "1",
    });

    $(".semi-progress").show();
    $("#overall-percent").text(mental_data_from_model[0][10]).show();
    $("#somat-percent").text(mental_data_from_model[0][0]).show();
    $("#ocd-percent").text(mental_data_from_model[0][1]).show();
    $("#sens-percent").text(mental_data_from_model[0][2]).show();
    $("#depr-percent").text(mental_data_from_model[0][3]).show();
    $("#anx-percent").text(mental_data_from_model[0][4]).show();
    $("#host-percent").text(mental_data_from_model[0][5]).show();
    $("#phobic-percent").text(mental_data_from_model[0][6]).show();
    $("#para-percent").text(mental_data_from_model[0][7]).show();
    $("#psyc-percent").text(mental_data_from_model[0][8]).show();
    $(".semi-progress").each(function () {
      var $bar = $(this).find(".semi-bar");
      var $val = $(this).find("span");
      var perc = parseInt($val.text(), 10);
      if (perc <= 33.333333) {
        $bar.css({
          "border-bottom-color": "green",
          "border-right-color": "green",
        });
      } else if (perc <= 66.666666) {
        $bar.css({
          "border-bottom-color": "orange",
          "border-right-color": "orange",
        });
      } else if (perc <= 100) {
        $bar.css({
          "border-bottom-color": "red",
          "border-right-color": "red",
        });
      }
      $({ p: 0 }).animate(
        { p: perc },
        {
          duration: 4000,
          easing: "swing",
          step: function (p) {
            $bar.css({
              transform: "rotate(" + (45 + p * 1.8) + "deg)", // 100%=180° so: ° = % * 1.8
              // 45 is to add the needed rotation to have the green borders at the bottom
            });
            $val.text(p.toFixed(0) + "%"); // append the percentage symbol to the text
          },
        }
      );
    });
  });
  // Ajax Request
});
// Semi Circle Progress Bar
$("#r-overall-title").toggleClass("rounded");
// $("#r-overall-exp").hide();
$("#r-somat-exp").hide();
$("#r-ocd-exp").hide();
$("#r-sens-exp").hide();
$("#r-depr-exp").hide();
$("#r-anx-exp").hide();
$("#r-host-exp").hide();
$("#r-phobic-exp").hide();
$("#r-para-exp").hide();
$("#r-psyc-exp").hide();

document
  .getElementById("r-overall-title")
  .addEventListener("click", function () {
    $("#r-overall-exp").toggle();
    $("#r-overall-title").toggleClass("rounded");
  });
document.getElementById("r-somat-title").addEventListener("click", function () {
  $("#r-somat-exp").toggle();
  $("#r-somat-title").toggleClass("rounded");
});
document.getElementById("r-ocd-title").addEventListener("click", function () {
  $("#r-ocd-exp").toggle();
  $("#r-ocd-title").toggleClass("rounded");
});
document.getElementById("r-sens-title").addEventListener("click", function () {
  $("#r-sens-exp").toggle();
  $("#r-sens-title").toggleClass("rounded");
});
document.getElementById("r-depr-title").addEventListener("click", function () {
  $("#r-depr-exp").toggle();
  $("#r-depr-title").toggleClass("rounded");
});
document.getElementById("r-anx-title").addEventListener("click", function () {
  $("#r-anx-exp").toggle();
  $("#r-anx-title").toggleClass("rounded");
});
document.getElementById("r-host-title").addEventListener("click", function () {
  $("#r-host-exp").toggle();
  $("#r-host-title").toggleClass("rounded");
});
document
  .getElementById("r-phobic-title")
  .addEventListener("click", function () {
    $("#r-phobic-exp").toggle();
    $("#r-phobic-title").toggleClass("rounded");
  });
document.getElementById("r-para-title").addEventListener("click", function () {
  $("#r-para-exp").toggle();
  $("#r-para-title").toggleClass("rounded");
});
document.getElementById("r-psyc-title").addEventListener("click", function () {
  $("#r-psyc-exp").toggle();
  $("#r-psyc-title").toggleClass("rounded");
});

// Mental Health Assessment End

// Fullsreen
function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}
