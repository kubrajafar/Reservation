import { services } from "./services/servicesData.js";

const main_service = document.querySelector(".main-service");

const footer_error_btn = document.querySelector(".footer-error-btn");
const footer_next_btn = document.querySelector(".footer-next-btn");
let serviceArr = JSON.parse(localStorage.getItem("serviceArr")) || [];

function getData(service) {
  service.forEach((elem) => {
    const main_service_item = document.createElement("div");
    const service_detail = document.createElement("div");
    const item_img_box = document.createElement("div");
    const item_img = document.createElement("img");
    const item_texts = document.createElement("div");
    const item_name_text = document.createElement("p");
    const item_mail_text = document.createElement("p");
    const service_price_box = document.createElement("div");
    const service_price = document.createElement("p");

    item_img.src = elem.image;
    item_name_text.innerText = elem.name;
    item_mail_text.innerText = elem.duration;
    service_price.innerText = elem.price + "$";

    main_service_item.className = "main-service-item";
    service_detail.classList.add("service-detail");

    item_img_box.classList.add("item-img-box");
    item_texts.classList.add("item-texts");
    item_name_text.className = "item-name-text poppins-medium";
    item_mail_text.className = "item-mail-text poppins-regular";

    service_price_box.className = "service-price poppins-medium";

    item_img_box.append(item_img);
    item_texts.append(item_name_text, item_mail_text);
    service_detail.append(item_img_box, item_texts);
    service_price_box.append(service_price);
    main_service_item.append(service_detail, service_price_box);
    main_service.append(main_service_item);
    if (serviceArr.length > 0 && serviceArr[0].name === elem.name) {
      main_service_item.classList.add("border-green");
    }

    main_service_item.addEventListener("click", () => {
      serviceArr = [elem];
      const main_service_items =
        document.querySelectorAll(".main-service-item");
      main_service_items.forEach((item) => {
        item.classList.remove("border-green");
      });
      main_service_item.classList.add("border-green");

      localStorage.setItem("serviceArr", JSON.stringify(serviceArr));
      window.location.href = "dateTime.html";

      if (serviceArr[0].name == item_name_text.innerText) {
        localStorage.removeItem("DateArr");
        localStorage.removeItem("TimeArr");
      }
    });
  });
}

getData(services);

window.addEventListener("storage", (event) => {
  if (event.key === "serviceArr") {
    serviceArr = JSON.parse(localStorage.getItem("serviceArr")) || [];
    const main_service_items = document.querySelectorAll(".main-service-item");
    main_service_items.forEach((item) => {
      item.classList.remove("border-green");
    });
  }
});

footer_next_btn.addEventListener("click", (e) => {
  if (JSON.parse(localStorage.getItem("serviceArr")) === null) {
    footer_error_btn.style.display = "flex";
    e.preventDefault();
    setTimeout(() => {
      footer_error_btn.style.display = "none";
    }, 2000);
  } else {
    footer_next_btn.href = "./dateTime.html";
  }
});

//localStorage.clear();
