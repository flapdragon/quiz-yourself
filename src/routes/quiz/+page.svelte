<svelte:head>
	<title>Quiz</title>
	<meta name="description" content="Quiz" />
</svelte:head>

<script>
	import { questions } from "../../data/questions"

  // Using only Math.random wasn't really that random, so I decided to follow Coding Horror's advice and use a swapping or shuffling mechanism
  // https://blog.codinghorror.com/the-danger-of-naivete/
  // While he certainly had other issues he was adressing my main issue was that Math.random just wasn't even remotely random enough
  // and I feel like this is commonly understood among JavaScript developers
  // Does Math.random work one time? Sure. Does it work 200 times with the same min and max ranges? Not even a little bit.
  for (let i = questions.length - 1; i > 0; i--) {
    let n = getRandomIntInclusive(0, i)
    let temp = questions[i]
    questions[i] = questions[n]
    questions[n] = temp
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // Min and max inclusive
  }

  let index = 0
  let question = null
  let showAnswer = false
  let disabled = true
  let answers = null

  function setQuestion() {
    question = questions[index]
    index++
    // Reset form
    disabled = true
    answers = null
    showAnswer = false
  }
  setQuestion()
</script>

<div class="text-column">
	<h1>Question {index}</h1>

	<p>
		{@html question.questionText}
	</p>

	<p>
		{#each question.answerOptions as option (option.value)}
      {#if question.questionType == "single-answer"}
        <label>
          <input type="radio" id={option.value} bind:group={answers} name="answer" value={option.value} on:click={() => (disabled = false)} /> {option.text}
        </label><br />
      {/if}
      {#if question.questionType == "multiple-answer"}
        <label>
          <input type="checkbox" bind:group={answers} value={option.value} on:click={() => (disabled = false)} />
          {option.text}
        </label><br />
      {/if}
    {/each}
	</p>

	<p>
    <button class="button-49" name="button-show" {disabled} on:click={() => (showAnswer = true)}>Submit Answer</button>
    <!-- Not even trying to do flex or columns right now. &nbsp; all day! -->
    &nbsp; &nbsp; &nbsp; &nbsp; 
    <button class="button-49 button-49-next" name="button-next" on:click={setQuestion}>Next Question</button>
	</p>
  
  {#if showAnswer}
    <p>
      Correct Answer:
      {#each question.answerValue as correctAnswer}
        {correctAnswer}
      {/each}<br />
      Your Answer: <span class="answer-correct">{answers}</span>
    </p>
    {#if question.concept}
      <p>
        {question.concept}
      </p>
    {/if}
  {/if}

</div>

<style>
/* Borrowed and modified from CSS Scan, button by Steven Lei (https://getcssscan.com/css-buttons-examples) */
/* Show Answer button */
.button-49,
.button-49:after {
  width: 160px;
  height: 76px;
  line-height: 78px;
  font-size: 20px;
  font-family: 'Bebas Neue', sans-serif;
  background: linear-gradient(45deg, transparent 5%, #FF013C 5%);
  border: 0;
  color: #fff;
  letter-spacing: 3px;
  box-shadow: 6px 0px 0px #00E6F6;
  outline: transparent;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

/* Next Question button: changes background color only */
.button-49-next {
  background: linear-gradient(45deg, transparent 5%, #00E6F6 5%);
  box-shadow: 6px 0px 0px #FF013C;
}

.button-49:after {
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(80% -6px 0 0);
  --slice-2: inset(50% -6px 30% 0);
  --slice-3: inset(10% -6px 85% 0);
  --slice-4: inset(40% -6px 43% 0);
  --slice-5: inset(80% -6px 5% 0);
  
  content: 'SUBMIT ANSWER';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 3%, #00E6F6 3%, #00E6F6 5%, #FF013C 5%);
  text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #00E6F6;
  clip-path: var(--slice-0);
}

.button-49-next:after {
  content: 'NEXT';
  background: linear-gradient(45deg, transparent 3%, #FF013C 3%, #FF013C 5%, #00E6F6 5%);
  text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #FF013C;
}

/* Added not disabled to glitch animation, https://stackoverflow.com/questions/9207304/css-pseudo-classes-inputnotdisablednottype-submitfocus */
.button-49:not([disabled]):hover:after {
  animation: 1s glitch;
  animation-timing-function: steps(2, end);
}

@keyframes glitch {
  0% {
    clip-path: var(--slice-1);
    transform: translate(-20px, -10px);
  }
  10% {
    clip-path: var(--slice-3);
    transform: translate(10px, 10px);
  }
  20% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 10px);
  }
  30% {
    clip-path: var(--slice-3);
    transform: translate(0px, 5px);
  }
  40% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 0px);
  }
  50% {
    clip-path: var(--slice-3);
    transform: translate(5px, 0px);
  }
  60% {
    clip-path: var(--slice-4);
    transform: translate(5px, 10px);
  }
  70% {
    clip-path: var(--slice-2);
    transform: translate(-10px, 10px);
  }
  80% {
    clip-path: var(--slice-5);
    transform: translate(20px, -10px);
  }
  90% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 0px);
  }
  100% {
    clip-path: var(--slice-1);
    transform: translate(0);
  }
}

@media (min-width: 768px) {
  .button-49,
  .button-49:after {
    width: 200px;
    height: 86px;
    line-height: 88px;
  }
}

.button-49:disabled {
  opacity: 50%;
}

.answer-correct {
  color: green;
  font-weight: bold;
}

.answer-incorrect {
  color: #FF013C;
  font-weight: bold;
}
</style>

<!-- <script>
  import Question from "./Question.svelte"
  import Upload from "./Upload.svelte"

  let questions = null
</script>

{#if questions}
  <Question questions={questions} />
{:else}
  <Upload bind:questions />
{/if} -->

