const tagsEl = document.getElementById("tags");
const tagInputEl = document.getElementById("tag-input");
const tagSuggestionsEl = document.getElementById("tag-suggestions");

const tags = Array.from(tagSuggestionsEl.options).map((option) => option.value);
let inputs = ""; // string to store input values

tagInputEl.addEventListener("input", function (event) {
  const tag = this.value.trim();
  if (tags.includes(tag)) {
    const tagEl = document.createElement("li");
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
const form = document.querySelector("#prediction-form");
const submitButton = document.querySelector("#submitButton");
const loadingBarContainer = document.querySelector("#loadingBarContainer");
const progress = document.querySelector(".progress");
const progressText = document.querySelector(".progress-text");

$(".main-prediction").hide();
$(".symptoms-title").hide();

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
      progressText.textContent = "ᴘʀᴏᴄᴇꜱꜱɪɴɢ ᴅᴀᴛᴀ";
    } else if (width === 20) {
      progressText.textContent = "ꜱᴇɴᴅɪɴɢ ᴛᴏ ᴀᴘɪ";
    } else if (width === 40) {
      progressText.textContent = "ꜰᴇᴇᴅɪɴɢ ᴍᴏᴅᴇʟ";
    } else if (width === 60) {
      progressText.textContent = "ᴘʀᴇᴅɪᴄᴛɪɴɢ ᴅɪꜱᴇᴀꜱᴇ";
    } else if (width === 73) {
      progressText.textContent = "ꜰɪɴᴀʟɪᴢɪɴɢ ᴘʀᴇᴅɪᴄᴛɪᴏɴ";
    } else if (width === 85) {
      progressText.textContent = "ʀᴇᴛʀɪᴇᴠɪɴɢ ᴅᴀᴛᴀ";
    } else if (width === 100) {
      // Ajax Request
      $.ajax({
        data: {
          input_symptoms: (inputs = inputs.slice(0, -1)),
        },
        type: "POST",
        url: "/",
      }).done(function (data) {
        $(".main-prediction").show();
        $(".symptoms-title").show();
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
function refreshPage() {
  window.location.reload();
}
// Reset Button
