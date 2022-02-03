window.onload = initGame;

function initGame() {
  const gameState = {
    torreAlvoId: "torreAzul",
    torreInicialId: "torreAmarelo",
    alturaMaxima: 3,
    turnos: 0,
  };

  const coresBola = ["Rosa", "Roxa", "Baunilha"];
  const coresCone = ["Rosa", "Amarelo", "Azul"];
  const gameContainer = document.getElementById("gameContainer");

  criarTorres(gameState.alturaMaxima, coresCone, gameContainer);
  criarBolas(
    gameState.alturaMaxima,
    coresBola,
    document.getElementById("torreAmarelo")
  );

  gameContainer.addEventListener("click", handleClicks);
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

    bola.style.width = `${90 - i * 12}px`;
    bola.id = "bola" + cores[i];
    bola.src = "/imagens/Bola-" + cores[i] + ".svg";

    bola.classList.add("bola");

    parent.appendChild(bola);
  }
}

function handleClicks(event) {
  const gameState = JSON.parse(event.currentTarget.dataset.state);
  const torreTarget = event.target.closest("div.torre");
  const select = document.querySelector(".selected");
  const torreTopo = torreTarget.lastChild;

  if (!select && torreTopo.classList.contains("bola")) {
    torreTarget.classList.add("selected");
  } else if (select) {
    moverBola(select.lastChild, torreTarget, gameState);
    select.classList.remove("selected");
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
  }
}

function updateGameHeader({ alturaMaxima, torreAlvoId }) {
  if (vitoriaAlcancada(torreAlvoId, alturaMaxima)) {
    mostrarMensagemVitoria();
  }
}

function vitoriaAlcancada(torreAlvoId, alturaMaxima) {
  const targetTorre = document.getElementById(torreAlvoId);
  const bolas = targetTorre.querySelectorAll(".bola");

  return bolas.length === alturaMaxima;
}

function mostrarMensagemVitoria() {
  const gameHeaderMessage = document.getElementById("gameHeaderMessage");

  gameHeaderMessage.innerText = "Parabéns!";
}
