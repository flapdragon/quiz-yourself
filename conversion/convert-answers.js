import fs from "fs"
import { questions } from "../src/data/questions.js"

// Get Questions file
// console.log(questions[0])

questions.forEach(question => {
  console.log(question.questionType, Array.isArray(question.answerValue), question.answerValue.length, question.answerValue[0].length)
  // if (question.answerValue[0].length > 1) {
  // if (question.answerValue[0].indexOf("Answers") > -1) {
  if (question.answerValue.length > 1 && question.questionType !== "multiple-answer") {
    console.log(question.questionID)
  }
})

// 6
const unformattedAnswers1 = questions.filter(question => question.answerValue[0].indexOf("Answers") > -1)
console.log(unformattedAnswers1.length)

// 65
const unformattedAnswers2 = questions.filter(question => question.answerValue[0].length > 1)
console.log(unformattedAnswers2.length)

// 18
const unformattedAnswers3 = questions.filter(question => question.answerValue.length > 1 && question.questionType !== "multiple-answer")
console.log(unformattedAnswers3.length)

