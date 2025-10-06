document.addEventListener("DOMContentLoaded", () => {

  // === LUCIOLES ALÉATOIRES ===
  const lucioles = [
    document.getElementById('luciole1'),
    document.getElementById('luciole2'),
    document.getElementById('luciole3'),
    document.getElementById('luciole4'),
    document.getElementById('luciole5')
  ];

  // Position et vitesse aléatoire
  const positions = lucioles.map(() => ({
    x: Math.random() * document.body.scrollWidth,
    y: Math.random() * document.body.scrollHeight,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5
  }));

  function animateLucioles() {
    positions.forEach((pos, index) => {
      pos.x += pos.vx;
      pos.y += pos.vy;

      // Rebonds sur les bords du document entier
      if (pos.x < 0 || pos.x > document.body.scrollWidth - 12) pos.vx *= -1;
      if (pos.y < 0 || pos.y > document.body.scrollHeight - 12) pos.vy *= -1;

      // Appliquer la position
      lucioles[index].style.left = `${pos.x}px`;
      lucioles[index].style.top = `${pos.y}px`;
    });

    requestAnimationFrame(animateLucioles);
  }

  animateLucioles();

  // === CARTE LEAFLET ===
  const map = L.map('map').setView([4.930552542951605, -52.29476863501056], 15);

  const lightMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
  });

  const darkMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a> — Esri Dark Gray Canvas'
  });

  const body = document.body;
  const toggle = document.getElementById("theme-toggle");
  let currentLayer;

  function updateMapTheme() {
    if (currentLayer) map.removeLayer(currentLayer);
    if (body.classList.contains("dark")) {
      currentLayer = darkMap;
    } else {
      currentLayer = lightMap;
    }
    currentLayer.addTo(map);
  }

  updateMapTheme();

  // Marqueur
  L.marker([4.930552542951605, -52.29476863501056])
    .addTo(map)
    .bindPopup('<b>Maqroll Le Carbet</b><br>WPJ4+548, Chemin Saint-Antoine, Cayenne 97300, Guyane française')
    .openPopup();

  // === DARK MODE ===
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

    setTimeout(updateMapTheme, 300); // mise à jour de la carte après changement de thème
  });

  // === BURGER MENU ===
  const burger = document.getElementById("burger");
  const closeMenu = document.getElementById("close-menu");
  const nav = document.querySelector("nav");

  burger.addEventListener("click", () => {
    nav.classList.add("active");
  });

  if (closeMenu) {
    closeMenu.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  }

  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });

  // === GLASSMORPHISM HEADER ===
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // === SCROLL REVEAL ===
  const scrollElements = document.querySelectorAll(".scroll-reveal");

  const revealOnScroll = () => {
    scrollElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) el.classList.add("visible");
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);
  revealOnScroll();
});
