export const isPastSlot = (date, time) => {
  const selected = new Date(`${date}T${time}`);
  return selected < new Date();
};

export const isSlotTaken = (appointments, doctorId, date, time) => {
  return appointments.some(
    (a) =>
      a.doctorId === doctorId &&
      a.date === date &&
      a.time === time &&
      a.status !== "rejected"
  );
};
