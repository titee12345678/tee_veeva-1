import { daysTogether, nextOccasion, formatDate } from "./dates.js";

const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
const mobilePreference = matchMedia("(max-width: 700px)");
const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));

// Native scrolling preserves touch momentum, browser history, and keyboard navigation.
const cover = document.querySelector(".cover");
const coverImage = document.querySelector("[data-cover-image]");
const parallax = [...document.querySelectorAll("[data-parallax]")];
const memories = document.querySelector(".memories");
const track = document.querySelector(".film-track");
const filmProgress = document.querySelector(".film-progress span");
const filmInstruction = document.querySelector(".film-instruction");
const letter = document.querySelector("[data-letter]");
const readingProgress = document.querySelector(".reading-progress");
let words = [];
let pendingFrame = false;

if (letter) {
  words = letter.textContent
    .trim()
    .split(/\s+/)
    .map((word) => {
      const span = document.createElement("span");
      span.textContent = word;
      span.className = "letter-word";
      return span;
    });
  // A readable label avoids word-by-word fragmentation in screen readers.
  const text = letter.textContent;
  const accessible = document.createElement("span");
  accessible.className = "sr-only";
  accessible.textContent = text;
  const visual = document.createElement("span");
  visual.setAttribute("aria-hidden", "true");
  words.forEach((word, i) => {
    visual.append(word);
    if (i < words.length - 1) visual.append(" ");
  });
  letter.replaceChildren(accessible, visual);
}

const reveals = document.querySelectorAll("[data-reveal]");
if (!motionPreference.matches && "IntersectionObserver" in window) {
  document.documentElement.classList.add("motion-ready");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
    },
    { threshold: 0.08 },
  );
  reveals.forEach((element) => observer.observe(element));
}

function renderScroll() {
  pendingFrame = false;
  const reduced = motionPreference.matches;
  const height = innerHeight;
  const scrollable = document.documentElement.scrollHeight - height;
  if (readingProgress)
    readingProgress.style.transform = `scaleX(${scrollable > 0 ? clamp(scrollY / scrollable) : 0})`;
  if (coverImage && cover) {
    coverImage.style.transform = reduced
      ? ""
      : `translateY(${Math.min(scrollY, cover.offsetHeight) * 0.19}px) scale(${1.035 + clamp(scrollY / height) * 0.045})`;
  }
  for (const element of parallax) {
    const rect = element.getBoundingClientRect();
    if (reduced) {
      element.style.translate = "";
      continue;
    }
    if (rect.top < height * 1.25 && rect.bottom > -height * 0.25) {
      const distance =
        (rect.top + rect.height / 2 - height / 2) *
        Number(element.dataset.parallax);
      element.style.translate = `0 ${clamp(distance, -75, 75)}px`;
    }
  }
  if (filmInstruction) {
    const instruction = reduced
      ? "Explore the photographs →"
      : mobilePreference.matches
        ? "Swipe to turn the pages →"
        : "Keep scrolling to turn the pages →";
    if (filmInstruction.textContent !== instruction)
      filmInstruction.textContent = instruction;
  }
  if (memories && track) {
    const rect = memories.getBoundingClientRect();
    const progress = clamp(
      -rect.top / Math.max(1, memories.offsetHeight - height),
    );
    const travel = Math.max(0, track.scrollWidth - innerWidth);
    track.style.transform =
      reduced || mobilePreference.matches
        ? ""
        : `translateX(${-progress * travel}px)`;
    if (filmProgress)
      filmProgress.style.transform = `translateX(${progress * 400}%)`;
  }
  if (letter) {
    const rect = letter.getBoundingClientRect();
    const progress = reduced
      ? 1
      : clamp((height * 0.85 - rect.top) / (rect.height + height * 0.15));
    words.forEach((word, index) =>
      word.classList.toggle("is-read", index / words.length < progress),
    );
  }
}
function requestScrollRender() {
  if (!pendingFrame) {
    pendingFrame = true;
    requestAnimationFrame(renderScroll);
  }
}
addEventListener("scroll", requestScrollRender, { passive: true });
addEventListener("resize", requestScrollRender, { passive: true });
addEventListener("load", requestScrollRender);
motionPreference.addEventListener("change", () => {
  if (motionPreference.matches) {
    document.documentElement.classList.remove("motion-ready");
    reveals.forEach((element) => element.classList.add("is-visible"));
  }
  requestScrollRender();
});
requestScrollRender();

