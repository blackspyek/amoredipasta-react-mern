import React from "react";
DateTime.defaultProps = {
  date: new Date(),
  options: {
    weekDay: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  },
};
export default function DateTime({
  date,
  options: { weekDay, month, day, year, hour, minute, second },
}) {
  var currentLocale = new Intl.DateTimeFormat().resolvedOptions().locale;
  const getDate = () =>
    new Intl.DateTimeFormat(currentLocale, {
      weekday: weekDay,
      month: month,
      day: day,
      year: year,
      hour: hour,
      minute: minute,
      second: second,
    }).format(Date.parse(date));
  return <>{getDate()}</>;
}
