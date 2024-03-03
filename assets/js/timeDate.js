import { myDates } from "./services/datesData.js";
import { time } from "./services/timeData.js";

const header = document.querySelector(".date-header h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");
const time_data_main = document.querySelector(".time-data-main");
const time_select_text = document.querySelector(".time-select-text");
const footer_error_btn = document.querySelector(".footer-error-btn");
const footer_next_btn = document.querySelector(".footer-next-btn");
let DateArr = [];
let TimeArr = [];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let [year, month] = [new Date().getFullYear(), new Date().getMonth()];

const aviableAllDate = myDates.map((date) => {
  let [year, month, day] = date.split("-").map((num) => parseInt(num));
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
});

function renderCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  let datesHtml = "";

  for (let i = 0; i < start; i++) {
    datesHtml += `<li class="inactive">${months[(start - i - 1 + 7) % 7]}</li>`;
  }

  for (let i = 1; i <= endDate; i++) {
    const isBlackColor = aviableAllDate.includes(
      `${year}-${month + 1 < 10 ? "0" + (month + 1) : month + 1}-${
        i < 10 ? "0" + i : i
      }`
    );

    if (JSON.parse(localStorage.getItem("DateArr")) !== null && isBlackColor) {
      const selectedDayData = JSON.parse(localStorage.getItem("DateArr"))[0];
      if (
        selectedDayData.year === year &&
        selectedDayData.month === month + 1 &&
        selectedDayData.day === i
      ) {
        datesHtml += `<li class="black-color background-purple">${i}</li>`;
        getAddData();
        continue;
      }
    }

    if (localStorage.getItem("TimeArr") !== null) {
      const selectTimes = document.querySelectorAll(".time-content-box");

      selectTimes.forEach((selectTime) => {
        if (
          JSON.parse(localStorage.getItem("TimeArr"))[0].start_time ==
          selectTime.children[0].innerText
        ) {
          selectTime.classList.add("bg-color");
        }
      });
    }

    datesHtml += `<li class="${isBlackColor ? "black-color" : ""}">${i}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;
  // Time select text içeriğini güncelleme
  if (JSON.parse(localStorage.getItem("DateArr"))) {
    const selectedDayData = JSON.parse(localStorage.getItem("DateArr"))[0];
    time_select_text.innerText = `${selectedDayData.year}-${
      selectedDayData.month < 10
        ? "0" + selectedDayData.month
        : selectedDayData.month
    }-${
      selectedDayData.day < 10 ? "0" + selectedDayData.day : selectedDayData.day
    }`;
  }
  getSelectData();
}

navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    month =
      e.target.parentElement.id === "next"
        ? month === 11
          ? 0
          : month + 1
        : month === 0
        ? 11
        : month - 1;
    year +=
      month === 0 && e.target.parentElement.id === "prev"
        ? -1
        : month === 11 && e.target.parentElement.id === "next"
        ? 1
        : 0;
    renderCalendar();
  });
});

renderCalendar();

function getSelectData() {
  const selectDays = document.querySelectorAll(".black-color");
  selectDays.forEach((selectDay) => {
    selectDay.addEventListener("click", () => {
      localStorage.removeItem("TimeArr");
      const selectedDayData = {
        day: parseInt(selectDay.innerText),
        month: month + 1,
        year,
      };
      DateArr = [selectedDayData];
      localStorage.setItem("DateArr", JSON.stringify(DateArr));
      time_select_text.innerText = `${year}-${
        month + 1 < 10 ? "0" + (month + 1) : month + 1
      }-${selectedDayData.day}`;

      selectDays.forEach((item) => item.classList.remove("background-purple"));
      selectDay.classList.add("background-purple");
      time_data_main.innerHTML = "";
      getAddData();
    });
  });
}

function getAddData() {
  time.forEach((elem) => {
    const time_content_box = document.createElement("div");
    time_content_box.className = "time-content-box poppins-regular";
    time_content_box.innerHTML = `<p class="start-time"> ${elem.start_time}</p><p class="end-time">${elem.end_time}</p>`;
    time_data_main.appendChild(time_content_box);
    getSelectTime();
  });
}

function getSelectTime() {
  const selectTimes = document.querySelectorAll(".time-content-box ");
  selectTimes.forEach((selectTime) => {
    selectTime.addEventListener("click", () => {
      const selectedTimeData = {
        start_time: selectTime.querySelector(".start-time").innerText,
        end_time: selectTime.querySelector(".end-time").innerText,
      };

      TimeArr = [selectedTimeData];
      localStorage.setItem("TimeArr", JSON.stringify(TimeArr));
      selectTimes.forEach((item) => item.classList.remove("bg-color"));
      selectTime.classList.add("bg-color");
      window.location.href = "./confirm.html";
    });
  });
}

footer_next_btn.addEventListener("click", (e) => {
  const dateArr = JSON.parse(localStorage.getItem("DateArr"));
  const timeArr = JSON.parse(localStorage.getItem("TimeArr"));

  if (!dateArr || dateArr.length === 0 || !timeArr || timeArr.length === 0) {
    footer_error_btn.style.display = "flex";
    e.preventDefault();
    setTimeout(() => (footer_error_btn.style.display = "none"), 2000);
  } else {
    footer_next_btn.href = "./confirm.html";
  }
});

//localStorage.clear();
