// import list from "./views/list.js";
// import init from "./views/init.js";
// import "./views/init.js";
import { objects } from "./models/objects.js";
import keyboard from "./views/keyboard.js";

objects.buttons.forEach((btn) => {
  btn.addEventListener("click", function (onEnterEventHandler) {
    // console.log(onEnterEventHandler.path)
    // console.log(onEnterEventHandler.path[1].getBoundingClientRect());
    const kbButton = new keyboard(
      onEnterEventHandler.path[1],
      onEnterEventHandler.path[0].getBoundingClientRect()
    );
    kbButton.whichButtonClicked();
  });
});
