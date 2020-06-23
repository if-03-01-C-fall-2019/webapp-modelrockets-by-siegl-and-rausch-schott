class ElementCreator{

  //
  // 1) Creates the article for a question.
  // 2) Creates the "CheckAnswers" Button
  // 3) Creates the article for the own result
  // 4) Creates the article for the average result
  // 5) Creates a basic table element for the incorrect answers
  // 6) Creates the top row for the mentioned table
  // 7) Creates a row for the mentioned table
  //
  static createQuestionArticle(question, answerArr, i){
    let result = document.createElement("article");
    result.setAttribute("class", "questionArticle")

    let heading = document.createElement("h5");
    heading.textContent = "Question No. " + (i+1);

    let questionP = document.createElement("p");
    questionP.setAttribute("class", "question");
    questionP.innerText = question.Question;

    let label = document.createElement("label");
    label.setAttribute("class", "answerHead");
    label.innerText = "Your Answer";

    let select = document.createElement("select");
    select.setAttribute("class", "form-control answerSelection");
    select.setAttribute("id", "answer"+(i+1));

    let option1 = document.createElement("option");
    option1.innerText = "Choose Your Answer. . .";

    let option2 = document.createElement("option");
    option2.innerText = answerArr[0];

    let option3 = document.createElement("option");
    option3.innerText = answerArr[1];

    let option4 = document.createElement("option");
    option4.innerText = answerArr[2];

    let option5 = document.createElement("option");
    option5.innerText = answerArr[3];


    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    select.appendChild(option4);
    select.appendChild(option5);

    result.appendChild(heading);
    result.appendChild(questionP);
    result.appendChild(label);
    result.appendChild(select);

    return result;
  }
  static createCheckAnswersBtn(){
    let result = document.createElement("section");

    let div1 = document.createElement("div");
    div1.setAttribute("class", "container");

    let div2 = document.createElement("div");
    div2.setAttribute("class", "text-center");

    let input = document.createElement("input");
    input.setAttribute("id", "submitButton");
    input.setAttribute("type", "submit");
    input.setAttribute("value", "CheckAnswers");

    div2.appendChild(input);
    div1.appendChild(div2);
    result.appendChild(div1);

    return result;
  }
  static createOwnResultArticle(percent){
    let result = document.createElement("article");
    result.setAttribute("id", "quizResult");
    result.setAttribute("class", "questionArticle");

    let heading = document.createElement("h5");
    heading.innerText = "Your Result";

    let resultP = document.createElement("p");
    resultP.setAttribute("id", "quizResultPercentageText");
    resultP.setAttribute("class", "question");
    resultP.innerText = "You reached "+percent+"%.";

    result.appendChild(heading);
    result.appendChild(resultP);

    return result;
  }
  static createAverageResultArticle(percent){
    let result = document.createElement("article");
    result.setAttribute("id", "quizAverage");
    result.setAttribute("class", "questionArticle");

    let heading = document.createElement("h5");
    heading.innerText = "Average of all users";

    let resultP = document.createElement("p");
    resultP.setAttribute("class", "question");
    resultP.innerText = "The average of correct answers of all users is "+percent+"%.";

    result.appendChild(heading);
    result.appendChild(resultP);

    return result;
  }
  static createAnswerTable(){
    let result = document.createElement("table");
    result.setAttribute("class", "answersTable");

    return result;
  }
  static createAnswerTableTopRow(){
    let result = document.createElement("tr");
    let col1 = document.createElement("th");
    let col2 = document.createElement("th");
    let col3 = document.createElement("th");

    col1.innerText = "Question";
    col1.setAttribute("class", "answersTable");
    col2.innerText = "Your Answer";
    col2.setAttribute("class", "answersTable");
    col3.innerText = "Correct Answer";
    col3.setAttribute("class", "answersTable");

    result.setAttribute("class", "answersTable");

    result.appendChild(col1);
    result.appendChild(col2);
    result.appendChild(col3);

    return result;
  }
  static createAnswerTableRow(question, answer, rightAnswer){
    let result = document.createElement("tr");
    let col1 = document.createElement("td");
    let col2 = document.createElement("td");
    let col3 = document.createElement("td");

    col1.innerText = question;
    col1.setAttribute("class", "answersTable");
    col2.innerText = answer;
    col2.setAttribute("class", "answersTable");
    col3.innerText = rightAnswer;
    col3.setAttribute("class", "answersTable");

    result.setAttribute("class", "answersTable");

    result.appendChild(col1);
    result.appendChild(col2);
    result.appendChild(col3);

    return result;
  }

}
