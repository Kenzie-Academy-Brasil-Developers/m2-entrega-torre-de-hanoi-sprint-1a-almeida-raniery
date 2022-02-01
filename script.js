window.onload = initGame;

function initGame() {
  const coresBola = ["Rosa", "Roxa", "Baunilha"];
  const coresCone = ["Rosa", "Amarelo", "Azul"];
  const gameContainter = document.getElementById("gameContainer");

  for (i = 0; i < 3; i++) {
    const torreContainer = document.createElement("div");
    const cone = document.createElement("img");

    cone.classList.add("cone");
    torreContainer.classList.add("torre");

    cone.src = "/imagens/Cone-" + coresCone[i] + ".svg";
    torreContainer.id = "torre" + coresCone[i];

    gameContainter.appendChild(torreContainer);
    gameContainter.appendChild(cone);
  }
}
