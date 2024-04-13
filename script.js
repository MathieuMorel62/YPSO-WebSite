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
var button = document.getElementById(buttonId);
if (button.classList.contains("button-on")) {
  button.classList.remove("button-on");
} else {
  button.classList.add("button-on");
}
}

document.addEventListener("DOMContentLoaded", function () {
const menuIcon = document.getElementById("menu-icon-link");
const menu = document.querySelector(".menu");

menuIcon.addEventListener("click", function () {
  event.preventDefault();
  menu.classList.toggle("show");
});
});

/***************************************************************************************
********************************  TEAM : BUBBLES EFFECT ********************************
***************************************************************************************/

document.addEventListener("DOMContentLoaded", function () {

// Récupération des éléments nécessaires du DOM
const bubbles = document.querySelectorAll(".bubble");
const mainCard = document.getElementById("mainCard");
const closeButton = document.querySelector(".close-btn");

// Calcul des limites maximales pour le placement des bulles
const maxX = document.querySelector(".bubble-container").clientWidth - bubbles[0].offsetWidth;
const maxY = document.querySelector(".bubble-container").clientHeight - bubbles[0].offsetHeight;
const margin = 10;
let lastClickedBubble = null;


// Fonction pour positionner une bulle de manière linéaire
function positionBubble(bubble, index) {
    const numBubblesPerRow = Math.floor(maxX / (bubble.offsetWidth));
    const row = Math.floor(index / numBubblesPerRow);
    const col = index % numBubblesPerRow;

    const x = col * (bubble.offsetWidth + margin);
    const y = row * (bubble.offsetHeight + margin);

    // Applique la position calculée à la bulle
    bubble.style.transform = `translate(${x}px, ${y}px)`;
    bubble.dataset.x = x;
    bubble.dataset.y = y;
}

// Positionne chaque bulle et écoute l'événement de clic
bubbles.forEach((bubble, index) => {
    positionBubble(bubble, index);
    bubble.addEventListener("click", function () {
        if (lastClickedBubble) {
            lastClickedBubble.style.opacity = 1;
        }

        // Mise à jour de la carte principale avec les données de la bulle cliquée
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

// Écoute l'événement de clic sur le bouton de fermeture
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

document.addEventListener("DOMContentLoaded", function () {
  let items = document.querySelectorAll(".portfolio-slider .portfolio-item");
  let next = document.getElementById("portfolio-next");
  let prev = document.getElementById("portfolio-prev");
  let active = items.length % 2 !== 0 ? (items.length - 1) / 2 : items.length / 2;
  let isMobile = window.innerWidth <= 768;

  function mobileShow() {
    items.forEach((item, index) => {
      item.style.display = index === active ? 'block' : 'none';  // Only the active item is shown
    });
  }

  function loadShow() {
    if (isMobile) {
      mobileShow();
      return;
    }

    let stt = 0;
    items[active].style.transform = 'none';
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;

    for (let i = active + 1; i < items.length; i++) {
      stt++;
      items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt})`;
      items[i].style.zIndex = -stt;
      items[i].style.filter = 'blur(5px)';
      items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }

    stt = 0;

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

  // Initial load
  loadShow();

  // Optionally add a listener to handle window resize
  window.addEventListener('resize', function() {
    isMobile = window.innerWidth <= 768;
    loadShow();  // Recalculate display on resize
  });
});


/***************************************************************************************
******************************  CONTACT: TOGGLES SELECT ********************************
***************************************************************************************/

function toggleButton(buttonId) {
// Désactiver tous les boutons
const buttons = document.querySelectorAll(".button-container .button");
buttons.forEach((button) => {
  button.classList.remove("active");
});

// Activer le bouton cliqué
const clickedButton = document.getElementById(buttonId);
clickedButton.classList.add("active");

// Mettre à jour le champ caché avec la valeur du bouton cliqué
const hiddenInput = document.getElementById("userChoice");
hiddenInput.value = clickedButton.innerText;
}

// Validation du formulaire
function validateForm() {
const userChoice = document.getElementById("userChoice").value;
if (!userChoice) {
    alert('Veuillez sélectionner le projet a développer avant de soumettre le formulaire.');
    return false;
}
return true;
}
