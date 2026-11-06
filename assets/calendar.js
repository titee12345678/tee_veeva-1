import {
  bangkokDate,
  calendarDate,
  formatDate,
  monthDays,
  nextOccasion,
  occasions,
} from "./dates.js";

let today = bangkokDate();
let year = today.year;
let month = today.month;
const grid = document.querySelector("#calendar-grid");
const heading = document.querySelector("#calendar-month");
const detail = document.querySelector("#calendar-detail");

function showOccasion(event, date) {
  detail.replaceChildren();
  const title = document.createElement("h3");
  title.textContent = event.name;
  const description = document.createElement("p");
  description.textContent = `${formatDate(date)} — ${event.note}${event.year ? ` Since ${event.year}.` : ""}`;
  detail.append(title, description);
}
function renderCalendar() {
  today = bangkokDate();
  heading.textContent = formatDate(calendarDate(year, month, 1), {
    day: undefined,
  });
  grid.replaceChildren();
  for (const day of monthDays(year, month)) {
    const cell = document.createElement("div");
    cell.className = "calendar-cell";
    if (!day) {
      cell.setAttribute("aria-hidden", "true");
      grid.append(cell);
      continue;
    }
    const date = calendarDate(year, month, day);
    const dateLabel = formatDate(date, { weekday: "long" });
    const isToday =
      day === today.day && month === today.month && year === today.year;
    const event = occasions.find(
      (item) =>
        item.month === month &&
        item.day === day &&
        (!item.year || year >= item.year),
    );
    if (isToday) {
      cell.classList.add("is-today");
      cell.setAttribute("aria-current", "date");
    }
    if (event) {
      cell.classList.add("is-special");
      const button = document.createElement("button");
      button.textContent = day;
      button.setAttribute(
        "aria-label",
        `${dateLabel}: ${event.name}${isToday ? ", today" : ""}`,
      );
      button.addEventListener("click", () => showOccasion(event, date));
      cell.append(button);
    } else {
      cell.textContent = day;
      cell.setAttribute(
        "aria-label",
        `${dateLabel}${isToday ? ", today" : ""}`,
      );
    }
    grid.append(cell);
  }
  const monthEvent = occasions.find(
    (event) => event.month === month && (!event.year || year >= event.year),
  );
  if (monthEvent)
    showOccasion(monthEvent, calendarDate(year, month, monthEvent.day));
  else {
    detail.innerHTML =
      "<h3>A little room for new memories.</h3><p>No milestones this month. Every ordinary day still counts.</p>";
  }
}
function moveMonth(offset) {
  const date = new Date(Date.UTC(year, month + offset, 1));
  year = date.getUTCFullYear();
  month = date.getUTCMonth();
  renderCalendar();
}
document
  .querySelector("[data-calendar-prev]")
  .addEventListener("click", () => moveMonth(-1));
document
  .querySelector("[data-calendar-next]")
  .addEventListener("click", () => moveMonth(1));
document
  .querySelector("[data-calendar-today]")
  .addEventListener("click", () => {
    const current = bangkokDate();
    year = current.year;
    month = current.month;
    renderCalendar();
  });
const list = document.querySelector("#occasion-list");
[...occasions]
  .sort((a, b) => a.month - b.month || a.day - b.day)
  .forEach((event) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "date-row";
    button.style.width = "100%";
    button.style.textAlign = "left";
    const date = calendarDate(today.year, event.month, event.day);
    const monthName = formatDate(date, {
      day: undefined,
      year: undefined,
      month: "short",
    });
    button.innerHTML = `<span class="date-number">${String(event.day).padStart(2, "0")}<span>${monthName.toUpperCase()}</span></span><div><h4>${event.name}</h4><p>${event.note}</p></div><span aria-hidden="true">↗</span>`;
    button.addEventListener("click", () => {
      year = today.year;
      month = event.month;
      renderCalendar();
      showOccasion(event, date);
      document.querySelector("#calendar-month").scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
      const target = [...grid.querySelectorAll("button")].find(
        (item) => item.textContent === String(event.day),
      );
      target?.focus({ preventScroll: true });
    });
    list.append(button);
  });
renderCalendar();

document.querySelectorAll(".next-date").forEach((link) =>
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const next = nextOccasion();
    if (location.hash !== "#calendar") history.pushState(null, "", "#calendar");
    const nextDate = bangkokDate(next.date);
    year = nextDate.year;
    month = nextDate.month;
    renderCalendar();
    showOccasion(next, next.date);
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
    heading.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  }),
);
