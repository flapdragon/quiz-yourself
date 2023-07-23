# Quiz Yourself

Simple quiz builder written in Svelte. You supply the questions and answers and the app does the rest.

## Getting Started

### Data
After you've cloned the project will need to create a folder under src called data with a file called questions.js. This is editable in the code obviously but this is the default state.
> quiz-yourself/src/data/questions.js

The questions.js file should export an array with questions formatted like this:

    export  const  questions = [
        {
            questionID:  "8b91878f-1127-4d01-8212-a71dbed01897",
            questionType:  "single-answer",
            questionText:  "What is your favorite type of cuisine? (Thanks ChatGPT)",
            answerOptions: [
                { value: "A", text: "A. Italian" },
                { value: "B", text: "B. Mexican" },
                { value: "C", text: "C. Chinese" },
                { value: "D", text: "D. Japanese" },
                { value: "E", text: "E. Indian" },
                { value: "F", text: "F. American" },
            ],
        answerValue: [ "A" ]
        }
    ]

### Install dependencies and run development server
From the project directory:

```bash
# Install dependencies
npm install

# start the development server
npm run dev
```

## TODO

1. Add data persistence for both questions and statistics
2. Add statistics: times viewed, times answered, % of right/wrong answers
3. Add search/filtering for questions based on statistics
<br />
<br />


Bootstrapped with [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).
