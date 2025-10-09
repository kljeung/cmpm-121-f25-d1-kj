import "./style.css";

document.body.innerHTML = `
  <h1> Roachfiestation </h1>
  <button id = "button">🪳</button>
  <button id="upgrade" disabled>Buy Upgrade (+1/sec) — Cost: 10</button>
  <div id = "output">Roaches invited: 0</div>
`;

const button = document.getElementById("button");
const upgrade = document.getElementById("upgrade");
const output = document.getElementById("output");

let roaches = 0;
let growth = 0;

if (button && output) {
  button.addEventListener("click", () => {
    roaches++;
    output.textContent = `Roaches invited: ${roaches}`;
    if (upgrade) upgrade.toggleAttribute("disabled", roaches < 10);
  });
}

if (upgrade && output) {
  upgrade.addEventListener("click", () => {
    if (roaches >= 10) {
      roaches -= 10;
      growth += 1; // +1/sec per purchase
      output.textContent = `Roaches invited: ${roaches}`;
      upgrade.toggleAttribute("disabled", roaches < 10);
    }
  });
}

let lastTime = 0;
function update(currentTime: number) {
  const elapsed = currentTime - lastTime;
  if (elapsed >= 1000) {
    roaches += growth;
    output!.textContent = `Roaches invited: ${roaches}`;
    lastTime = currentTime;
  }
  requestAnimationFrame(update);
}
requestAnimationFrame(update);
