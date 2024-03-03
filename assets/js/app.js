const item_circle = document.querySelectorAll(".item-circle");
const item_text = document.querySelectorAll(".item-text");

if (window.location.href.includes("staff")) {
  item_circle[0].style.backgroundColor = "#53d56c";
  item_text[0].style.color = "#53d56c";
}
function finishedElem(a) {
  item_circle[a].style.backgroundColor = "#6c70dc";
  item_text[a].style.color = "#fff";
  item_circle[a].innerHTML = `<i class="fa-solid fa-check"></i>`;
}
function unFinishedElem(b) {
  item_circle[b].style.backgroundColor = "#53d56c";
  item_text[b].style.color = "#53d56c";
}
if (window.location.href.includes("service")) {
  finishedElem(0);
  unFinishedElem(1);
}
if (window.location.href.includes("dateTime")) {
  finishedElem(0);
  finishedElem(1);
  unFinishedElem(2);
}
if (window.location.href.includes("confirm")) {
  finishedElem(0);
  finishedElem(1);
  finishedElem(2);
  unFinishedElem(3);
}
