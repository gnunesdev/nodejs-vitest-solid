import { expect, test } from "vitest";
import { Appointment } from "./appointment";

import { getFutureDate } from "./../tests/utils/get-future-date";

test("create an appointment", () => {
  const startsAt = getFutureDate("2022-10-10");
  const endsAt = getFutureDate("2022-10-11");

  const appointment = new Appointment({
    customer: "Fulano",
    startsAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("Fulano");
});

test("cannot create an appointment with end date before start date", () => {
  const startsAt = getFutureDate("2022-10-10");
  const endsAt = getFutureDate("2022-10-09");

  expect(() => {
    return new Appointment({
      customer: "Fulano",
      startsAt,
      endsAt,
    });
  }).toThrow();
});

test("cannot create an appointment with start date before now", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setTime(startsAt.getTime() - 1);

  expect(() => {
    return new Appointment({
      customer: "Fulano",
      startsAt,
      endsAt,
    });
  }).toThrow();
});
