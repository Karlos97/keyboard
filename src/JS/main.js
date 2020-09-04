import { objects } from "./models/objects.js";
import keyboard from "./views/keyboard.js";
let key, upperKey, path, inValid, k;
let deleteTooltip = () => {
  let tooltip = document.getElementsByClassName("tooltip")[0];
  if (tooltip) {
    tooltip.remove();
  }
};

let searchingPath = (key, type) => {
  inValid = /\s/;
  k = inValid.test(key);
  upperKey = key.toUpperCase();
  if (key === "Shift") {
    key = " ";
    path = document.getElementsByClassName(`button-shift-el--1`)[0]
      .parentElement;
    if (type === "keydown") {
      objects.lampColor.style.backgroundColor = "rgb(26, 199, 64)";
      objects.buttons.forEach((el) => {
        if (el.childNodes[0].innerText)
          el.childNodes[0].innerText = el.childNodes[0].innerText.toUpperCase();
      });
    } else if (type === "keyup") {
      objects.lampColor.style.backgroundColor = "rgb(164, 185, 169)";
      objects.buttons.forEach((el) => {
        if (el.childNodes[0].innerText)
          el.childNodes[0].innerText = el.childNodes[0].innerText.toLowerCase();
      });
    }
  } else if (k) {
    key = "[";
    letterPath("button--spacebar");
  } else if (key === "Enter") {
    key = "↵";
    letterPath("button--enter");
  } else if (key === "Backspace") {
    key = "←";
    letterPath("button-b--arrow");
  } else if (key === ",") {
    letterPath("button--spec1");
  } else if (key === ".") {
    letterPath("button--spec2");
  } else if (key === "?") {
    letterPath("button--spec3");
  } else {
    path = document.getElementsByClassName(`button--${upperKey}`)[0]
      .parentElement;
  }
};
let letterPath = (word) => {
  path = document.getElementsByClassName(word)[0].parentElement;
};
objects.buttons.forEach((btn) => {
  let i = 1;
  btn.addEventListener("mouseover", (event) => {
    if (event.path[1].classList.contains("row")) {
      i = 0;
    } else {
      i = 1;
    }
    const kbButton = new keyboard(
      event.path[i],
      event.path[i].getBoundingClientRect(),
      event.path[i].childNodes[0].textContent
    );
    event.path[i].style.color = "rgb(227, 252, 0)";
    kbButton.createTooltip();
  });
  btn.addEventListener("mouseout", (event) => {
    deleteTooltip();
    event.path[i].style.color = null;
  });
});
document.addEventListener("keydown", (event) => {
  key = event.key;
    searchingPath(key, event.type);
  const kbButton = new keyboard(path, path.getBoundingClientRect(), key);
  kbButton.createTooltip();
  path.style.color = "rgb(227, 252, 0)";
});
document.addEventListener("keyup", (event) => {
  key = event.key;
  // console.log(event.type);
  searchingPath(key, event.type);

  // inValid = /\s/;
  // k = inValid.test(key);
  // upperKey = key.toUpperCase();
  // if (key === "Shift") {
  //   path = document.getElementsByClassName(`button-shift-el--1`)[0]
  //     .parentElement;
  //   objects.lampColor.style.backgroundColor = "rgb(164, 185, 169)";
  //   objects.buttons.forEach((el) => {
  //     if (el.childNodes[0].innerText)
  //       el.childNodes[0].innerText = el.childNodes[0].innerText.toLowerCase();
  //   });
  // } else if (k) {
  //   key = "[";
  //   letterPath("button--spacebar");
  // } else if (key === "Enter") {
  //   key = "↵";
  //   letterPath("button--enter");
  // } else if (key === "Backspace") {
  //   key = "←";
  //   letterPath("button-b--arrow");
  // } else if (key === ",") {
  //   letterPath("button--spec1");
  // } else if (key === ".") {
  //   letterPath("button--spec2");
  // } else if (key === "?") {
  //   letterPath("button--spec3");
  // } else {
  //   path = document.getElementsByClassName(`button--${upperKey}`)[0]
  //     .parentElement;
  // }
  deleteTooltip();
  path.style.color = null;
});
