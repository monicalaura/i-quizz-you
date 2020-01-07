// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeEstim = document.getElementById("timeEstim");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("score");

//array of questions

let questions = [
  {
    question:" Which HTML tag is used to define a Client-Side Script such as Javascript?",
    imgSrc: "img/html.png",
    choiceA: "unscript",
    choiceB: "script",
    choiceC: "None of these",
    correct: "B"

},
{
  question:"In CSS, which property is used to change the background color?",
  imgSrc: "img/css.png",
  choiceA: "bgcolor:",
  choiceB: "background-color:",
  choiceC: "color:",
  correct: "B"

},
{
  question:"Which types of image maps can be used with JavaScript?",
  imgSrc: "img/js.jpg",
  choiceA: "Client-side image maps",
  choiceB: "Server-side image maps",
  choiceC: "None Of The Above",
  correct: "A"

},
{
  question:"What is state in React?",
  imgSrc: "img/react.jpg",
  choiceA: "A persistant storage",
  choiceB: "An internal data store (object) of a component",
  choiceC: "None Of The Above",
  correct: "B"

}
];

const lastQuestion = questions.length-1;
let currentQuestion = 0;
let count = 0;
const qTime = 10; //question time: 10 sec for each question
const estimWidth = 150; //the width of the estimTime bar
const estimUnit = estimWidth/qTime;
let score = 0;

// render a question

function renderQuestion(){
  let q = questions[currentQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  qImg.innerHTML = "<img src="+ q.imgSrc +">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

//Start Quiz button event
start.addEventListener('click', startQuiz);

//start quiz function
function startQuiz(){

  //hide the start button
  start.style.display = 'none';
  //render the question
  renderQuestion();
  //show the quiz at the UI
  quiz.style.display = 'block';
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000); //render the counter every one second

}

//check answer
function checkAnswer(answer){
  if(answer === questions[currentQuestion].correct){
   score++;
   //correct answer
   //change the progress color to green
   correctAnswer();
  }
  else{
    //answer is wrong
    //change the progress color to red
    wrongAnswer();
  }
  count = 0;

  if(currentQuestion < lastQuestion){
    currentQuestion++;
    renderQuestion();
  }
  else{
    //end quiz and show score
    clearInterval(TIMER);
    scoreRender();
  }

}

//wrong answer
function wrongAnswer(){
  document.getElementById(currentQuestion).style.backgroundColor="#ED213A";

}

//correct answer
function correctAnswer(){
document.getElementById(currentQuestion).style.backgroundColor="#0f9b0f";
}


//render progress
function renderProgress(){
  for(let i=0; i<= lastQuestion; i++){
    progress.innerHTML += "<div class='prog-circle' id=" + i + "></div>"
  }
}

//counter render
function renderCounter(){

  if(count <= qTime){
   counter.innerHTML = count;
   timeEstim.style.width = estimUnit * count + "px";
   count++;
  }
  else{
    count = 0;
    if(currentQuestion < lastQuestion){
      currentQuestion++;
      renderQuestion();
    }
    else{
      //end quiz and show score
      clearInterval(TIMER);
      scoreRender();
    }

  }
}

 //score render
  function scoreRender(){
    quiz.style.display = "none";
    scoreDiv.style.display = "block";
    //calculate the percentage of the correct/wrong answers
    const scorePercentage = Math.round(100 * score/questions.length);

    //select the icon to show, based on the score
    let icon = (scorePercentage >= 80) ? "img/happy.png" :
               (scorePercentage >= 60) ? "img/smile.png" :
               (scorePercentage >= 40) ? "img/straight.png" :
               (scorePercentage >= 20) ? "img/sad-light.png" :
                "img/sad.png";
    //show the score image and image at UI
      scoreDiv.innerHTML = "Your Score:<br><br><img src="+ icon +">";
      scoreDiv.innerHTML += "<p>" + scorePercentage + "% </p>";
  }
