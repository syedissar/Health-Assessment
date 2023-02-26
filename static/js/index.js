const tagsEl = document.getElementById("tags");
const tagInputEl = document.getElementById("tag-input");
const tagSuggestionsEl = document.getElementById("tag-suggestions");

const tags = Array.from(tagSuggestionsEl.options).map((option) => option.value);
const inputs = []; // array to store input values

tagInputEl.addEventListener("input", function (event) {
  const tag = this.value.trim();
  if (tags.includes(tag)) {
    const tagEl = document.createElement("li");
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
    this.value = "";
    inputs.push(tag); // add input value to array
  }
});

tagInputEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

// Loading Bar Start
const form = document.querySelector("#prediction-form");
const submitButton = document.querySelector("#submitButton");
const loadingBarContainer = document.querySelector("#loadingBarContainer");
const progress = document.querySelector(".progress");
const progressText = document.querySelector(".progress-text");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent default form submission behavior
  loadingBarContainer.style.display = "block"; // show loading bar
  submitButton.disabled = true; // disable submit button
  let width = 0;
  let intervalId = setInterval(() => {
    if (width === 100) {
      clearInterval(intervalId);
      progressText.textContent = "Done!";
      loadingBarContainer.style.display = "none"; // hide loading bar
      submitButton.disabled = false; // enable submit button

      // save input values to a database or storage medium here
      console.log(inputs);

      return;
    }

    width++;
    progress.style.width = `${width}%`;

    if (width === 1) {
      progressText.textContent = "Processing Data";
    } else if (width === 20) {
      progressText.textContent = "Sending to Api";
    } else if (width === 40) {
      progressText.textContent = "Feeding Data to Model";
    } else if (width === 60) {
      progressText.textContent = "Predicting Disease";
    } else if (width === 73) {
      progressText.textContent = "Prediction Done";
    } else if (width === 85) {
      progressText.textContent = "Retrieving Data";
    }
  }, 20);
  document.querySelector('input[name="symptoms"]').value = inputs;
});

function run_after_another(){
  setInterval(function () {
    document.getElementById("second-prediction-form").submit();
  }, 100);
}

const second_form = document.querySelector("#second-prediction-form");
console.log(second_form);
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevents the default form submission behavior
  // Handle form submission here
});
// Loading Bar End
