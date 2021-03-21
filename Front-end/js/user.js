const colorSyntax = (string) => {
	let coloredString = string;
	let syntaxChars = ["/", "=", "let", "const", "{", "}", "(", ")", "+", "for", "var", "*", "-"];
	for (let i = 0; i < syntaxChars.length; i++) {
		coloredString = coloredString.replaceAll(syntaxChars[i], ('<dummyElement>' + syntaxChars[i] + '</span>'));
	}
	coloredString = coloredString.replaceAll('<dummyElement>', '<span class="syntax">')
	return coloredString;
}
const get_question = async (question) => {

	const headers = {
		'Content-Type': 'application/json',
	  }
	return axios.get('/questions').then((res) => {
		console.log(res.data)
		return res.data;
	})
	
}

const updateQuestions = () => {
	get_question().then((questionsJSON) => {
	
		const main = document.getElementById('main-content');
		main.innerHTML = '';
		const template = document.getElementById('template_question');

		let idCounter = 1;
		for (questionIndex in questionsJSON) {
			let questionData = questionsJSON[questionIndex];
			let uniqueId = 'question' + idCounter;

			let clone = template.cloneNode(true);
			clone.setAttribute('id', uniqueId);

			main.appendChild(clone);
			let questionTitle = document.querySelector(`#${uniqueId} .question-title`);
			questionTitle.innerHTML = 'Question ' + idCounter;
			questionTitle.set
			let questionText = document.querySelector(`#${uniqueId} .question-text`);
			questionText.innerHTML = colorSyntax(questionData.questionText);

			let answersWrapper = document.querySelector(`#${uniqueId}`);
			for (answer_index in questionData.answers) {
				let answerData = questionData.answers[answer_index];

				let answerText = document.createElement("span");
				answerText.classList.add("answer-desc");
				answerText.type = "text";
				answerText.innerHTML = colorSyntax(answerData.answerText);

				let answerRadio = document.createElement("input");
				answerRadio.classList.add("answer-radio");
				answerRadio.type = "radio";
				answerRadio.name = uniqueId + "-answer-text";

				let answerDiv = document.createElement("div");
				answerDiv.classList.add("answer");
				answerDiv.appendChild(answerRadio);
				answerDiv.appendChild(answerText);

				answersWrapper.appendChild(answerDiv);
			}

			idCounter++;
		}
	})
};

const gradeQuestions = () => {
	let questions = document.querySelectorAll(`.question-wrapper`);
	let score = 0;
	get_question().then((questionsBank) => {

		for (let i = 1; i < questions.length; i++) {
			let questionFromBank = questionsBank[i - 1];

			let answersQuery = questions[i].querySelectorAll('.answer');
			for (let j = 0; j < answersQuery.length; j++) {
				let answerText = answersQuery[j].querySelector('.answer-desc');
				let answerRadio = answersQuery[j].querySelector('.answer-radio');
				answerText.classList.remove('wrong');
				answerText.classList.remove('correct');
				if (questionFromBank.answers[j].isCorrect && answerRadio.checked) {
					score++;
				}
				if (answerRadio.checked) {
					answerText.classList.add('wrong');
				}
				if (questionFromBank.answers[j].isCorrect) {
					answerText.classList.add('correct');
				}
			}
		}

		// -1 to account for template question ;-)
		displayScore(score, questions.length - 1);
	})
};

const displayScore = (achieved, maximum) => {
	let scoreDiv = document.getElementById('score');
	scoreDiv.innerHTML = `You got ${achieved} out of ${maximum}`;
};

updateQuestions();