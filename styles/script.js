const assets = [
  {
    id: 1,
    name: "batu",
    imageUrl: "assets/game/batu.png",
  },
  {
    id: 2,
    name: "kertas",
    imageUrl: "assets/game/kertas.png",
  },
  {
    id: 3,
    name: "gunting",
    imageUrl: "assets/game/gunting.png",
  },
];

const COM_WIN = "COM WIN";
const PLAYER_WIN = "PLAYER WIN";
const DRAW = "DRAW";

const gameSection = document.getElementById("theGame");
const player = gameSection.querySelector(".player");
const computer = gameSection.querySelector(".computer");
const result = gameSection.querySelector(".result");

const generateChoice = (user) => {
  const title = document.createElement("span");
  title.append(document.createTextNode(user.getAttribute("id")));
  user.append(title);
  assets.forEach((item) => {
    const choice = document.createElement("div");
    choice.setAttribute(
      "class",
      `${item.name} choice d-flex align-items-center justify-content-center`
    );
    const img = document.createElement("img");
    img.setAttribute("src", item.imageUrl);
    choice.append(img);
    user.append(choice);
  });
};

const getResult = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) return "draw";
  if (playerChoice === "batu")
    return computerChoice === "kertas" ? COM_WIN : PLAYER_WIN;
  if (playerChoice === "kertas")
    return computerChoice === "gunting" ? COM_WIN : PLAYER_WIN;
  if (playerChoice === "gunting")
    return computerChoice === "batu" ? COM_WIN : PLAYER_WIN;
};

const getComputerChoice = () => {
  const number = Math.random();
  if (number < 0.33) return "batu";
  if (number < 0.63) return "kertas";
  return "gunting";
};

const removeEvent = () => {
  const refreshPage = document.querySelector("div#refresh");
  const computerChoice = computer.querySelectorAll(".choice");
  let i = 0;
  playerChoice.forEach((item) => {
    item.classList.add("removeEvent");
    computerChoice[i++].classList.add("removeEvent");
  });
  refreshPage.classList.add("refresh");
};

generateChoice(player);
generateChoice(computer);

const playerChoice = player.querySelectorAll(".choice");

playerChoice.forEach((item) => {
  item.addEventListener("click", () => {
    const comp = getComputerChoice();
    const compLocation = computer.querySelector(`div .${comp}`);

    compLocation.classList.add("choiced");
    item.classList.add("choiced");

    result.classList.add("gameResult");
    const hasil = getResult(item.classList[0], comp);
    result.innerHTML = hasil;

    removeEvent();
  });
});

refresh.addEventListener("click", () => {
  window.location.reload();
});
