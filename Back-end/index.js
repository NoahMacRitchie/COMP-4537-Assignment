const url = require('url');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'us-cdbr-east-03.cleardb.com',
      user : 'bc3699f7355530',
      password : '7fa8619b',
      database : 'heroku_fc6cdbfbf539248'
    }
});

const PORT = process.env.PORT || 5000;

async function setupDb() {
    await knex.schema.createTable('questions', function(table) {
        table.increments('id').primary();
        table.string('text');
    }).catch(e => { if (e.errno != 1050) console.log(e)}); // log errors other than "table aready exists"

    await knex.schema.createTable('options', function(table) {
        table.increments('id').primary();
        table.integer('question_id').unsigned();
        table.string('text');
        table.boolean('is_correct');

        table.foreign('question_id').references('id').inTable('questions');
    }).catch(e => { if (e.errno != 1050) console.log(e)});
}

class Question {
    constructor(questionText, answersArray, id) {
        this.questionText = questionText;
        this.answers = answersArray;
        this.id = id;
    }
}
const createQuestionObj = async (rows) => {
    let questions = [];
    for(let i = 0; i < rows.length; i++){
        let answers = [];
        await knex.select('*')
        .from('options')
        .where('question_id', rows[i]['id']).then((optionRows) => {
            for(j in optionRows){
                answers.push({answerText: optionRows[j]['text'], isCorrect: optionRows[j]['is_correct']})
            }
            questions.push(new Question(rows[i]['text'], answers, rows[i]['id']))
        })
    }
    return questions;
}
setupDb();
app.use(bodyParser.json());
app.use("/", express.static('../Front-end/'));
app.get('/questions', function (req, res) {
    knex.select("*")
    .from("questions").then((rows) => {
        createQuestionObj(rows).then((questions) => {
            res.json(questions)
        })
        
    })
  })
app.post('/questions', (req, res) => {
    let question = req.body;
    knex.insert({
        text: question.questionText,
      })
      .returning('id')
      .into('questions')
      .then(function (id) {
        console.log("inserted id = " + id);
        const options = question.answers;
        
        for(let i = 0; i < options.length; i++){
            console.log(options[i]);
            knex.insert(
                {
                    text: options[i].answerText,
                    is_correct: options[i].is_correct,
                    question_id: id
                }).into('options').catch((err) => { console.log(err); throw err })
        }
        res.sendStatus(200);
        res.send("OK");
      })
    .catch((err) => { console.log(err); throw err })
    
});
app.put('/questions', async (req, res) => {
    let question = req.body;
    console.log(question)
    await knex('questions').where({id: question.id}).update({text: question.questionText});
    await knex('options').where({question_id: question.id}).delete();
    const options = question.answers;
        
        for(let i = 0; i < options.length; i++){
            console.log(options[i]);
            await knex.insert(
                {
                    text: options[i].answerText,
                    is_correct: options[i].isCorrect,
                    question_id: question.id
                }).into('options').catch((err) => { console.log(err); throw err })
        }
})

app.listen(PORT);