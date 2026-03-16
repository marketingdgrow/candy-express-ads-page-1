const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  if (window.scrollY > window.innerHeight) {
    header.classList.add("header-fixed");
  } else {
    header.classList.remove("header-fixed");
  }
});

const floatingButtons = document.querySelector(".floatingbuttons");

window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight) {
    floatingButtons.classList.add("show");
  } else {
    floatingButtons.classList.remove("show");
  }
});

/* ================= HERO SLIDER ================= */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot-wrap");
const current = document.getElementById("current");

const toggleBtn = document.getElementById("toggleBtn");

const infoPanel = document.getElementById("infoPanel");
const menuPanel = document.getElementById("menuPanel");

const closeInfo = document.getElementById("closeInfo");
const closeMenu = document.getElementById("closeMenu");

let index = 0;
const total = slides.length;

function showSlide(i) {
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));

  if (slides[i]) slides[i].classList.add("active");
  if (dots[i]) dots[i].classList.add("active");

  if (current) current.innerText = i + 1;
}

function next() {
  index++;
  if (index >= total) index = 0;
  showSlide(index);
}

function prev() {
  index--;
  if (index < 0) index = total - 1;
  showSlide(index);
}

document.querySelector(".down")?.addEventListener("click", next);
document.querySelector(".up")?.addEventListener("click", prev);

dots.forEach((dot, i) => {
  dot.onclick = () => {
    index = i;
    showSlide(index);
  };
});

if (slides.length) {
  setInterval(next, 6000);
}

if (toggleBtn) {
  toggleBtn.onclick = () => {
    if (window.innerWidth > 768) {
      infoPanel?.classList.toggle("open");
    } else {
      menuPanel?.classList.toggle("open");
    }
  };
}

closeInfo?.addEventListener("click", () => {
  infoPanel?.classList.remove("open");
});

closeMenu?.addEventListener("click", () => {
  menuPanel?.classList.remove("open");
});

showSlide(index);

/* ================= SERVICE SECTION ANIMATION ================= */

const serviceCards = document.querySelectorAll(".service-section-card");

const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
});

serviceCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(50px)";
  card.style.transition = "1s";
  serviceObserver.observe(card);
});

/* ================= YOUTUBE SLIDER ================= */

const track = document.querySelector(".youtube-section-track");
const youtubeCards = document.querySelectorAll(".youtube-section-card");

const nextBtn = document.querySelector(".youtube-section-arrow.right");
const prevBtn = document.querySelector(".youtube-section-arrow.left");

const visibleCards = 4;
const cardWidth = 240;

let youtubeIndex = visibleCards;

