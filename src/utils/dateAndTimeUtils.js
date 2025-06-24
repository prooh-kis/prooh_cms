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

export const calculateDaysPlayed = (startDate, endDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Remove time component from today

  const campaignEnd = new Date(endDate);
  campaignEnd.setHours(0, 0, 0, 0); // Remove time component

  const effectiveEndDate = today < campaignEnd ? today : campaignEnd;

  return getNumberOfDaysBetweenTwoDates(startDate, effectiveEndDate) + 1;
};

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

export function getTimeAgo(date) {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now - past) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
    }
  }

  return "just now";
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

export function getCampaignDurationFromStartAndEndDate(date1, date2) {
  date1 = new Date(date1);
  date2 = new Date(date2);
  date2.setHours(23, 59, 59, 999);

  // Calculate the difference in milliseconds
  const time_difference = date2.getTime() - date1.getTime();

  // Convert to days, rounding up to count partial days as full days
  return Math.ceil(time_difference / (1000 * 60 * 60 * 24));
}

export function getEndDateFromStartDateAndDuration(startDate, duration) {
  const start = new Date(startDate);

  // Clone start date and add duration days
  const endDate = new Date(start);
  endDate.setDate(endDate.getDate() + (duration - 1));

  // Set time to 23:59:59.999
  endDate.setHours(23, 59, 59, 999);

  return endDate;
}

export function getTimeFromDate(string) {
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
      return `${time[0]}:${time[1]}:${time[2]} ${am_pm}`; // 24 December 2022, 10:00 AM,
    }
  }
  date = new Date();
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
  return `${time[0]}:${time[1]}:${time[2]} ${am_pm}`; // 24 December 2022, 10:00 AM,
}

export function formatDateForLogs(isoDate) {
  const date = new Date(`${isoDate}`);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getUTCFullYear();
  return { apiDate: `${day}/${month}/${year}`, logDate: date.toDateString() };
}

export function transformToAmPm(time) {
  let [hour, minute, second] = time.split(":");
  hour = Number(hour);
  const period = hour >= 12 ? "PM" : "AM";
  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour -= 12;
  }
  const formattedTime = `${String(hour).padStart(
    2,
    "0"
  )}:${minute}:${second} ${period}`;

  return formattedTime;
}

export function convertTo12Hour(hour24) {
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12; // Converts 0 to 12
  return `${hour12} ${period}`;
}

// Helper function to compare dates in mm/dd/yyyy format
export function isDateAfter(dateStr1, dateStr2) {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);
  return date1 > date2;
}

export function formatDate(dateString) {
  const [month, day, year] = dateString.split("/"); // Split input string
  const date = new Date(year, month - 1, day); // Create Date object with correct format

  return `${day} ${date.toLocaleString("en-US", { month: "short" })}`;
}
