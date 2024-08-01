// Dark Mode Functionality
function setDarkMode(isDark) {
  const body = document.body;
  const darkModeToggle = document.getElementById("darkModeToggle");

  body.classList.toggle("dark-mode", isDark);
  darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
}

function initDarkMode() {
  const savedDarkMode = localStorage.getItem("darkMode");
  setDarkMode(savedDarkMode !== "disabled");
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// Profile Picture Animation
function setRandomProfilePicRotation() {
  const profilePic = document.querySelector(".profile-pic");
  const randomSpeed = Math.floor(Math.random() * 10) + 5;
  profilePic.style.animation = `rotate ${randomSpeed}s linear infinite`;
}

// Modal Functionality
function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

function initModalClosing() {
  window.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none";
    }
  });
}

// Form Validation and Submission
function validateForm() {
  let isValid = true;
  const fields = [
    { id: "name", error: "nameError", message: "Name is required" },
    { id: "email", error: "emailError", message: "Please enter a valid email address" },
    { id: "message", error: "messageError", message: "Message is required" },
  ];

  document.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""));

  fields.forEach((field) => {
    const element = document.getElementById(field.id);
    if (field.id === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(element.value.trim())) {
        document.getElementById(field.error).textContent = field.message;
        isValid = false;
      }
    } else if (element.value.trim() === "") {
      document.getElementById(field.error).textContent = field.message;
      isValid = false;
    }
  });

  return isValid;
}

function initContactForm() {
  document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
      fetch(this.action, {
        method: "POST",
        body: new FormData(this),
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            document.getElementById("thankYouModal").style.display = "flex";
            this.reset();
          } else {
            throw new Error("Network response was not ok.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          document.getElementById("formErrorMessage").textContent = "Oops! There was a problem submitting your form.";
        });
    }
  });
}

function closeThankYouModal() {
  document.getElementById("thankYouModal").style.display = "none";
}

// Scroll to Top Functionality
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.onscroll = function () {
    scrollToTopBtn.style.display = document.body.scrollTop > 1500 || document.documentElement.scrollTop > 1500 ? "block" : "none";
  };

  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Initialize ScrollReveal
function initScrollReveal() {
  const sr = ScrollReveal();

  const revealConfigs = [
    { selector: ".sidebar", config: { origin: "left", distance: "50px", delay: 200 } },
    { selector: "#about", config: { origin: "bottom", distance: "50px", delay: 300 } },
    { selector: "#projects .project", config: { origin: "right", distance: "50px", delay: 400, interval: 200 } },
    { selector: "#skills ul li", config: { origin: "bottom", distance: "20px", delay: 500, interval: 100 } },
    { selector: "#education .education-item", config: { origin: "left", distance: "50px", delay: 600, interval: 200 } },
    { selector: "#contact", config: { origin: "bottom", distance: "50px", delay: 700 } },
  ];

  revealConfigs.forEach(({ selector, config }) => {
    sr.reveal(selector, { ...config, duration: 1000 });
  });
}

// Main initialization
document.addEventListener("DOMContentLoaded", function () {
  initDarkMode();
  initSmoothScrolling();
  setRandomProfilePicRotation();
  initModalClosing();
  initContactForm();
  initScrollToTop();
  initScrollReveal();

  document.getElementById("darkModeToggle").addEventListener("click", () => {
    setDarkMode(!document.body.classList.contains("dark-mode"));
  });
});
