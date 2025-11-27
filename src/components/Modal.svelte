<script>
  import { modal } from "../lib/stores";

  /**
   * @param {KeyboardEvent} event
   */
  function onKeyDown(event) {
    if (event.key === "Escape") {
      $modal = undefined;
    }
  }
</script>

{#if $modal != undefined}
  <div
    class="fixed inset-0 flex justify-center items-center font-mono"
    style="background: #0002"
    on:click={() => $modal = undefined}
    on:keydown={onKeyDown}
    role="button"
    tabindex="0"
  >
    <svelte:component this={$modal?.[0]} {...$modal?.[1]} />
  </div>
{/if}
