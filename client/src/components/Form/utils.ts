import dayjs from "dayjs";
export const checkDateValidity = (
  current: dayjs.Dayjs,
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs
) => {
  return (
    current.isAfter(startDate) &&
    current.isBefore(endDate) &&
    current.day() !== 6 &&
    current.day() !== 0
  );
};

export const getSlots = (
  startTime: dayjs.Dayjs,
  endTime: dayjs.Dayjs,
  interval: number
) => {
  // return array of times between start and end time in 30 minute intervals
  const slots = [];
  let currentTime = startTime;
  while (currentTime.isBefore(endTime)) {
    // convert to 12 hour time
    slots.push(currentTime);
    currentTime = currentTime.add(interval, "minute");
  }
  return slots;
};
