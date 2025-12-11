<script>
	import { onMount } from 'svelte';

	/** @type {HTMLDialogElement | null} */
	let dialog = $state(null);

	let { open = $bindable(), children, title = '' } = $props();

	onMount(() => {
		if (open) {
			dialog?.showModal();
		}
	});

	$effect(() => {
		if (open) {
			dialog?.showModal();
		} else {
			dialog?.close();
		}
	});
</script>

<dialog
	bind:this={dialog}
	class="ripped m-auto w-full max-w-lg space-y-4 overflow-auto bg-transparent px-4 py-6 transition-all backdrop:bg-gray-900/50"
	onclose={() => (open = false)}
>
	{#if title}
		<h1 class="text-xl text-green-500 dark:text-green-400">{title}</h1>
	{/if}
	{@render children()}
</dialog>

<style>
	/* Open state of the dialog  */
	dialog:open {
		opacity: 1;
		transform: translate(0, 0) scale(1);
	}

	/* Closed state of the dialog   */
	dialog {
		--animation-duration: 0.2s;
		opacity: 0;
		transform: translate(0, 50%) scale(0.5);
		transition:
			opacity var(--animation-duration) var(--ease-out),
			transform var(--animation-duration) var(--ease-out),
			overlay var(--animation-duration) var(--ease-out) allow-discrete,
			display var(--animation-duration) var(--ease-out) allow-discrete;
	}

	/* Before open state  */
	/* Needs to be after the previous dialog:open rule to take effect,
    as the specificity is the same */
	@starting-style {
		dialog:open {
			opacity: 0;
			transform: translate(0, 50%) scale(0.5);
		}
	}

	/* Transition the :backdrop when the dialog modal is promoted to the top layer */
	dialog::backdrop {
		background-color: transparent;
		backdrop-filter: blur(0) saturate(100%);
		transition:
			display var(--animation-duration) allow-discrete,
			overlay var(--animation-duration) allow-discrete,
			backdrop-filter var(--animation-duration),
			background-color var(--animation-duration);
	}

	dialog:open::backdrop {
		background-color: rgb(0 0 0 / 25%);
		backdrop-filter: blur(12px) saturate(50%);
	}

	/* This starting-style rule cannot be nested inside the above selector
because the nesting selector cannot represent pseudo-elements. */

	@starting-style {
		dialog:open::backdrop {
			background-color: transparent;
			backdrop-filter: blur(0) saturate(100%);
		}
	}
</style>
