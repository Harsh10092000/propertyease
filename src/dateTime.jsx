import React from "react";

const DateTime = (dateString) => {
  if (dateString.includes("-")) {
    const formattedDate = dateString.replace(/-/g, "/");
    const date = new Date(formattedDate);
    const now = new Date();
    const diffTime = now - date;
    const diffSeconds = Math.floor(diffTime / 1000);

    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffSeconds < 60) {
      return "just now";
    } else if (diffMinutes < 60) {
      return diffMinutes + " minute" + (diffMinutes > 1 ? "s" : "") + " ago";
    } else if (diffHours < 24) {
      return diffHours + " hour" + (diffHours > 1 ? "s" : "") + " ago";
    } else if (diffDays < 7) {
      return diffDays + " day" + (diffDays > 1 ? "s" : "") + " ago";
    } else if (diffWeeks < 4) {
      return diffWeeks + " week" + (diffWeeks > 1 ? "s" : "") + " ago";
    } else if (diffMonths < 12) {
      return diffMonths + " month" + (diffMonths > 1 ? "s" : "") + " ago";
    } else {
      return diffYears + " year" + (diffYears > 1 ? "s" : "") + " ago";
    }
  } else {
    const date = new Date(parseInt(dateString));

    date.setUTCHours(date.getUTCHours() + 5);
    date.setUTCMinutes(date.getUTCMinutes() + 30);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    const formattedTimestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    console.log(
      "dateString : ",
      dateString,
      formattedTimestamp,
      typeof dateString
    );
    //const formattedDate = dateString.replace(/-/g, "/");
    const date1 = new Date(formattedTimestamp);
    const now = new Date();
    const diffTime = now - date1;
    const diffSeconds = Math.floor(diffTime / 1000);

    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffSeconds < 60) {
      return "just now";
    } else if (diffMinutes < 60) {
      return diffMinutes + " minute" + (diffMinutes > 1 ? "s" : "") + " ago";
    } else if (diffHours < 24) {
      return diffHours + " hour" + (diffHours > 1 ? "s" : "") + " ago";
    } else if (diffDays < 7) {
      return diffDays + " day" + (diffDays > 1 ? "s" : "") + " ago";
    } else if (diffWeeks < 4) {
      return diffWeeks + " week" + (diffWeeks > 1 ? "s" : "") + " ago";
    } else if (diffMonths < 12) {
      return diffMonths + " month" + (diffMonths > 1 ? "s" : "") + " ago";
    } else {
      return diffYears + " year" + (diffYears > 1 ? "s" : "") + " ago";
    }
  }
};

export default DateTime;
