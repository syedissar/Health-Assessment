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

const form = document.querySelector("#prediction-form");
const submitButton = document.querySelector("#submitButton");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent default form submission behavior
  submitButton.disabled = true; // disable submit button

  // save input values to a database or storage medium here
  console.log(inputs);

  document.querySelector('input[name="symptoms"]').value = inputs;
  document.getElementById("second-prediction-form").submit();
});
