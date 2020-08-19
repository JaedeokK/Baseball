const form = document.querySelector(".form-js");
const input = document.querySelector(".input-js");
const userNumberBox = document.querySelector(".user-number-js");
const randomNumberBox = document.querySelector(".random-number-js");
const strikePoint = document.querySelector(".strike-point-js");
const ballPoint = document.querySelector(".ball-point-js");
const outPoint = document.querySelector(".out-point-js");
const opportunityPoint = document.querySelector(".opportunity-point-js");
const ruleBtn = document.querySelector(".rule-js");
const modal = document.querySelector(".modal-js");
const closeBtn = document.querySelector("#closeBtn");

//random number생성을 위한 array
let numberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//게임 시작 시 생성 될 number
let theNumber = "";
//3 outCount = 1 out
let outCount = 0;

const countOpportunity = () => {
  opportunityPoint.innerText = +opportunityPoint.innerText - 1;
};

//같은 숫자가 하나도 안나온 경우
const countOut = () => {
  //이전 연산 초기화
  outCount = 0;

  for (let i = 0; i < 3; ++i) {
    if (!theNumber.includes(userNumberBox.innerText[i])) {
      outCount += 1;
    }
  }
  //맞는 숫자가 아예 없는 경우 out + 1
  if (outCount === 3) {
    outPoint.innerText = +outPoint.innerText + 1;
  }
};

const countBall = () => {
  ballPoint.innerText = 0;
  for (let i = 0; i < 3; ++i) {
    //같은 숫자가 다른 위치에 오는 경우
    if (theNumber.includes(userNumberBox.innerText[i])) {
      if (userNumberBox.innerText[i] !== theNumber[i]) {
        ballPoint.innerText = +ballPoint.innerText + 1;
      }
    }
  }
};

const countStrike = () => {
  strikePoint.innerText = 0;
  for (let i = 0; i < 3; ++i) {
    //같은 숫자가 같은 위치에 오는 경우
    if (userNumberBox.innerText[i] === theNumber[i]) {
      strikePoint.innerText = +strikePoint.innerText + 1;
    }
  }
};

const getRandomInt = () => {
  //이전 연산 초기화
  theNumber = "";
  numberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (i = 0; i < 3; ++i) {
    //0~10의 rnadomIndex
    const randomIndex = Math.floor(Math.random() * numberArr.length);
    const randomNumber = numberArr[randomIndex];
    //중복 숫자 제거
    numberArr = numberArr.filter((item) => item !== randomNumber);

    theNumber += randomNumber;
  }
  //앞자리가 0이 나올 경우 함수 재실행
  if (theNumber < 100) {
    getRandomInt();
  }
};

const handleAlert = () => {
  if (+strikePoint.innerText === 3) {
    alert("🎉🎉이겼습니다!!🎉🎉");
    location.reload();
  } else if (+outPoint.innerText === 3 || +opportunityPoint.innerText === 0) {
    alert("졌습니다!!");
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
  //submit할떄 refresh 방지
  event.preventDefault();
  checkDigit();
};

const inputNumber = () => {
  form.addEventListener("submit", handleSubmit);
};

////////////modal code////////////////////////

//display 옵션에 opacity transition 추가
const closeRule = () => {
  modal.classList.remove("opacity");
  modal.addEventListener("transitionend", () => {
    modal.classList.remove("show");
  });
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
  handleRule();
  inputNumber();
};
init();
