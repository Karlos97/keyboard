import { objects } from "../models/objects.js";
export default class keyboard {
  constructor(path, position, letter, j) {
    this.path = path;
    this.position = position;
    this.letter = letter;
    this.j = j;
  }
  createTooltip() {
    let tooltip = document.getElementsByClassName("tooltip")[0];
    if (tooltip) {
      tooltip.remove();
    }
    let tooltipExists = false;
    for (let el of this.path.childNodes) {
      if (el.className === "tooltip") tooltipExists = true;
    }
    if (!tooltipExists) {
      let inValid = /\s/;
      let k = inValid.test(this.letter);
      let asciiCode = `${this.letter}`.charCodeAt(0);
      if (k) {
        asciiCode = 15; //shift
        if (this.j !== 2) {
          objects.lampColor.style.backgroundColor = objects.lightGreen;
          objects.buttons.forEach((el) => {
            if (el.childNodes[0].innerText)
              el.childNodes[0].innerText = el.childNodes[0].innerText.toUpperCase();
          });
        }
      }
      if (asciiCode === 91) asciiCode = 32; //space
      if (asciiCode === 8592) asciiCode = 8; //backspace
      if (asciiCode === 8629) asciiCode = 13; //enter
      const bodyRect = document.body.getBoundingClientRect();
      let bodySize = document.body.getBoundingClientRect();
      let div = document.createElement("div");
      div.setAttribute("class", "tooltip");
      div.innerHTML = `DEC ASCII CODE: ${asciiCode}`;
      this.path.appendChild(div);
    }
  }
}
