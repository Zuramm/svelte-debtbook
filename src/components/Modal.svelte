<script>
	import { modal } from '$lib/stores';

	/**
	 * @param {KeyboardEvent} event
	 */
	function onKeyDown(event) {
		if (event.key === 'Escape') {
			$modal = undefined;
		}
	}

	let ModalContent = $derived($modal?.[0]);
	let modalProps = $derived($modal?.[1]);
</script>

{#if $modal != undefined}
	<div
		class="fixed inset-0 flex items-center justify-center font-mono"
		style="background: #0002"
		onclick={() => ($modal = undefined)}
		onkeydown={onKeyDown}
		role="button"
		tabindex="0"
	>
		<ModalContent {...modalProps} />
	</div>
{/if}
