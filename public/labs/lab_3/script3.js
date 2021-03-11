/* eslint-disable quotes */
const listContainer = document.querySelector(".images");
/* selecting all images in code */

function shiftLeft() {
  const lastThree = Array.from(listContainer.children).slice(4, 7).reverse();
  lastThree.forEach((element) => {
    /* removes the first child and then adds one */
    listContainer.removeChild(element);
    listContainer.insertBefore(element, listContainer.children[0]);
  });
}

function shiftRight() {
  const firstThree = Array.from(listContainer.children).slice(
    0,
    3
  ); /* saves the first three children as firstThree */
  firstThree.forEach((element) => {
    /* takes first three children, removes one child and adds another */
    listContainer.removeChild(element);
    listContainer.appendChild(element);
  });
}

function onLoadOfPage() {
  document
    .querySelector("button.arrow.left")
    .addEventListener("click", (event) => {
      shiftLeft();
    });
  document
    .querySelector("button.arrow.right")
    .addEventListener("click", (event) => {
      shiftRight();
    });
}

window.onload = onLoadOfPage;
