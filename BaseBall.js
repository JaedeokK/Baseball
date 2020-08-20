const form = document.querySelector(".form-js"),
  input = document.querySelector(".input-js");
const userNumberBox = document.querySelector(".user-number-js"),
  randomNumberBox = document.querySelector(".random-number-js");
const strikePoint = document.querySelector(".strike-point-js"),
  ballPoint = document.querySelector(".ball-point-js"),
  outPoint = document.querySelector(".out-point-js"),
  opportunityPoint = document.querySelector(".opportunity-point-js");
const ruleBtn = document.querySelector(".rule-js"),
  modal = document.querySelector(".modal-js"),
  closeBtn = document.querySelector("#closeBtn");
const modalContent = document.querySelector("#modal-content-js");

let numberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let theNumber = "";
let outCount = 0;
const INPUT_NUMBER_LENGTH = 3;

input.placeholder = `${INPUT_NUMBER_LENGTH}자리 숫자를 입력해 주세요`;

modalContent.innerText = `
입력란에 0에서 9로 이루어진 ${INPUT_NUMBER_LENGTH}자리 숫자를 입력합니다
\n\
  Enter키 혹은 click버튼을 누루면 the number란에 \n\
  0에서 9사이의 서로 다른 수로 이루어진 ${INPUT_NUMBER_LENGTH}자리 수가 무작위로 만들어집니다
\n\
  입력한 숫자 각각의 자릿수를 the number와 비교하여 \n\
  숫자와 위치가 모두 같으면 Strike, \n\
  숫자는 같지만 위치가 다르면 Ball, \n\
  같은 숫자가 하나도 없으면 Out이 카운트 됩니다.
\n\
  기회는 총 10번 주어지며 \n\
  주어진 기회를 모두 소진하거나 3 Out이 되면 패배하며 \n\
  그 전에 숫자를 정확하게 맞춰 ${INPUT_NUMBER_LENGTH} Strike가 되면 승리합니다.`;

const countOpportunity = () => {
  opportunityPoint.innerText = Number(opportunityPoint.innerText) - 1;
};

const countOut = (n) => {
  outCount = 0;

  for (let i = 0; i < n; ++i) {
    if (!theNumber.includes(userNumberBox.innerText[i])) {
      outCount += 1;
    }
  }
  if (outCount === 3) {
    outPoint.innerText = Number(outPoint.innerText) + 1;
  }
};

const countBall = (n) => {
  ballPoint.innerText = 0;
  for (let i = 0; i < n; ++i) {
    if (theNumber.includes(userNumberBox.innerText[i])) {
      if (userNumberBox.innerText[i] !== theNumber[i]) {
        ballPoint.innerText = Number(ballPoint.innerText) + 1;
      }
    }
  }
};

const countStrike = (n) => {
  strikePoint.innerText = 0;
  for (let i = 0; i < n; ++i) {
    if (userNumberBox.innerText[i] === theNumber[i]) {
      strikePoint.innerText = Number(strikePoint.innerText) + 1;
    }
  }
};

const getRandomInt = (n) => {
  theNumber = "";
  numberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (i = 0; i < n; ++i) {
    const randomIndex = Math.floor(Math.random() * numberArr.length);
    const randomNumber = numberArr[randomIndex];
    numberArr = numberArr.filter((item) => item !== randomNumber);

    theNumber += randomNumber;
  }
  if (theNumber < 100) {
    getRandomInt(INPUT_NUMBER_LENGTH);
  }
};

const handleAlert = (n) => {
  if (Number(strikePoint.innerText) === n) {
    alert("🎉🎉이겼습니다!!🎉🎉");
    location.reload();
  } else if (
    Number(outPoint.innerText) === 3 ||
    Number(opportunityPoint.innerText) === 0
  ) {
    alert("😭😭졌습니다!!😭😭");
    location.reload();
  }
};

const handleCount = (n) => {
  countStrike(n);
  countBall(n);
  countOut(n);
  countOpportunity(n);
};

const compareNumber = (userNumber) => {
  userNumberBox.innerText = userNumber;
  if (theNumber === "") {
    getRandomInt(INPUT_NUMBER_LENGTH);
    randomNumberBox.innerText = "?".repeat(INPUT_NUMBER_LENGTH);
  }
  handleCount(INPUT_NUMBER_LENGTH);
  handleAlert(INPUT_NUMBER_LENGTH);
};

const checkDigit = (n) => {
  const value = input.value;
  if (value.length === n) {
    compareNumber(value);
  } else {
    alert(`${n}자리 숫자가 아닙니다!`);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  checkDigit(INPUT_NUMBER_LENGTH);
};

const inputNumber = () => {
  form.addEventListener("submit", handleSubmit);
};

////////////modal code////////////////////////

const closeRule = () => {
  modal.classList.remove("opacity");
  modal.addEventListener(
    "transitionend",
    () => {
      modal.classList.remove("show");
    },
    { once: true }
  );
};

const showRule = () => {
  modal.classList.add("show");
  setTimeout(() => {
    modal.classList.add("opacity");
  }, 20);
};

const handleRule = () => {
  ruleBtn.addEventListener("click", showRule);
  closeBtn.addEventListener("click", closeRule);
};

//////////////////////////////////////////////

const init = () => {
  inputNumber();
  handleRule();
};
init();
