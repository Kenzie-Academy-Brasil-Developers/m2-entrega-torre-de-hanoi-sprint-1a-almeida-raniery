const instrucoesCollapse = document.getElementById("instrucoes");
const collapseArrow = document.getElementById("collapseArrow");
const painelCtrl = document.getElementById("painelCtrl");

collapseArrow.addEventListener("click", () => {
  const pointer = collapseArrow.querySelector(".fas");
  if (instrucoesCollapse.classList.contains("collapse")) {
    instrucoesCollapse.classList.remove("collapse");
    pointer.classList.add("fa-chevron-up");
  } else {
    instrucoesCollapse.classList.add("collapse");
    pointer.classList.remove("fa-chevron-up");
  }
});

painelCtrl.addEventListener("click", (event) => {
  if (event.target.id === "resetBtn") {
    const gameState = JSON.parse(localStorage.gameState);
    initGame(gameState);
    updateGameHeader(gameState);
  }
});

painelCtrl.addEventListener("change", (event) => {
  if (event.target.id === "selectDificuldade") {
    const select = event.target;
    const gameState = JSON.parse(localStorage.gameState);

    gameState.alturaMaxima = 3 + parseInt(select.value);
    localStorage.setItem("gameState", JSON.stringify(gameState));

    esconderFlavorText();
    initGame(gameState);
    updateGameHeader(gameState);
  }
});
