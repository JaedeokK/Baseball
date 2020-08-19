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

let numberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let theNumber = "";
let outCount = 0;

const countOpportunity = () => {
  opportunityPoint.innerText = Number(opportunityPoint.innerText) - 1;
};

const countOut = () => {
  outCount = 0;

  for (let i = 0; i < 3; ++i) {
    if (!theNumber.includes(userNumberBox.innerText[i])) {
      outCount += 1;
    }
  }
  if (outCount === 3) {
    outPoint.innerText = Number(outPoint.innerText) + 1;
  }
};

const countBall = () => {
  ballPoint.innerText = 0;
  for (let i = 0; i < 3; ++i) {
    if (theNumber.includes(userNumberBox.innerText[i])) {
      if (userNumberBox.innerText[i] !== theNumber[i]) {
        ballPoint.innerText = Number(ballPoint.innerText) + 1;
      }
    }
  }
};

const countStrike = () => {
  strikePoint.innerText = 0;
  for (let i = 0; i < 3; ++i) {
    if (userNumberBox.innerText[i] === theNumber[i]) {
      strikePoint.innerText = Number(strikePoint.innerText) + 1;
    }
  }
};

const getRandomInt = () => {
  theNumber = "";
  numberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (i = 0; i < 3; ++i) {
    const randomIndex = Math.floor(Math.random() * numberArr.length);
    const randomNumber = numberArr[randomIndex];
    numberArr = numberArr.filter((item) => item !== randomNumber);

    theNumber += randomNumber;
  }
  if (theNumber < 100) {
    getRandomInt();
  }
};

const handleAlert = () => {
  if (Number(strikePoint.innerText) === 3) {
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

const handleCount = () => {
  countStrike();
  countBall();
  countOut();
  countOpportunity();
};

const compareNumber = (userNumber) => {
  userNumberBox.innerText = userNumber;
  if (theNumber === "") {
    getRandomInt();
    randomNumberBox.innerText = "???";
  }
  handleCount();
  handleAlert();
};

const checkDigit = () => {
  const value = input.value;
  if (value.length === 3) {
    compareNumber(value);
  } else {
    alert("3자리 숫자가 아닙니다!");
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  checkDigit();
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
