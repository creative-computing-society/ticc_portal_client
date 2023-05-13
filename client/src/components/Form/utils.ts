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
