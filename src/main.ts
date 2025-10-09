import "./style.css";

document.body.innerHTML = `
  <h1> Roachfiestation </h1>
  <button id = "button">🪳</button>
  <div id = "output">Roaches killed: 0</div>
`;

const button = document.getElementById("button");
const output = document.getElementById("output");

let roaches = 0;

if (button && output) {
  button.addEventListener("click", () => {
    roaches++;
    output.textContent = `Roaches killed ${roaches}`;
  });
}
