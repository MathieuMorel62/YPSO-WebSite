/***************************************************************************************
 ***********************************  SECTION: SCROLL  **********************************
 ***************************************************************************************/

function detectScroll(event) {
  console.log(event.deltaY);
if (event.deltaY > 0) {
  let currentSection = getCurrentSection();
  let nextSection = currentSection.nextElementSibling;
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
} else {
  let currentSection = getCurrentSection();
  let previousSection = currentSection.previousElementSibling;
  if (previousSection) {
    previousSection.scrollIntoView({ behavior: "smooth" });
  }
}
}

function getCurrentSection() {
const sections = document.querySelectorAll("section");
let currentSection = null;

sections.forEach((section) => {
  if (window.scrollY >= section.offsetTop) {
    currentSection = section;
  }
});

return currentSection;
}

window.addEventListener("wheel", detectScroll);

/***************************************************************************************
************************************  MENU: BUTTON  ************************************
***************************************************************************************/

function toggleButton(buttonId) {
// Deselect all buttons
var button = document.getElementById(buttonId);
if (button.classList.contains("button-on")) {
  button.classList.remove("button-on");
} else {
  button.classList.add("button-on");
}
}

// Add an event listener to the document
document.addEventListener("DOMContentLoaded", function () {
const menuIcon = document.getElementById("menu-icon-link");
const menu = document.querySelector(".menu");

// Add an event listener to the menu icon
menuIcon.addEventListener("click", function () {
  event.preventDefault();
  menu.classList.toggle("show");
});
});

/***************************************************************************************
********************************  TEAM : BUBBLES EFFECT ********************************
***************************************************************************************/

document.addEventListener("DOMContentLoaded", function () {

// Get the necessary elements from the DOM
const bubbles = document.querySelectorAll(".bubble");
const mainCard = document.getElementById("mainCard");
const closeButton = document.querySelector(".close-btn");

// Get the maximum X and Y values for the bubbles
const maxX = document.querySelector(".bubble-container").clientWidth - bubbles[0].offsetWidth;
const maxY = document.querySelector(".bubble-container").clientHeight - bubbles[0].offsetHeight;
const margin = 10;
let lastClickedBubble = null;

// Add an event listener to the document
function positionBubble(bubble, index) {
    const numBubblesPerRow = Math.floor(maxX / (bubble.offsetWidth));
    const row = Math.floor(index / numBubblesPerRow);
    const col = index % numBubblesPerRow;

    const x = col * (bubble.offsetWidth + margin);
    const y = row * (bubble.offsetHeight + margin);

    // Set the initial position of the bubble
    bubble.style.transform = `translate(${x}px, ${y}px)`;
    bubble.dataset.x = x;
    bubble.dataset.y = y;
}

// Position the bubbles
bubbles.forEach((bubble, index) => {
    positionBubble(bubble, index);
    bubble.addEventListener("click", function () {
        if (lastClickedBubble) {
            lastClickedBubble.style.opacity = 1;
        }

        // Set the content of the main card
        const attributes = this.dataset;
        mainCard.querySelector(".img-team").style.backgroundImage = `url(${attributes.image})`;
        mainCard.querySelector("h2").textContent = attributes.name;
        mainCard.querySelector("h3").textContent = attributes.role;
        mainCard.querySelector("p").textContent = attributes.description;
        mainCard.querySelector('.social-icons a[href*="github.com"]').href = attributes.github;
        mainCard.querySelector('.social-icons a[href*="linkedin.com"]').href = attributes.linkedin;

        mainCard.style.display = "block";
        this.style.opacity = 0;
        lastClickedBubble = this;
    });
});

// Add an event listener to the close button
closeButton.addEventListener("click", function () {
    mainCard.style.display = "none";
    if (lastClickedBubble) {
        lastClickedBubble.style.opacity = 1;
    }
  });
});



/***************************************************************************************
******************************  PORTFOLIO: SLIDER ********************************
***************************************************************************************/

// Add an event listener to the document
document.addEventListener("DOMContentLoaded", function () {
  // Get the necessary elements from the DOM
  let items = document.querySelectorAll(".portfolio-slider .portfolio-item");
  let next = document.getElementById("portfolio-next");
  let prev = document.getElementById("portfolio-prev");
  let active = items.length % 2 !== 0 ? (items.length - 1) / 2 : items.length / 2;
  let isMobile = window.innerWidth <= 768;

  // Function to show the active item
  function mobileShow() {
    items.forEach((item, index) => {
      item.style.display = index === active ? 'block' : 'none';
    });
  }

  function loadShow() {
    if (isMobile) {
      mobileShow();
      return;
    }

    // Show the active item and adjust the position of the other items
    let stt = 0;
    items[active].style.transform = 'none';
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;

    // Set the position of the items to the right and left of the active item
    for (let i = active + 1; i < items.length; i++) {
      stt++;
      items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt})`;
      items[i].style.zIndex = -stt;
      items[i].style.filter = 'blur(5px)';
      items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }

    stt = 0;
    // Set the position of the items to the left of the active item
    for (let i = active - 1; i >= 0; i--) {
      stt++;
      items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt})`;
      items[i].style.zIndex = -stt;
      items[i].style.filter = 'blur(5px)';
      items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
  }

  // Set up event listeners for navigation buttons
  next.onclick = function () {
    active = (active + 1) % items.length;
    isMobile ? mobileShow() : loadShow();
  };

  prev.onclick = function () {
    active = (active - 1 + items.length) % items.length;
    isMobile ? mobileShow() : loadShow();
  };

  // Show the active item
  loadShow();

  // Add an event listener to the window
  window.addEventListener('resize', function() {
    isMobile = window.innerWidth <= 768;
    loadShow();
  });
});


/***************************************************************************************
******************************  CONTACT: TOGGLES SELECT ********************************
***************************************************************************************/

function toggleButton(buttonId) {
  // Deselect all buttons
  const buttons = document.querySelectorAll(".button-container .button");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  // Select the clicked button
  const clickedButton = document.getElementById(buttonId);
  clickedButton.classList.add("active");

  // Update the hidden input value
  const hiddenInput = document.getElementById("userChoice");
  hiddenInput.value = clickedButton.innerText;
}

let alertShown = false;

// Validate the form before submission
function validateForm() {
  // Get the user choice and reCAPTCHA response
  const userChoice = document.getElementById("userChoice").value;
  const recaptchaResponse = document.querySelector('.g-recaptcha-response').value;

  // Check if the user has selected a project
  if (!userChoice) {
    if (!alertShown) {
      alert('Veuillez sélectionner le projet à développer avant de soumettre le formulaire.');
      alertShown = true;
    }
    return false;
  }
  
  // Check if the reCAPTCHA response is empty
  if (!recaptchaResponse) {
    let recaptchaError = document.getElementById('recaptcha-error');
    if (recaptchaError) {
      recaptchaError.style.display = 'block';
    }
    if (!alertShown) {
      alert('Veuillez compléter le reCAPTCHA avant de soumettre le formulaire.');
      alertShown = true;
    }
    return false;
  }

  // Reset the alert flag
  alertShown = false;
  return true;
}

// Callback function for reCAPTCHA
function recaptchaCallback() {
  let recaptchaError = document.getElementById('recaptcha-error');
  if (recaptchaError) {
    recaptchaError.style.display = 'none';
  }
  alertShown = false;
}

// Add an event listener to the form
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
    if (!validateForm()) {
      event.preventDefault();
    }
  });
});
