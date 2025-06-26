// Light/Dark Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Load theme from localStorage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Scroll Reveal Animation
const sections = document.querySelectorAll(".section");

const revealSection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(revealSection, {
  threshold: 0.15,
});

sections.forEach(section => {
  observer.observe(section);
});

// SheetDB Integration for Enrollment Form
const form = document.getElementById("admission-form");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  formStatus.textContent = "Sending...";

  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Replace YOUR_API_ID with your SheetDB endpoint ID
  const sheetdbAPI = "https://sheetdb.io/api/v1/YOUR_API_ID";

  try {
    const response = await fetch(sheetdbAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data })
    });

    if (response.ok) {
      formStatus.textContent = "Submitted successfully!";
      form.reset();
    } else {
      throw new Error("Failed to submit.");
    }
  } catch (err) {
    formStatus.textContent = "Error! Please try again.";
    console.error(err);
  }
});
