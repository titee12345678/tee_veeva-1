import test from "node:test";
import assert from "node:assert/strict";
import {
  nextOccasion,
  daysTogether,
  monthDays,
  bangkokDate,
} from "../assets/dates.js";

test("a passed anniversary rolls into the following year", () => {
  const event = nextOccasion(new Date("2026-11-06T14:00:00Z"));
  assert.equal(event.name, "The day we met");
  assert.equal(event.date.toISOString(), "2026-11-23T17:00:00.000Z");
});
test("the entire special date stays current in Bangkok", () => {
  const event = nextOccasion(new Date("2026-11-24T14:00:00Z"));
  assert.equal(event.name, "The day we met");
  assert.equal(event.isToday, true);
});
test("dates use Bangkok midnight instead of the browser timezone", () => {
  assert.deepEqual(bangkokDate(new Date("2026-11-23T18:00:00Z")), {
    year: 2026,
    month: 10,
    day: 24,
  });
  assert.equal(daysTogether(new Date("2024-11-24T16:59:00Z")), 0);
  assert.equal(daysTogether(new Date("2024-11-24T17:00:00Z")), 1);
});
test("calendar includes leap day and correctly positions month start", () => {
  const days = monthDays(2028, 1);
  assert.equal(days.filter(Boolean).length, 29);
  assert.equal(days.indexOf(1), 2);
});
test("future clock values never create a negative counter", () => {
  assert.equal(daysTogether(new Date("2020-01-01T00:00:00Z")), 0);
});
