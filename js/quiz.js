var globalQuestions;
var rightAnswers = [];

var quizFinished = false;
var correctAnswerCount = 0;
var percentage = -1;
var averagePercent = -1;

var serverStatistics;
function initQuiz(){
  //Remove Information article
  var element = document.getElementById('information-quiz');
  element.parentNode.removeChild(element);

  //Get Questions
  fetchQuestions();
}

function fetchQuestions(){
  fetch("http://dev.byiconic.at:3000/questions").then (response => response.json())
  .then(function(data){
    globalQuestions = data;
    loadQuestions(data);
  })
  .catch( function (error) {
    console.error("error: " + error);
    document.getElementById('errorLoading').removeAttribute("hidden");
  });
}
function loadQuestions(questions) {
  console.log("loading questions");

  var fullOutput = "";
  for(let i = 0; i < 10; i++){
    var question = questions[i];
    rightAnswers.push(question.rightAnswer);

    var answerArr = [question.AnswerOne,
                     question.AnswerTwo,
                     question.AnswerThree,
                     question.AnswerFour];
    shuffle(answerArr);

    var output = "<article class=\"questionArticle\"><h5>Question No. "+(i+1)+"</h5><p class=\"question\">"+question.Question+"</p><label class=\"answerHead\">Ihre Antwort</label><select class=\"form-control\" id=\"answer"+(i+1)+"\"><option>Antwort auswählen. . .</option><option>"+answerArr[0]+"</option><option>"+answerArr[1]+"</option><option>"+answerArr[2]+"</option><option>"+answerArr[3]+"</option></select><p class=\"answerResponse\" id=\"response"+(i+1)+"\"></p></article>";
    fullOutput += output;
  }

  fullOutput += "<section><div class=\"container\"><div class=\"text-center\"><input id=\"submitButton\"type=\"submit\"value=\"CheckAnswers\"></div></div></section>"
  document.getElementById('questions').innerHTML = fullOutput;

  console.log("loaded questions");
}

function checkAnswers(){
  if(quizFinished){
    console.log("Quiz already done!");
    return;
  }

  console.log("checking answers");

  var selectedAnswer = "";

  for(let i = 0; i < 10; i++){
    var answerElem = document.getElementById("answer" + (i+1));
    if(answerElem.value == rightAnswers[i]){
      document.getElementById("response" + (i+1)).innerHTML = "Correct Answer!";
      correctAnswerCount++;
    }
    else {
      document.getElementById("response" + (i+1)).innerHTML = "Wrong answer! Right one is: " + rightAnswers[i];
    }
  }

  quizFinished = true;

  saveToServerAndShowResults();
}
function saveToServerAndShowResults(){
  //Get CurrentCount
  fetch("http://dev.byiconic.at:3000/info").then (response => response.json())
  .then( function(data){
    serverStatistics = data;
    updateCountsOnServer(data);
  })
  .catch( function (error){
    console.error("error: " + error);
  });
}
function updateCountsOnServer(current){
  var newInfo = current;

  newInfo.totalAnswers = current.totalAnswers + 10;
  newInfo.correctAnswers = current.correctAnswers + correctAnswerCount;

  serverStatistics = newInfo;
  averagePercent = (newInfo.correctAnswers / newInfo.totalAnswers) * 100;

  fetch('http://dev.byiconic.at:3000/info', {
    method: 'PUT', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newInfo),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Successfully updated values to:', data);
    showResults();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
function showResults(){
  ownPercentage = (correctAnswerCount / 10) * 100;

  console.log("own percentage: " +ownPercentage + "%");
  console.log("server average: " + averagePercent + "%");

  //Show own Result
  var statisticsOutput = "<article id=\"quizResult\" class=\"questionArticle\"><h5>Your Result</h5><p id=\"quizResultPercentageText\" class=\"question\">You reached "+ownPercentage+"%.</p></article>";


  var averageOutput = "<article id=\"quizAverage\" class=\"questionArticle\"><h5>Average of all users</h5><p class=\"question\">The average of correct answers of all users is "+averagePercent+"%.</p></article>";

  document.getElementById("innerContent").innerHTML = statisticsOutput + averageOutput;
}

function shuffle(array) {
    var ctr = array.length, temp, index;

    while (ctr-- > 0) {
        index = Math.floor(Math.random() * ctr);
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
    }
    return array;
}
