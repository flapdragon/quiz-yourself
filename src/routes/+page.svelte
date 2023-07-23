<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		Quiz Yourself
	</h1>

	<h2>
		Data format
	</h2>

	<p>
		The question data for version 1 is multiple choice questions with either single answer or multiple answer options. The data is a single array of objects, stored locally but not in the repo.
	</p>

	<ul>
		<li>questionID: I use UUID v4, but the only requirement is that it's unique.</li>
		<li>questionType: "single-answer" | "multiple-answer". single-answer will be radios. multiple-answer will be checkboxes.</li>
		<li>questionText: Text</li>
		<li>answerOptions: An array of objects - &#123; value: "A", text: "A. First Answer" &#125;. The value can be anything but I prefer to match it to the text.</li>
	</ul>

	<code>
		&#91;
			&#123;
				questionID: "8b91878f-1127-4d01-8212-a71dbed01897",
				questionType: "single-answer",
				questionText: "What is your favorite type of cuisine? (Thanks ChatGPT)",
				answerOptions: &#91;
					&#123; value: "A", text: "A. Italian" &#125;,
					&#123; value: "B", text: "B. Mexican" &#125;,
					&#123; value: "C", text: "C. Chinese" &#125;,
					&#123; value: "D", text: "D. Japanese" &#125;
					&#123; value: "E", text: "E. Indian" &#125;
					&#123; value: "F", text: "F. American" &#125;
				&#93;
			&#125;
		&#93;
	</code>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
