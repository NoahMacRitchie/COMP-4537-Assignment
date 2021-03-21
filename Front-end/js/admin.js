const post_question = async (question) => {

	const headers = {
		'Content-Type': 'application/json',
	  }
	let response = await axios.post('/questions', question, {headers: headers});
	return response;
}

const put_question = async (question) => {
	let response = await axios.put('/questions', question);
	return response;
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

const addQuestion = () => {
	const select = document.getElementById("num-answers");
	const numAnswers = select.value;
	// saveQuestions();
	post_question(createEmptyQuestion(numAnswers)).then(() => {console.log ("yayay");updateQuestions()});
};

const autoSave = () => {
	saveQuestions();
	let autoSaveDiv = document.getElementById("autoSave");
	autoSaveDiv.innerHTML = `Last saved on ${new Date().toLocaleString()}`
}

const saveQuestions = (ele) => {
	var str = ele.id;
	var questionID = str.match(/\d+/)[0];
	
	let question = document.getElementById("question" + questionID)
	let questionText = question.querySelector('.question-text');


	let answersQuery = question.querySelectorAll('.answer');
	let newQuestion = createEmptyQuestion(answersQuery.length);
	newQuestion.questionText = questionText.value;

	for (let j = 0; j < answersQuery.length; j++) {
		let answerText = answersQuery[j].querySelector('.answer-desc');
		let answerRadio = answersQuery[j].querySelector('.answer-radio');
		console.log(answerRadio.checked);
		newQuestion.answers[j].answerText = answerText.value;
		newQuestion.answers[j].isCorrect = answerRadio.checked;
	}
	newQuestion.id = questionID;
	put_question(newQuestion)

};


const updateQuestions = () => {
	get_question().then((questionsJSON) => {
		console.table(questionsJSON);
		const main = document.getElementById('main-content');
		main.innerHTML = '';
		const template = document.getElementById('template_question');

		let idCounter = 1;
		for (questionIndex in questionsJSON) {
			let questionData = questionsJSON[questionIndex];
			console.log(questionData)
			
			let uniqueId = 'question' + questionData.id;

			let clone = template.cloneNode(true);
			clone.setAttribute('id', uniqueId);

			main.appendChild(clone);
			let questionTitle = document.querySelector(`#${uniqueId} .question-title`);
			questionTitle.innerHTML = 'Question ' + idCounter + " " + uniqueId;
			let questionText = document.querySelector(`#${uniqueId} .question-text`);
			questionText.innerHTML = questionData.questionText;
			let saveBtn = document.querySelector(`#${uniqueId} .btn-save`);
			saveBtn.id = "save-" + questionData.id;
			let answersWrapper = document.querySelector(`#${uniqueId}`);
			for (answer_index in questionData.answers) {
				let answerData = questionData.answers[answer_index];

				let answerText = document.createElement("input");
				answerText.classList.add("answer-desc");
				answerText.type = "text";
				answerText.value = answerData.answerText;

				let answerRadio = document.createElement("input");
				answerRadio.classList.add("answer-radio");
				answerRadio.type = "radio";
				answerRadio.name = uniqueId + "-answer-text";
				answerRadio.checked = answerData.isCorrect;

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

updateQuestions();
get_question();

// autoSave();
// setInterval(autoSave, 2000);


