import { staffs } from "./services/staffsData.js";

const footer_error_btn = document.querySelector(".footer-error-btn");
const footer_next_btn = document.querySelector(".footer-next-btn");

const main_content = document.querySelector(".main-content");
let staffArr = JSON.parse(localStorage.getItem("staffArr")) || [];



function getData(staff) {
  staff.forEach((elem) => {
    const main_content_item = document.createElement("div");
    const item_img_box = document.createElement("div");
    const item_img = document.createElement("img");
    const item_texts = document.createElement("div");
    const item_name_text = document.createElement("p");
    const item_mail_text = document.createElement("p");

    item_img.src = elem.image;
    item_name_text.innerText = elem.name;
    item_mail_text.innerText = elem.email;

    main_content_item.className = "main-content-item";

    item_img_box.classList.add("item-img-box");
    item_texts.classList.add("item-texts");
    item_name_text.className = "item-name-text poppins-medium";
    item_mail_text.className = "item-mail-text poppins-regular";

    item_img_box.append(item_img);
    item_texts.append(item_name_text, item_mail_text);
    main_content_item.append(item_img_box, item_texts);
    main_content.append(main_content_item);

    if (staffArr.length > 0 && staffArr[0].name === elem.name) {
      main_content_item.classList.add("border-green");
    }

    main_content_item.addEventListener("click", () => {
      staffArr = [elem];
      const main_content_items =
        document.querySelectorAll(".main-content-item");
      main_content_items.forEach((item) => {
        item.classList.remove("border-green");
      });
      main_content_item.classList.add("border-green");

      localStorage.setItem("staffArr", JSON.stringify(staffArr));
      window.location.href = "service.html";

      if (staffArr[0].name == item_name_text.innerText) {
        localStorage.removeItem("serviceArr");
        localStorage.removeItem("DateArr");
        localStorage.removeItem("TimeArr");
      }
    });
  });
}

getData(staffs);

window.addEventListener("storage", (event) => {
  if (event.key === "staffArr") {
    staffArr = JSON.parse(localStorage.getItem("staffArr")) || [];
    const main_content_items = document.querySelectorAll(".main-content-item");
    main_content_items.forEach((item) => {
      item.classList.remove("border-green");
    });
  }
});

footer_next_btn.addEventListener("click", (e) => {
  if (JSON.parse(localStorage.getItem("staffArr")) === null) {
    footer_error_btn.style.display = "flex";
    e.preventDefault();
    setTimeout(() => {
      footer_error_btn.style.display = "none";
    }, 2000);
  } else {
    footer_next_btn.href = "./service.html";
  }
});

//localStorage.clear();
if (JSON.parse(localStorage.getItem("confirmedReservation") !== null)) {
  console.log(JSON.parse(localStorage.getItem("confirmedReservation"))[0]);
}
