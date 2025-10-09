import "./style.css";

document.body.innerHTML = `
  <h1> Roachfiestation </h1>
  <button id = "button">🪳</button>
  
  <div id = "output"></div>
`;

const button = document.getElementById("button");

if (button) {
  button.addEventListener("click", () => {
    console.log("temp");
  });
}
