<script module>
	/** @import { Component } from 'svelte' */

	/** @type {{ content: Component | undefined, props: Record<string, any> | undefined }} */
	const modal = $state({
		content: undefined,
		props: undefined
	});

	/**
	 * @param {Component} content
	 * @param {Record<string, any>} props
	 */
	export function openModal(content, props = {}) {
		modal.content = content;
		modal.props = props;
	}

	export function closeModal() {
		modal.content = undefined;
		modal.props = undefined;
	}
</script>

<script>
	function onclick() {
		closeModal();
	}

	/**
	 * @param {KeyboardEvent} event
	 */
	function onkeydown(event) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}

	let ModalContent = $derived(modal.content);
	let modalProps = $derived(modal.props);
</script>

{#if modal.content != undefined}
	<div
		class="fixed inset-0 flex items-center justify-center bg-black/10 font-mono dark:bg-black/50"
		{onclick}
		{onkeydown}
		role="button"
		tabindex="0"
	>
		<ModalContent {...modalProps} />
	</div>
{/if}
