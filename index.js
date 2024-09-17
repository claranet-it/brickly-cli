#!/usr/bin/env node
const { BRICKLY_TOKEN } = process.env;
const token = BRICKLY_TOKEN;

const baseUrl =
  "https://8sl94yg50l.execute-api.eu-south-1.amazonaws.com/prod/api/time-entry/mine";

const today = new Date();

const fromDate = getFirstDayOfMonth(today);
const toDate = getLastDayOfMonth(today);

const fromDateFY = getFirstDayOfMonth(new Date(today.getFullYear(), 6, 1));
const toDateFY = getLastDayOfMonth(new Date(today.getFullYear() + 1, 5, 30));

const foundDataOfPeriod = (fromDate, toDate) => {
  const url = `${baseUrl}?from=${encodeURIComponent(
    fromDate
  )}&to=${encodeURIComponent(toDate)}`;

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const totalHours = data.reduce((sum, item) => sum + item.hours, 0);

      const billableHours = hoursByType(data, "billable");

      const absenceHours = hoursByType(data, "absence");

      const slackHorus = hoursByType(data, "slack-time");

      const billablePercentage = Math.round(
        totalHours > 0 ? (billableHours / (totalHours - absenceHours)) * 100 : 0
      );

      const slackPercentage = Math.round(
        totalHours > 0 ? (slackHorus / (totalHours - absenceHours)) * 100 : 0
      );

      console.log(" ------------- ");
      console.info(`Report from ${fromDate} to ${toDate}`);
      console.info("Total hours:", totalHours);
      console.info("Absence hours:", absenceHours);
      console.info(`Billable hours: ${billableHours} (${billablePercentage}%)`);
      console.info(`Slack hours: ${slackHorus} (${slackPercentage}%)`);
    })
    .catch((error) => console.error("Error:", error));
};

const hoursByType = (data, type) => {
  return data
    .filter((item) => item.project.type === type)
    .reduce((sum, item) => sum + item.hours, 0);
};

function padZero(num) {
  return num.toString().padStart(2, "0");
}

function getLastDayOfMonth(date) {
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  return new Date(nextMonth - 1).toISOString().split("T")[0];
}

function getFirstDayOfMonth(date) {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  return `${year}-${month}-01`;
}

foundDataOfPeriod(fromDate, toDate);
foundDataOfPeriod(fromDateFY, toDateFY);
