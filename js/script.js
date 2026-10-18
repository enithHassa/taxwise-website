const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");
if ("IntersectionObserver" in window && sections.length && navAnchors.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => observer.observe(section));
}

const moduleTabs = document.querySelectorAll(".module-tab");
const modulePanels = document.querySelectorAll(".module-panel");
if (moduleTabs.length && modulePanels.length) {
  moduleTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.getAttribute("data-module");
      moduleTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("active", active);
        t.setAttribute("aria-selected", String(active));
      });
      modulePanels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === `panel-${id}`);
      });
    });
  });
}

const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");
if (contactForm && formFeedback) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    formFeedback.textContent = `Thanks, ${name}. Your message details are ready to review, but this demo form does not send email yet. Connect a form service before publishing contact functionality.`;
  });
}
