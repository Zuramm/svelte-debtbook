<script>
	/** @type {HTMLDialogElement | null} */
	let dialog = $state(null);

	/** @type {{ open: boolean, onclose?: () => void, children: any, title?: string }} */
	let { open = $bindable(), children, title = '' } = $props();

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
	aria-labelledby="drawer-title"
    onclose={() => open = false}
	closedby="any"
	class="relative m-0 ml-auto h-screen max-h-none overflow-visible backdrop:bg-gray-500/75 dark:backdrop:bg-gray-900/50"
>
	<div
		class="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out group-data-closed/dialog-panel:opacity-0 sm:-ml-10 sm:pr-4"
	>
		<button
			type="button"
			onclick={() => dialog?.close()}
			class="relative rounded-md text-gray-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-gray-400 dark:hover:text-white dark:focus-visible:outline-emerald-500"
		>
			<span class="absolute -inset-2.5"></span>
			<span class="sr-only">Close panel</span>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				data-slot="icon"
				aria-hidden="true"
				class="size-6"
			>
				<path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>
	</div>

	<div
		class="relative flex h-full w-md flex-col overflow-y-auto bg-white py-6 shadow-xl focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 dark:bg-gray-800 dark:text-white dark:after:absolute dark:after:inset-y-0 dark:after:left-0 dark:after:w-px dark:after:bg-white/10 dark:focus:outline-emerald-500"
	>
		<div class="px-4 sm:px-6">
			<h2 id="drawer-title" class="text-base font-semibold text-gray-900 dark:text-white">
				{title}
			</h2>
		</div>
		<div class="relative flex-1 px-4 sm:px-6">
			{@render children()}
		</div>
	</div>
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
