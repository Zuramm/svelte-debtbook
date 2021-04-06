<script>
  import { modal } from "../lib/stores";
</script>

{#if $modal !== undefined}
  <div
    class="fixed inset-0 flex justify-center items-center font-mono"
    style="background: #0002"
    on:click={() => $modal = undefined}
  >
    <svelte:component this={$modal[0]} {...$modal[1]} />
  </div>
{/if}
