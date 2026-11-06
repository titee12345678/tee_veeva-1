// All relationship dates are calendar dates in Bangkok, independent of the visitor's timezone.
const DAY = 86_400_000;
export const occasions = [
  {
    month: 10,
    day: 24,
    name: "The day we met",
    note: "Where our story began.",
    year: 2024,
  },
  {
    month: 2,
    day: 9,
    name: "The day we became us",
    note: "Our relationship anniversary.",
    year: 2025,
  },
  {
    month: 6,
    day: 1,
    name: "Veeva’s birthday",
    note: "A day to celebrate you.",
  },
  {
    month: 6,
    day: 31,
    name: "Tee’s birthday",
    note: "Another year, together.",
  },
];
export function bangkokDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(now);
  const get = (type) => Number(parts.find((part) => part.type === type).value);
  return { year: get("year"), month: get("month") - 1, day: get("day") };
}
export function calendarDate(year, month, day) {
  return new Date(Date.UTC(year, month, day) - 7 * 3_600_000);
}
export function nextOccasion(now = new Date()) {
  const today = bangkokDate(now);
  const midnight = calendarDate(today.year, today.month, today.day);
  return occasions
    .map((event) => {
      let date = calendarDate(today.year, event.month, event.day);
      if (date < midnight)
        date = calendarDate(today.year + 1, event.month, event.day);
      return {
        ...event,
        date,
        isToday: date.getTime() === midnight.getTime(),
        days: Math.round((date - midnight) / DAY),
      };
    })
    .sort((a, b) => a.date - b.date)[0];
}
export function daysTogether(now = new Date()) {
  const today = bangkokDate(now);
  return Math.max(
    0,
    Math.floor(
      (calendarDate(today.year, today.month, today.day) -
        calendarDate(2024, 10, 24)) /
        DAY,
    ),
  );
}
export function monthDays(year, month) {
  const offset = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const count = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return [
    ...Array(offset).fill(null),
    ...Array.from({ length: count }, (_, i) => i + 1),
  ];
}
export function formatDate(date, options = {}) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Bangkok",
    ...options,
  }).format(date);
}
