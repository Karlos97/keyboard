import { objects } from "./models/objects.js";
import keyboard from "./views/keyboard.js";
let key, upperKey, path, inValid, k;
let deleteTooltip = () => {
  let tooltip = document.getElementsByClassName("tooltip")[0];
  if (tooltip) {
    tooltip.remove();
  }
};
let searchingPath = (keyX, type) => {
  inValid = /\s/;
  k = inValid.test(keyX);
  upperKey = keyX.toUpperCase();
  if (keyX === "Shift") {
    key = " ";
    path = document.getElementsByClassName(`button-shift-el--1`)[0]
      .parentElement;
    if (type === "keydown") {
      objects.lampColor.style.backgroundColor = objects.lightGreen;
      objects.buttons.forEach((el) => {
        if (el.childNodes[0].innerText)
          el.childNodes[0].innerText = el.childNodes[0].innerText.toUpperCase();
      });
    } else if (type === "keyup") {
      objects.lampColor.style.backgroundColor = objects.lightGray;
      objects.buttons.forEach((el) => {
        if (el.childNodes[0].innerText)
          el.childNodes[0].innerText = el.childNodes[0].innerText.toLowerCase();
      });
    }
  } else if (k) {
    key = "[";
    letterPath("button--spacebar");
  } else if (keyX === "Enter") {
    key = "↵";
    letterPath("button--enter");
  } else if (keyX === "Backspace") {
    key = "←";
    letterPath("button-b--arrow");
  } else if (keyX === ",") {
    letterPath("button--spec1");
  } else if (keyX === ".") {
    letterPath("button--spec2");
  } else if (keyX === "?") {
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
  let i = 1,
    j = 0;
  btn.addEventListener("click", (event) => {
    if (!j) {
      if (event.path[1].classList.contains("row")) {
        i = 0;
      } else {
        i = 1;
      }
      const kbButton = new keyboard(
        event.path[i],
        event.path[i].getBoundingClientRect(),
        event.path[i].childNodes[0].textContent,
        j
      );
      event.path[i].style.color = objects.yellow;
      kbButton.createTooltip();
      j++;
    }
  });
  btn.addEventListener("click", (event) => {
    if (j === 2) {
      let inValid = /\s/;
      let k = inValid.test(event.path[i].childNodes[0].textContent);
      deleteTooltip();
      event.path[i].style.color = null;
      if ((objects.lampColor.style.backgroundColor = objects.lightGreen && k)) {
        objects.lampColor.style.backgroundColor = objects.lightGray;
        objects.buttons.forEach((el) => {
          if (el.childNodes[0].innerText)
            el.childNodes[0].innerText = el.childNodes[0].innerText.toLowerCase();
        });
      }
      j = 0;
    } else j++;
  });
});
document.addEventListener("keydown", (event) => {
  console.log(key);
  searchingPath(event.key, event.type);
  const kbButton = new keyboard(path, path.getBoundingClientRect(), key);
  kbButton.createTooltip();
  path.style.color = objects.yellow;
});
document.addEventListener("keyup", (event) => {
  key = event.key;
  searchingPath(key, event.type);
  deleteTooltip();
  path.style.color = null;
});
