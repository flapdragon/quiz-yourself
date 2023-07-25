import fs from "fs"
import { v4 as uuidv4 } from "uuid"

// This is a custom script for converting a text file containing questions in a certian format and returning a JavaScript array with those same questions.
// TODO: Escape double quotes in questions and in general
// TODO: Remove personal comments from answers in original text data
// TDOD: The questions get double parse sometimes due to a strange match on parenthese or other if/search characters below. Need to fix this.
const allFileContents = fs.readFileSync('./questions.txt', 'utf-8')
const questionNumberPattern = /^\d{1,4}\./
const answerLetterPattern = /[A-Z]\./
const answerPattern = /\([A-Z]/
let objectString = "["
// https://geshan.com.np/blog/2021/10/nodejs-read-file-line-by-line/
allFileContents.split(/\r?\n/).forEach(line =>  {
  const firstTwoChars = line.trim().substring(0, 2)
  // New question
  if (questionNumberPattern.test(line)) {
    let id = uuidv4()
    objectString += `{ questionID: "${id}", `
    objectString += ` questionType: "single-answer",`
    objectString += ` questionText: "${line.replace(/^\d{1,4}\. /, "")}`
  }
  // Keep adding to question
  if (!questionNumberPattern.test(line) && !answerLetterPattern.test(line) && !answerPattern.test(line) && firstTwoChars != "") {
    objectString += line
  }
  // Start answer options
  if (firstTwoChars == "A.") {
    objectString += `", answerOptions: [ { value: "${firstTwoChars}", text: "${line.trim()}" }, `
  }
  // Keep adding answer options
  if (firstTwoChars != "A." && answerLetterPattern.test(line)) {
    objectString += `{ value: "${firstTwoChars.replace(".", "")}", text: "${line.trim()}" },`
  }
  // Start answer
  if (answerPattern.test(line)) {
    let answers = line.replace("(", "").replace(")", "")
    // Remove trailing comma
    objectString = objectString.slice(0, -1)
    objectString += `], answerValue: ["${answers}"] },`
  }
})
objectString = objectString.slice(0, -1)
objectString += "]"

// Write to file
fs.writeFile('./questions.js', objectString, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});

