window.onload = initGame;

function initGame() {
  const coresBola = ["Rosa", "Roxa", "Baunilha"];
  const coresCone = ["Rosa", "Amarelo", "Azul"];
  const gameContainer = document.getElementById("gameContainer");

  criarTorres(3, coresCone, gameContainer);
  criarBolas(3, coresBola, document.getElementById("torreRosa"));

  gameContainer.addEventListener("click", handleClicks);
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

    bola.classList.add("bola");
    bola.style.width = `${90 - i * 12}px`;

    bola.id = "bola" + cores[i];
    bola.src = "/imagens/Bola-" + cores[i] + ".svg";

    parent.appendChild(bola);
  }
}

function handleClicks(event) {
  const torreTarget = event.target.closest("div.torre");
  const select = document.querySelector(".selected");
  const torreTopo = torreTarget.lastChild;

  if (!select && torreTopo.classList.contains("bola")) {
    torreTarget.classList.add("selected");
  } else if (select) {
    moverBola(select.lastChild, torreTarget);
    select.classList.remove("selected");
  }
}

function moverBola(bola, torre) {
  const torreTopo = torre.lastChild;
  const widthBola = parseInt(bola.style.width);

  const widthTopo = torreTopo.classList.contains("bola")
    ? parseInt(torreTopo.style.width)
    : 999;

  if (widthBola < widthTopo) {
    torre.appendChild(bola);
  }
}
