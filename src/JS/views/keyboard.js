export default class keyboard {
  constructor(path, position) {
    this.path = path;
    this.position = position;
  }
  whichButtonClicked() {
    let tooltipExists = false;
    for (let el of this.path.childNodes) {
      if (el.className === "tooltip") tooltipExists = true;
    }
    if (!tooltipExists) {
      let content = this.path.childNodes[0].textContent;
      let inValid = /\s/;
      let k = inValid.test(content);
      let asciiCode = `${content}`.charCodeAt(0);
      if (k) asciiCode = 15;//shift przejawia się linią przerwy
      if(asciiCode === 91) asciiCode=32
      const bodyRect = document.body.getBoundingClientRect();
      let bodySize = document.body.getBoundingClientRect();
      let div = document.createElement("div");
      div.setAttribute("class", "tooltip");
      div.innerHTML = `DEC ASCII CODE: ${asciiCode}`;
      this.path.appendChild(div);
    }
  }
}
