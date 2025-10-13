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
  {
    id: "egg",
    name: "Roach Egg",
    cost: 10,
    rate: 0.1,
    count: 0,
    description: "A tiny little rice grain.",
  },
  {
    id: "larva",
    name: "Roach Larva",
    cost: 10,
    rate: 1.0,
    count: 0,
    description: "Oh dear, the rice moves.",
  },
  {
    id: "hoard",
    name: "Roach Hoard",
    cost: 100,
    rate: 2.0,
    count: 0,
    description: "They begin to infest..",
  },
  {
    id: "nest",
    name: "Roach Nest",
    cost: 1000,
    rate: 50,
    count: 0,
    description: "You find them in every crevice.",
  },
  {
    id: "hive",
    name: "Roach Hive",
    cost: 5000,
    rate: 1000,
    count: 0,
    description: "They haunt your every waking moment.",
  },
  {
    id: "queen",
    name: "Roach Queen",
    cost: 10000,
    rate: 5000,
    count: 0,
    description: "You have accepted your fate. You live amongst them now.",
  },
];

const extraContainer = document.getElementById("extra-upgrades");
if (extraContainer) {
  availableItems.forEach((u) => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("upgrade-item");
    const btn = document.createElement("button");
    btn.id = `upgrade-${u.id}`;
    btn.textContent = `Buy ${u.name} (+${u.rate}/sec) — Cost: ${
      u.cost.toFixed(2)
    }`;
    btn.disabled = true;
    itemContainer.appendChild(btn);
    const desc = document.createElement("p");
    desc.classList.add("upgrade-desc");
    desc.textContent = u.description;
    itemContainer.appendChild(desc);
    extraContainer.appendChild(itemContainer);
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