if (track && youtubeCards.length) {
  const firstClones = [];
  const lastClones = [];

  for (let i = 0; i < visibleCards; i++) {
    const firstClone = youtubeCards[i].cloneNode(true);
    const lastClone = youtubeCards[youtubeCards.length - 1 - i].cloneNode(true);

    firstClones.push(firstClone);
    lastClones.unshift(lastClone);
  }

  lastClones.forEach((clone) => track.prepend(clone));
  firstClones.forEach((clone) => track.append(clone));

  const allSlides = document.querySelectorAll(
    ".youtube-section-track .youtube-section-card",
  );

  track.style.transform = `translateX(${-youtubeIndex * cardWidth}px)`;

  function moveSlide() {
    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(${-youtubeIndex * cardWidth}px)`;
  }

  nextBtn?.addEventListener("click", () => {
    youtubeIndex++;
    moveSlide();
  });

  prevBtn?.addEventListener("click", () => {
    youtubeIndex--;
    moveSlide();
  });

  track.addEventListener("transitionend", () => {
    if (youtubeIndex >= youtubeCards.length + visibleCards) {
      track.style.transition = "none";
      youtubeIndex = visibleCards;
      track.style.transform = `translateX(${-youtubeIndex * cardWidth}px)`;
    }

    if (youtubeIndex < visibleCards) {
      track.style.transition = "none";
      youtubeIndex = youtubeCards.length + visibleCards - 1;
      track.style.transform = `translateX(${-youtubeIndex * cardWidth}px)`;
    }
  });

  setInterval(() => {
    youtubeIndex++;
    moveSlide();
  }, 4000);
}

/* ================= STATS SECTION ================= */

const statsSection = document.querySelector(".stats-section");
const numbers = document.querySelectorAll(".stats-number");
const items = document.querySelectorAll(".stats-item");

let started = false;

function startCounter() {
  if (started) return;
  started = true;

  numbers.forEach((num) => {
    const target = +num.getAttribute("data-target");
    let count = 0;

    const speed = target / 80;

    const update = () => {
      count += speed;

      if (count < target) {
        num.innerText = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        num.innerText = target;
      }
    };

    update();
  });

  items.forEach((item, i) => {
    setTimeout(() => {
      item.classList.add("show");
    }, i * 150);
  });
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter();
      }
    });
  },
  { threshold: 0.4 },
);

if (statsSection) {
  statsObserver.observe(statsSection);
}
/* ================= TESTIMONIAL SLIDER ================= */

const testimonialsSlides = document.querySelectorAll(".testimonials-slide");

const testimonialsNextBtn = document.querySelector(".testimonials-next");
const testimonialsPrevBtn = document.querySelector(".testimonials-prev");

let testimonialsIndex = 0;

function showTestimonialsSlide(i) {
  testimonialsSlides.forEach((slide) => {
    slide.classList.remove("active");
  });

  if (testimonialsSlides[i]) {
    testimonialsSlides[i].classList.add("active");
  }
}

/* next */

testimonialsNextBtn?.addEventListener("click", () => {
  testimonialsIndex++;

  if (testimonialsIndex >= testimonialsSlides.length) {
    testimonialsIndex = 0;
  }

  showTestimonialsSlide(testimonialsIndex);
});

/* prev */

testimonialsPrevBtn?.addEventListener("click", () => {
  testimonialsIndex--;

  if (testimonialsIndex < 0) {
    testimonialsIndex = testimonialsSlides.length - 1;
  }

  showTestimonialsSlide(testimonialsIndex);
});

/* auto slide */

if (testimonialsSlides.length) {
  setInterval(() => {
    testimonialsIndex++;

    if (testimonialsIndex >= testimonialsSlides.length) {
      testimonialsIndex = 0;
    }

    showTestimonialsSlide(testimonialsIndex);
  }, 6000);
}

/* init */

showTestimonialsSlide(testimonialsIndex);
const form = document.querySelector(".contact-form-box");
const btn = document.querySelector(".contact-form-submit");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    btn.innerText = "Submitting...";
    btn.disabled = true;

    const data = {
      name: document.getElementById("name").value,
      city: document.getElementById("city").value,
      venue: document.getElementById("venue").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      date: document.getElementById("date").value,
      source: document.getElementById("source").value,
      guests: document.getElementById("guests").value,
      budget: document.getElementById("budgets").value,
      message: document.getElementById("message").value,
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwq0LhtkhHwpzntkPir8GKe3I47-QKlZq_PmyOOrtVbrKUzPcWhL931wpNFgeokMdqRKg/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      btn.innerText = "Submitted ✓";
      form.reset();

      // reload page after 2 seconds
      setTimeout(() => {
        location.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
      btn.innerText = "Error";
      btn.disabled = false;
    }
  });
}
const galaryImages = document.querySelectorAll(".galarysection-item img");
const galaryLightbox = document.querySelector(".galarysection-lightbox");
const galaryLightboxImg = document.querySelector(".galarysection-lightbox-img");
const galaryClose = document.querySelector(".galarysection-close");

galaryImages.forEach((img) => {
  img.addEventListener("click", () => {
    galaryLightbox.style.display = "flex";
    galaryLightboxImg.src = img.src;
  });
});

galaryClose.addEventListener("click", () => {
  galaryLightbox.style.display = "none";
});
