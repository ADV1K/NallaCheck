<script lang="ts">
	import { nallaCheck } from '$lib/index';
	import { onMount } from 'svelte';

	onMount(() => {
		const fileInput = document.getElementById('file');
		if (!fileInput) return;

		fileInput.addEventListener('change', (event: Event) => {
			nallaCheck(event);
		});
	});
</script>

<header>
	<h1>Nalla Check ✅</h1>
	<p>Find the most Nalla Insaan in your group chats</p>
</header>

<main>
	<input type="file" id="file" />
	<pre id="output" />
</main>
