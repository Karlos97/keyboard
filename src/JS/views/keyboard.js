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
    const bodyRect = document.body.getBoundingClientRect();
    let bodySize = document.body.getBoundingClientRect();
    let div = document.createElement("div");
    div.setAttribute("class", "tooltip");
    // div.setAttribute("top", "tooltip");
    // div.style.top = this.position.top + '${this.position.height}px';
    // div.style.top = this.position.top - (this.position.height / 2) + "px";
    // div.style.top = bodyRect.top - this.position.top;
    // div.style.top = 102 - this.position.top + "px";
    div.style.top = -this.position.height + "px";
    // div.style.left = this.position.left - bodyRect.left +"px";
    // div.style.left = this.position.left - this.position.width + "px";
    div.style.left = -347.8 + this.position.left + "px";
    // div.style.left = this.position.left - (this.position.width / 2) + "px";
    // console.log(bodyRect.top);
    // console.log(this.position.top);
    // console.log(this.position.top - this.position.height / 2 + "px");
    // console.log(this.position.left - this.position.width / 2 + "px");
    // div.style.left = "100px";
    // div.style.background = "red";
    // div.style.color = "white";
    div.innerHTML = "DEC ASCII CODE: ";

    this.path.appendChild(div);
    // document.body.appendChild(div);
    // this.path.parentElement.appendChild(div);
  }
}
