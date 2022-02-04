window.onload = loadGame;

function loadGame() {
  const gameStateString = localStorage.getItem("gameState");

  const gameState = !gameStateString
    ? newGameState()
    : JSON.parse(gameStateString);

  initGame(gameState);
}

function initGame(gameState) {
  const coresBola = ["Chocolate", "Rosa", "Baunilha", "Roxa", "Verde"];
  const coresCone = ["Rosa", "Amarelo", "Azul"];
  const gameContainer = document.getElementById("gameContainer");
  const displayTurnos = document.getElementById("displayTurnos");

  gameContainer.innerHTML = "";
  displayTurnos.innerText = "Turnos: 0";

  criarTorres(3, coresCone, gameContainer);
  criarBolas(
    gameState.alturaMaxima,
    coresBola,
    document.getElementById("torreAmarelo")
  );

  gameContainer.addEventListener("click", handleGameClicks);
  gameContainer.addEventListener("resetGame", () => console.log("dun"));
  gameContainer.setAttribute("data-state", JSON.stringify(gameState));
}

function criarTorres(quant, cores, parent = document.body) {
  for (i = 0; i < quant; i++) {
    const torreContainer = document.createElement("div");
    const cone = document.createElement("img");

    cone.classList.add("cone");
    torreContainer.classList.add("torre");

    cone.src = "/imagens/Cone-" + cores[i] + ".svg";
    torreContainer.id = "torre" + cores[i];

    torreContainer.appendChild(cone);
    parent.appendChild(torreContainer);
  }
}

function criarBolas(quant, cores, parent = document.body) {
  for (i = 0; i < quant; i++) {
    const bola = document.createElement("img");

    bola.style.width = `${95 - i * 12}px`;
    bola.id = "bola" + cores[i];
    bola.src = "/imagens/Bola-" + cores[i] + ".svg";

    bola.classList.add("bola");

    parent.appendChild(bola);
  }
}

function handleGameClicks(event) {
  const currentState = JSON.parse(event.currentTarget.dataset.state);
  const torreTarget = event.target.closest("div.torre");
  const select = document.querySelector(".selected");
  const displayTurnos = document.getElementById("displayTurnos");
  const torreTopo = torreTarget.lastChild;

  esconderFlavorText();

  if (!select && torreTopo.classList.contains("bola")) {
    torreTarget.classList.add("selected");
  } else if (select) {
    moverBola(select.lastChild, torreTarget, currentState);

    select.classList.remove("selected");

    event.currentTarget.dataset.state = JSON.stringify(currentState);
    displayTurnos.innerText = "Turnos: " + currentState.turnos;
  }
}

function moverBola(bola, torre, gameState) {
  const torreTopo = torre.lastChild;
  const widthBola = parseInt(bola.style.width);

  const widthTopo = torreTopo.classList.contains("bola")
    ? parseInt(torreTopo.style.width)
    : 999;

  if (widthBola < widthTopo) {
    torre.appendChild(bola);
    updateGameHeader(gameState);
    gameState.turnos++;
  }
}

function updateGameHeader({ alturaMaxima, torreAlvoId, turnos }) {
  const gameHeaderMessage = document.getElementById("gameHeaderMessage");
  const targetTorre = document.getElementById(torreAlvoId);
  const bolas = targetTorre.querySelectorAll(".bola");

  if (bolas.length === alturaMaxima) {
    gameHeaderMessage.innerText = "Conseguiu!";
  } else if (targetTorre.lastChild.id === "bolaChocolate") {
    gameHeaderMessage.innerText = "Um já foi!";
  } else if (bolas.length === alturaMaxima - 1) {
    gameHeaderMessage.innerText = "Quase lá!";
  } else if (bolas.length > 2) {
    gameHeaderMessage.innerText = "Continua!";
  } else if (turnos === 0) {
    gameHeaderMessage.innerText = "Vamos lá!";
  }
}

function newGameState(
  dificuldade = 0,
  alvoId = "torreAzul",
  inicialId = "torreRosa"
) {
  const newState = {
    torreAlvoId: alvoId,
    torreInicialId: inicialId,
    alturaMaxima: 3 + dificuldade,
    turnos: 0,
  };

  window.localStorage.setItem("gameState", JSON.stringify(newState));

  return newState;
}

function esconderFlavorText() {
  const flavorText = document.getElementById("flavorText");
  const gameHeaderMessage = document.getElementById("gameHeaderMessage");

  if (!flavorText.classList.contains("collapse")) {
    flavorText.classList.add("collapse");
    gameHeaderMessage.innerText = "Vamos lá!";
  }
}
