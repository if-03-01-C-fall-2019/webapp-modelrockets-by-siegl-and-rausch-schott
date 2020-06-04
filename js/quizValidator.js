class QuizValidator {

  static validate(rightAnswers) {
    let result = 0;

    for(let i = 0; i < 10; i++){
      let answerElem = document.getElementById("answer" + (i+1));
      if(answerElem.value == rightAnswers[i]){
        result++;
      }
    }

    return result;
  }

}
