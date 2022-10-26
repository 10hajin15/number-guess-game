let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = []

playButton.addEventListener("click", play); //함수도 매개변수로 넘길 수 있다.
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus",function(){
  userInput.value = "";
})

//랜덤번호 지정
function pickRandomNumber(){
  computerNum = Math.floor(Math.random()*100)+1;
  console.log("정답",computerNum);
}

function play(){
  let userValue = userInput.value;

  //유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
  if(userValue<1||userValue>100){
    resultArea.textContent="1과 100사이 숫자를 입력해 주세요";
    return;
  }

  //유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깎지 않는다.
  if(history.includes(userValue)){
    resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력하세요.";
    return;
  }

  chances--;
  chanceArea.textContent=`남은 기회: ${chances}번`;

  //만약 유저가 랜덤번호를 맞추면, 맞췄습니다!
  //랜덤번호 < 유저번호, Down!!
  //랜덤번호 > 유저번호, Up!!
  if(userValue < computerNum){
    resultArea.textContent = "Up!"
  } else if(userValue > computerNum){
    resultArea.textContent = "Down!"
  } else{
    resultArea.textContent = "맞췄습니다*o*"
    gaameOver = true;
  }

  history.push(userValue);

  if(chances < 1){
    gameOver = true;
  }
  
  //5번의 기회를 다 쓰면 게임이 끝난다. (더 이상 추측 불가, 버튼 비활성화)
  if(gameOver==true){
    playButton.disabled = true;
  }
}

//Reset 버튼을 누르면 게임이 리셋
function reset(){
  chances=5;
  chanceArea.textContent=`남은 기회: ${chances}번`;
  //user input 창이 깨끗하게 정리
  userInput.value = "";
  //새로운 번호가 생성
  pickRandomNumber();
  //결과 초기화
  resultArea.textContent="결과 값이 여기 나옵니다."
  //Go 버튼 활성화
  gameOver = false;
  playButton.disabled = false;
  //유저가 입력한 값 리셋
  history=[]
}

pickRandomNumber();