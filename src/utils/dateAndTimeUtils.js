export function getNumberOfDaysBetweenTwoDates(date1, date2) {
  date1 = new Date(date1);
  date2 = new Date(date2);
  //calculate time difference
  var time_difference = date2.getTime() - date1.getTime();
  //calculate days difference by dividing total milliseconds in a day
  var days_difference = time_difference / (1000 * 60 * 60 * 24);
  return Math.round(days_difference);
}

export function getEndDateFromStartDateANdDuration(date1, duration) {
  const time_difference = duration * (1000 * 60 * 60 * 24);
  let date2InTime = time_difference + new Date(date1).getTime();
  return new Date(date2InTime);
}

export function convertDataTimeToLocale(date) {
  if (date) return new Date(date).toLocaleString();
  else return "N/A";
}

export function getTimeDifferenceInMin(date) {
  // Get the current time
  const currentTime = new Date();

  // Parse the past date
  const pastTime = new Date(date);

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = currentTime - pastTime;

  // Convert milliseconds to minutes
  const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);

  return differenceInMinutes;
}

export function convertIntoDateAndTime(string) {
  if (string) {
    let date = new Date(string); // Fri Jan 27 2012 02:21:50 GMT+0530 (India Standard Time)
    if (date !== "Invalid Date") {
      date = date.toString();
      date = date.split(" ");
      let am_pm = "";
      let time = date[4].split(":"); // [02,21,50] =
      if (time[0] >= 12) {
        am_pm = "PM";
      } else {
        am_pm = "AM";
      }
      if (time[0] > 12) time[0] = Number(time[0]) % 12;
      return `${date[2]} ${date[1]}, ${date[3]}, ${time[0]}:${time[1]}:${time[2]} ${am_pm}`; // 24 December 2022, 10:00 AM,
    }
  }
}

export function getAllDatesBetween(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates = [];

  while (start <= end) {
    dates.push(new Date(start)); // Format as YYYY-MM-DD
    start.setDate(start.getDate() + 1);
  }

  return dates;
}

export function getCampaignEndingStatus(endDate) {
  return getNumberOfDaysBetweenTwoDates(new Date(), endDate) < 0
    ? "Already Ended"
    : getNumberOfDaysBetweenTwoDates(new Date(), endDate) === 0
    ? "Ending Today"
    : `Ends In : ${getNumberOfDaysBetweenTwoDates(new Date(), endDate)} days`;
}

export function convertDateIntoDateMonthYear(date) {
  if (date) {
    date = new Date(date); // Fri Jan 27 2012 02:21:50 GMT+0530 (India Standard Time)
    if (date !== "Invalid Date") {
      date = date.toString();
      date = date.split(" ");
      return `${date[2]} ${date[1]} ${date[3]}`; // 24 December 2022
    }
  }
  date = new Date(); // Fri Jan 27 2012 02:21:50 GMT+0530 (India Standard Time)
  date = date.toString();
  date = date.split(" ");
  return `${date[2]} ${date[1]}, ${date[3]}`; // 24 December 2022
}

export const formatTimeToAM_PM = (timeString) => {
  if (!timeString) return "--:-- --";

  // Split the time string into hours, minutes, seconds
  const [hours, minutes] = timeString.split(":").map(Number);

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  const twelveHour = hours % 12 || 12;

  // Format with leading zero for minutes if needed
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${twelveHour}:${formattedMinutes} ${period}`;
};
