/* eslint-disable max-len */
/* eslint-disable max-len */
/* eslint-disable quotes */

// this code forces page to reload each time you click the button. you can just use javascript and css to play with display rules

const listContainer = document.querySelector(".images");
/* selecting all images in code */

function shiftLeft() {
  const lastThree = Array.from(listContainer.children).slice(4, 7).reverse(); // (4, 7) means 5, 6, 7. reverse makes it 7, 6, 5
  lastThree.forEach((element) => {
    // element is 5th, 6th, or 7th image
    /* removes the first child and then adds one */
    listContainer.removeChild(element); // loops through elements to remove - 5, then 6, then 7
    listContainer.insertBefore(element, listContainer.children[0]); // then puts that element at the beginning of the array
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
