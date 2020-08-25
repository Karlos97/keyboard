import { objects } from "./models/objects.js";
import keyboard from "./views/keyboard.js";
objects.buttons.forEach((btn) => {
    let i = 1;
  btn.addEventListener("mouseover", function (onEnterEventHandler) {
    if (onEnterEventHandler.path[1].classList.contains("row")) {
      i = 0;
    } else {
      i = 1;
    }
    const kbButton = new keyboard(
      onEnterEventHandler.path[i],
      onEnterEventHandler.path[i].getBoundingClientRect()
    );
     onEnterEventHandler.path[i].style.color = "rgb(227, 252, 0)";
    kbButton.whichButtonClicked();
  });
  btn.addEventListener("mouseout", function (onEnterEventHandler) {
document.getElementsByClassName("tooltip")[0].remove();
      onEnterEventHandler.path[i].style.color = null;
  })
});
//additional task
// document.addEventListener("keydown", function (event) {
  // const key = event.key; // "a", "1", "Shift", etc.
// });