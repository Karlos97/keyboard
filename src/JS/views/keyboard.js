// import { objects } from "../models/objects.js";
// import { dps, chart } from "./init.js";
// // import chart from "./chart.js";

export default class keyboard {
  constructor(path, position) {
    this.path = path;
    this.position = position;
  }
  // whichButtonClicked(path1 = this.path, position1){

  whichButtonClicked() {
    console.log(this.path);
    console.log(this.position.top);
    console.log(this.position.left);
    console.log(this.position.width);
    console.log(this.position.height);
    let bodySize = document.body.getBoundingClientRect();
    let div = document.createElement("div");
    div.setAttribute("class", "tooltip");
    // div.setAttribute("top", "tooltip");
    // div.style.top = this.position.top + '${this.position.height}px';
    div.style.top = -45;
    // div.style.left = this.position.left - 410;
    console.log(div.style.left = this.position.left - 410);
    // div.style.left = "100px";
    // div.style.background = "red";
    // div.style.color = "white";
    div.innerHTML = "DEC ASCII CODE: ";

    this.path.appendChild(div);

  };
}
