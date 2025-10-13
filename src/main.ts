import "./style.css";

document.body.innerHTML = `
  <h1> Roachfiestation </h1>
  <button id="button">🪳</button>
  <div id="extra-upgrades"></div>
  <div id="output">Roaches invited: 0</div>
  <div id="status"></div>
`;

const button = document.getElementById("button");
const upgrade = document.getElementById("upgrade");
const output = document.getElementById("output");

let roaches = 0;
let growth = 1;

const availableItems = [
  { id: "egg", name: "Roach Egg", cost: 10, rate: 0.1, count: 0 },
  { id: "larva", name: "Roach Larva", cost: 10, rate: 1.0, count: 0 },
  { id: "hoard", name: "Roach Hoard", cost: 100, rate: 2.0, count: 0 },
  { id: "nest", name: "Roach Nest", cost: 1000, rate: 50, count: 0 },
];

const extraContainer = document.getElementById("extra-upgrades");
if (extraContainer) {
  availableItems.forEach((u) => {
    const btn = document.createElement("button");
    btn.id = `upgrade-${u.id}`;
    btn.textContent = `Buy ${u.name} (+${u.rate}/sec) — Cost: ${
      u.cost.toFixed(2)
    }`;
    btn.disabled = true;
    extraContainer.appendChild(btn);

    btn.addEventListener("click", () => {
      if (roaches >= u.cost) {
        roaches -= u.cost;
        u.count++;
        u.cost = +(u.cost * 1.15).toFixed(2);

        refreshUI();
      }
    });
  });
}

const statusDiv = document.getElementById("status");

function getTotalGrowth() {
  const upgradeGrowth = availableItems.reduce(
    (sum, u) => sum + u.count * u.rate,
    0,
  );
  return growth + upgradeGrowth;
}

function refreshUI() {
  if (output) output.textContent = `Roaches invited: ${roaches.toFixed(1)}`;

  availableItems.forEach((u) => {
    const btn = document.getElementById(`upgrade-${u.id}`);
    if (btn) {
      btn.toggleAttribute("disabled", roaches < u.cost);
      btn.textContent = `Buy ${u.name} (+${u.rate}/sec) — Cost: ${
        u.cost.toFixed(2)
      }`;
    }
  });
  if (statusDiv) {
    statusDiv.innerHTML = `
      <p>Growth rate: ${getTotalGrowth().toFixed(2)} roaches/sec</p>
      <p>Upgrades purchased:</p>
      <ul>
        ${availableItems.map((u) => `<li>${u.name}: ${u.count}</li>`).join("")}
      </ul>
    `;
  }
  if (upgrade) upgrade.toggleAttribute("disabled", roaches < 10);
}

if (button && output) {
  button.addEventListener("click", () => {
    button.classList.add("shake");
    button.addEventListener("animationend", () => {
      button.classList.remove("shake");
    }, { once: true });
    roaches++;
    refreshUI();
  });
}

if (upgrade && output) {
  upgrade.addEventListener("click", () => {
    if (roaches >= 10) {
      roaches -= 10;
      growth += 1;
      refreshUI();
    }
  });
}

let lastTime = 0;
function update(currentTime: number) {
  const elapsed = currentTime - lastTime;
  if (elapsed >= 1000) {
    const ticks = Math.floor(elapsed / 1000);
    roaches += getTotalGrowth() * ticks;
    lastTime += ticks * 1000;
    refreshUI();
  }
  requestAnimationFrame(update);
}
requestAnimationFrame(update);
