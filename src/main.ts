import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
   <button id="iconButton" class="icon-button">
    <img src="${exampleIconUrl}" class="icon" />
  </button>
  <div id="output"></div>
`;

const button = document.getElementById("circleButton");
const output = document.getElementById("output");

if (button && output) {
  button.addEventListener("click", () => {
    output.textContent = "wow you actually clicked this..";
  });
}
