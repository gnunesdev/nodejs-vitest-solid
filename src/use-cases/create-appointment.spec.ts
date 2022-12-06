import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe("Create appointment", () => {
  it("should be able to create an appointment", () => {
    const appointmentRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);

    const startsAt = getFutureDate("2022-10-10");
    const endsAt = getFutureDate("2022-10-11");

    expect(
      createAppointment.execute({
        customer: "Fulano",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should not be able to create an appointment with overlapping dates", async () => {
    const appointmentRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);

    await createAppointment.execute({
      customer: "Fulano",
      startsAt: getFutureDate("2022-10-10"),
      endsAt: getFutureDate("2022-10-15"),
    });

    expect(
      createAppointment.execute({
        customer: "Fulano",
        startsAt: getFutureDate("2022-10-12"),
        endsAt: getFutureDate("2022-10-16"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
