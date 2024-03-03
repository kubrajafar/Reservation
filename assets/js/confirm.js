const staff_name = document.querySelector(".staff_name");
const service_name = document.querySelector(".service_name");
const dateTime = document.querySelector(".dateTime");
const price = document.querySelector(".price");

const staffArr = JSON.parse(localStorage.getItem("staffArr"));
const serviceArr = JSON.parse(localStorage.getItem("serviceArr"));
const DateArr = JSON.parse(localStorage.getItem("DateArr"));
const TimeArr = JSON.parse(localStorage.getItem("TimeArr"));

const frstname = document.querySelector("#frstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");

let confirmedReservation = [];

staff_name.innerText = staffArr[0].name;
service_name.innerText = serviceArr[0].name;
dateTime.innerText = `${DateArr[0].year}-${DateArr[0].month}-${DateArr[0].day} / ${TimeArr[0].start_time}-${TimeArr[0].end_time}`;
price.innerText = `$${serviceArr[0].price}`;

const footer_next_btn = document.querySelector(".footer-next-btn");
const modal = document.querySelector(".modal");
const modal_close = document.querySelector(".modal_close");
const bg_opasity = document.querySelector(".bg-opasity");

footer_next_btn.addEventListener("click", () => {
  if (
    frstname.value.trim() === "" ||
    lastname.value.trim() === "" ||
    email.value.trim() === "" ||
    phone.value.trim() === ""
  ) {
    modal.children[1].innerText = "Please, fill the all required fields!";
  } else {
    modal.children[1].innerText = "Confirmation successfully completed!";
    modal.children[1].style.color = "rgba(56, 207, 120, 1)";
    window.location.href = "staff.html";
    localStorage.clear();
    confirmedDataAdd();
  }
  modal.classList.add("active-modal");
  bg_opasity.classList.add("bg-opasity-active");
});

modal_close.addEventListener("click", () => {
  modal.classList.remove("active-modal");
  bg_opasity.classList.remove("bg-opasity-active");
});

function confirmedDataAdd() {
  let obj = {
    staff_id: staffArr[0].id,
    service_id: serviceArr[0].id,
    date: `${DateArr[0].year}-${DateArr[0].month}-${DateArr[0].day}`,
    time: TimeArr[0].start_time,
    customer: {
      name: frstname.value,
      surname: lastname.value,
      email: email.value,
      phone: phone.value,
    },
  };

  confirmedReservation.push(obj);

  localStorage.setItem(
    "confirmedReservation",
    JSON.stringify(confirmedReservation)
  );
}


//localStorage.clear()