class Question {
    constructor(questionText, answersArray, id) {
        this.questionText = questionText;
        this.answers = answersArray;
        this.id = id;
    }
}

// Creates and returns an empty question with 4 empty answers
function createEmptyQuestion(numAnswers) {
    let answers = [];
    
    for (let i = 0; i < numAnswers; i++) {
        let emptyAnswer = { answerText : "", isCorrect : false };
        answers.push(emptyAnswer);
    }
    
    return new Question("", answers, null);
}