// Keep navigation usable without trapping the reader behind an overlay.
const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
function closeMenu() {
  menuButton?.setAttribute("aria-expanded", "false");
  if (mobileNav) mobileNav.hidden = true;
}
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  mobileNav.hidden = !open;
});
mobileNav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton?.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".header")) closeMenu();
});
mobilePreference.addEventListener("change", () => {
  closeMenu();
  requestScrollRender();
});

// Music starts only after an explicit request from the visitor.
const audio = document.querySelector("#our-song");
const soundButton = document.querySelector(".sound-toggle");
const soundLabel = document.querySelector("[data-sound-label]");
function updateSound() {
  if (!audio || !soundButton) return;
  const playing = !audio.paused;
  soundButton.setAttribute("aria-pressed", String(playing));
  soundButton.setAttribute(
    "aria-label",
    playing ? "Pause our song" : "Play our song",
  );
  if (soundLabel) soundLabel.textContent = playing ? "Sound on" : "Sound off";
}
soundButton?.addEventListener("click", async () => {
  if (!audio) return;
  if (!audio.paused) {
    audio.pause();
    return;
  }
  soundButton.disabled = true;
  audio.volume = 0.35;
  try {
    await audio.play();
  } catch {
    if (soundLabel) soundLabel.textContent = "Try sound again";
  } finally {
    soundButton.disabled = false;
  }
});
audio?.addEventListener("play", updateSound);
audio?.addEventListener("pause", updateSound);

const photoButtons = [...document.querySelectorAll("[data-photo]")];
const photoDialog = document.querySelector("#photo-dialog");
let photoIndex = 0;
function displayPhoto(index) {
  if (!photoDialog || !photoButtons.length) return;
  photoIndex = (index + photoButtons.length) % photoButtons.length;
  const button = photoButtons[photoIndex];
  const image = photoDialog.querySelector("figure img");
  image.src = button.dataset.photo;
  image.alt = button.querySelector("img")?.alt || button.dataset.caption;
  photoDialog.querySelector("figcaption").textContent = button.dataset.caption;
  const position = photoDialog.querySelector("[data-photo-position]");
  if (position)
    position.textContent = `${String(photoIndex + 1).padStart(2, "0")} / ${String(photoButtons.length).padStart(2, "0")}`;
}
photoButtons.forEach((button, index) =>
  button.addEventListener("click", () => {
    displayPhoto(index);
    photoDialog?.showModal();
  }),
);
document
  .querySelector("[data-photo-prev]")
  ?.addEventListener("click", () => displayPhoto(photoIndex - 1));
document
  .querySelector("[data-photo-next]")
  ?.addEventListener("click", () => displayPhoto(photoIndex + 1));
photoDialog?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    displayPhoto(photoIndex + (event.key === "ArrowLeft" ? -1 : 1));
  }
});
for (const dialog of document.querySelectorAll("dialog")) {
  dialog
    .querySelector("[data-close-dialog]")
    ?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    )
      dialog.close();
  });
}
document
  .querySelector("[data-open-note]")
  ?.addEventListener("click", () =>
    document.querySelector("#note-dialog")?.showModal(),
  );

function updateDates() {
  const counter = document.querySelector("[data-days-together]");
  if (counter) counter.textContent = daysTogether().toLocaleString("en-GB");
  const next = nextOccasion();
  document.querySelectorAll("[data-next-title]").forEach((element) => {
    element.textContent = next.name;
  });
  document.querySelectorAll("[data-next-date]").forEach((element) => {
    element.textContent = formatDate(next.date);
  });
  document.querySelectorAll("[data-next-days]").forEach((element) => {
    element.textContent = next.isToday
      ? "Today ♡"
      : `${next.days} ${next.days === 1 ? "day" : "days"} to go ↗`;
  });
}
updateDates();
setInterval(updateDates, 60_000);
