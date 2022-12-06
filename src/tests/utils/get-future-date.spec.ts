import { expect, it } from "vitest";
import { getFutureDate } from "./get-future-date";

it("should add 1 year to date", () => {
  const year = new Date().getFullYear();

  expect(getFutureDate(`${year}-02-10`).getFullYear()).toEqual(year + 1);
});
