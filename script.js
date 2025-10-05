// === Carte Leaflet ===
document.addEventListener("DOMContentLoaded", () => {
  // Initialisation de la carte
  const map = L.map('map').setView([4.930552542951605, -52.29476863501056], 15);

  // Couche OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Marqueur Carbet Maqroll
  L.marker([4.930552542951605, -52.29476863501056]).addTo(map)
    .bindPopup('<b>Maqroll Le Carbet</b><br>WPJ4+548, Chemin Saint-Antoine, Cayenne 97300, Guyane française')
    .openPopup();


  // === Sélecteurs ===
  const burger = document.getElementById("burger");
  const closeMenu = document.getElementById("close-menu");
  const nav = document.querySelector("nav");
  const toggle = document.getElementById("theme-toggle");
  const body = document.body;


  // === Dark mode ===
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  toggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    toggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });


  // === Burger menu ===
  burger.addEventListener("click", () => {
    nav.classList.add("active");
  });

  if (closeMenu) {
    closeMenu.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  }

  // Fermer menu au clic sur un lien
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });


  // === Glassmorphism au scroll ===
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });


  // === Scroll Reveal ===
  const scrollElements = document.querySelectorAll(".scroll-reveal");

  const revealOnScroll = () => {
    scrollElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);
  revealOnScroll();
});

