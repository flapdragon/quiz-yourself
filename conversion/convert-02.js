import fs from "fs"
import { v4 as uuidv4 } from "uuid"

// This is a custom script for converting a text file containing questions in a certain format from a different source and returning a JavaScript array with those same questions.
// Rather than a series of if statements, which could be triggered in the wrong cases by unexpected data, the approach will be stateful, so that it is easier to manage the ifs and checks by adding the state as a factor.
// The data is in order, so the actions taken should be in that same order.
// NOTE: the path refers to a file here in the same directory, which it is during this one time conversion but that file is eventually deleted or moved.
// TODO: Add check for Exam tip: line
const allFileContents = fs.readFileSync('./questions-03.txt', 'utf-8')
// Initialize first state
let lineState = "question"
let questionLine = 0
// Regex
const answerLetterPattern = /^[A-Z]\./
const answerPattern = /^Answers?:/
const conceptPattern = /^Concept:/
const wrongPattern = /^Wrong answers:/
let objectString = "["
allFileContents.split(/\r?\n/).forEach(line =>  {
  const firstTwoChars = line.trim().substring(0, 2)
  console.log(line)
  // Step 1: question
  if ((lineState === "question" || lineState === "concept" || lineState === "wrong") && !answerLetterPattern.test(line) && firstTwoChars !== "" && !wrongPattern.test(line)) {
    lineState = "question"
    if (questionLine === 0) {
      questionLine++
      const id = uuidv4()
      objectString += `{ questionID: "${id}", `
      const chooseTwo = line.indexOf("Choose two") != -1 ? "multiple-answer" : "single-answer"
      objectString += `questionType: "${chooseTwo}", `
      objectString += `questionText: "${line}<br />`
    }
    else {
      questionLine++
      objectString += `${line}<br />`
    }
  }
  // Step 2: answer options
  if (lineState === "question" && firstTwoChars === "A.") {
    lineState = "option"
    questionLine = 0
    objectString += `", answerOptions: [ { value: "${firstTwoChars.replace(".", "")}", text: "${line.trim()}" }, `
  }
  if (lineState === "option" && answerLetterPattern.test(line) && firstTwoChars !== "A." && firstTwoChars !== "") {
    objectString += `{ value: "${firstTwoChars.replace(".", "")}", text: "${line.trim()}" }, `
  }
  // Step 3: answer
  if (lineState === "option" && answerPattern.test(line)) {
    lineState = "answer"
    let answers = line.replace("Answer: ", "")
    // Remove trailing comma
    objectString = objectString.slice(0, -2)
    objectString += `], answerValue: ["${answers}"], `
  }
  // Step 4: Concept not sure what to do with this but I like it
  if (lineState === "answer" && conceptPattern.test(line)) {
    lineState = "concept"
    objectString += `concept: "${line}" },`
  }
  // Step 5: Wrong answers. Optional, data not always there. Wouldn't use it anyway
  if (lineState === "concept" && wrongPattern.test(line)) {
    lineState = "wrong"
  }
  if (lineState === "wrong" && answerLetterPattern.test(line)) {
    lineState = "wrong"
  }
})
objectString = objectString.slice(0, -1)
objectString += "]"

// Write to file
fs.writeFile('./questions-02.js', objectString, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
})