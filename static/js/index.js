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

tagInputEl.addEventListener("click", function (event) {
  $("#tag-suggestions").html("<option value='Itching'><option value='Skin Rash'><option value='Nodal Skin Eruptions'><option value='Continuous Sneezing'><option value='Shivering'><option value='Chills'><option value='Joint Pain'><option value='Stomach Pain'><option value='Acidity'><option value='Ulcers On Tongue'><option value='Muscle Wasting'><option value='Vomiting'><option value='Burning Micturition'><option value='Spotting  urination'><option value='Fatigue'><option value='Weight Gain'><option value='Anxiety'><option value='Cold Hands And Feets'><option value='Mood Swings'><option value='Weight Loss'><option value='Restlessness'><option value='Lethargy'><option value='Patches In Throat'><option value='Irregular Sugar Level'><option value='Cough'><option value='High Fever'><option value='Sunken Eyes'><option value='Breathlessness'><option value='Sweating'><option value='Dehydration'><option value='Indigestion'><option value='Headache'><option value='Yellowish Skin'><option value='Dark Urine'><option value='Nausea'><option value='Loss Of Appetite'><option value='Pain Behind The Eyes'><option value='Back Pain'><option value='Constipation'><option value='Abdominal Pain'><option value='Diarrhoea'><option value='Mild Fever'><option value='Yellow Urine'><option value='Yellowing Of Eyes'><option value='Acute Liver Failure'><option value='Fluid Overload'><option value='Swelling Of Stomach'><option value='Swelled Lymph Nodes'><option value='Malaise'><option value='Blurred And Distorted Vision'><option value='Phlegm'><option value='Throat Irritation'><option value='Redness Of Eyes'><option value='Sinus Pressure'><option value='Runny Nose'><option value='Congestion'><option value='Chest Pain'><option value='Weakness In Limbs'><option value='Fast Heart Rate'><option value='Pain During Bowel Movements'><option value='Pain In Anal Region'><option value='Bloody Stool'><option value='Irritation In Anus'><option value='Neck Pain'><option value='Dizziness'><option value='Cramps'><option value='Bruising'><option value='Obesity'><option value='Swollen Legs'><option value='Swollen Blood Vessels'><option value='Puffy Face And Eyes'><option value='Enlarged Thyroid'><option value='Brittle Nails'><option value='Swollen Extremeties'><option value='Excessive Hunger'><option value='Extra Marital Contacts'><option value='Drying And Tingling Lips'><option value='Slurred Speech'><option value='Knee Pain'><option value='Hip Joint Pain'><option value='Muscle Weakness'><option value='Stiff Neck'><option value='Swelling Joints'><option value='Movement Stiffness'><option value='Spinning Movements'><option value='Loss Of Balance'><option value='Unsteadiness'><option value='Weakness Of One Body Side'><option value='Loss Of Smell'><option value='Bladder Discomfort'><option value='Foul Smell Of urine'><option value='Continuous Feel Of Urine'><option value='Passage Of Gases'><option value='Internal Itching'><option value='Toxic Look (typhos)'><option value='Depression'><option value='Irritability'><option value='Muscle Pain'><option value='Altered Sensorium'><option value='Red Spots Over Body'><option value='Belly Pain'><option value='Abnormal Menstruation'><option value='Dischromic  Patches'><option value='Watering From Eyes'><option value='Increased Appetite'><option value='Polyuria'><option value='Family History'><option value='Mucoid Sputum'><option value='Rusty Sputum'><option value='Lack Of Concentration'><option value='Visual Disturbances'><option value='Receiving Blood Transfusion'><option value='Receiving Unsterile Injections'><option value='Coma'><option value='Stomach Bleeding'><option value='Distention Of Abdomen'><option value='History Of Alcohol Consumption'><option value='Fluid Overload.1'><option value='Blood In Sputum'><option value='Prominent Veins On Calf'><option value='Palpitations'><option value='Painful Walking'><option value='Pus Filled Pimples'><option value='Blackheads'><option value='Scurring'><option value='Skin Peeling'><option value='Silver Like Dusting'><option value='Small Dents In Nails'><option value='Inflammatory Nails'><option value='Blister'><option value='Red Sore Around Nose'><option value='Yellow Crust Ooze'>");
});

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
  submitButton.prop("disabled", true); // disables submit button
  $("#tag-input").attr("disabled", true); //disables input field
  $(".reset-button").css({
    border: "1px solid yellow",
  });

  let width = 0;
  let intervalId = setInterval(() => {
    if (width === 100) {
      clearInterval(intervalId);
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
      progressText.textContent = "ꜰɪɴᴀʟɪᴢɪɴɢ ʀᴇᴘᴏʀᴛ";
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
  $("#tag-input").attr("disabled", false);
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
  $(".reset-button").css({
    border: "none",
  });
}

// Loading Screen
$(".loading-screen").hide();
$(".main-page").show();
$(".disease-prediction-page").hide();
$(".mental-health-prediction-page").hide();

// Back Button
$("#back-button-for-physical").click(function () {
  $(".main-page").show();
  $(".mental-health-prediction-page").hide();
  $(".disease-prediction-page").hide();
});
// Back Button

$("#mental-health-button").click(function () {
  $("#loading-screen-logo").attr("src", "/static/img/mental-icon.png");
  $(".loading-screen").show();
  $(".main-page").hide();
  setTimeout(function () {
    $(".loading-screen").hide();
    $(".mental-health-prediction-page").show();
  }, 2500);
});
$("#physical-health-button").click(function () {
  $("#loading-screen-logo").attr("src", "/static/img/physical-icon.png");
  $(".loading-screen").show();
  $(".main-page").hide();
  setTimeout(function () {
    $(".loading-screen").hide();
    $(".disease-prediction-page").show();
  }, 2500);
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
$(".mental-health-results").hide();
$(".mental-health-loading").hide();

let SecondForm = document.querySelector(".mental-health-form");
let loadingBarContainer2 = document.querySelector("#loadingBarContainer-2");
let progress2 = document.querySelector(".progress-2");
let progressText2 = document.querySelector(".progress-text-2");

SecondForm.addEventListener("submit", (event) => {
  // Run Once After Click
  saveAnswer();
  $(".mental-health-loading").show();
  $(".mental-health-form").hide();
  event.preventDefault();
  console.log(userAnswers);
  mental_data = Object.values(userAnswers)
    .map((val) => (val === "" ? "0" : val))
    .join(",");
  console.log(mental_data);

  // Making a Loop
  let width2 = 0;
  let intervalId2 = setInterval(() => {
    if (width2 === 100) {
      clearInterval(intervalId2);
      return;
    }
    width2++;

    if (width2 === 1) {
      progressText2.textContent = "Processing Data";
      progress2.style.width = `${width2}%`;
    } else if (width2 === 5) {
      progressText2.textContent = "Sending to API";
      progress2.style.width = `${width2}%`;
    } else if (width2 === 10) {
      progressText2.textContent = "Feeding Model";
      progress2.style.width = `${width2}%`;
    } else if (width2 === 15) {
      progressText2.textContent = "Predicting Somatization";
      progress2.style.width = `${width2}%`;
    } else if (width2 === 20) {
      progressText2.textContent = "Predicting OCD";
      progress2.style.width = `${width2}%`;
    } else if (width2 === 25) {
      progressText2.textContent = "Predicting Interpersonal Sensitivity";
      progress2.style.width = `${width2}%`;
    } else if (width2 === 30) {
      progressText2.textContent = "Predicting Depression";
      progress2.style.width = `${width2}%`;
    } else if (width2 === 35) {
      progressText2.textContent = "Predicting Anxiety";
      progress2.style.width = `${width2}%`;
    } else if (width2 === 40) {
      progressText2.textContent = "Predicting Hostility";
      progress2.style.width = `${width2}%`;
    } else if (width2 === 45) {
      progressText2.textContent = "Predicting Phobic Anxiety";
      progress2.style.width = `${width2}%`;
    } else if (width2 === 50) {
      progressText2.textContent = "Predicting Paranoid Ideation";
      progress2.style.width = `${width2}%`;
    } else if (width2 === 55) {
      progressText2.textContent = "Predicting Psychoticism";
      progress2.style.width = `${width2}%`;
    } else if (width2 === 75) {
      progressText2.textContent = "Predicting Overall Health";
      progress2.style.width = `${width2}%`;
    } else if (width2 === 90) {
      progressText2.textContent = "Retrieving Data";
      progress2.style.width = `${width2}%`;
    } else if (width2 === 98) {
      progress2.style.width = `${width2}%`;
    } else if (width2 === 100) {
      // Ajax Request Start
      $(".mental-health-loading").hide();
      $(".mental-health-results").show();
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
      // Ajax Request End
    }
  }, 100);
});

// Removes Round corners of Overall's Title
$("#r-overall-title").toggleClass("rounded");
// Hide all the Descriptions
$("#r-somat-exp").hide();
$("#r-ocd-exp").hide();
$("#r-sens-exp").hide();
$("#r-depr-exp").hide();
$("#r-anx-exp").hide();
$("#r-host-exp").hide();
$("#r-phobic-exp").hide();
$("#r-para-exp").hide();
$("#r-psyc-exp").hide();

// Show or hide & round corners of title (Toggle) Descriptions of conditions
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
