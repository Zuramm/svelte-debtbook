<script>
  import { scale } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";

  let visible = false;

  function onMenuToggle() {
    visible = !visible;
  }
</script>

<div class="relative inline-block text-left">
  <div on:click={onMenuToggle}>
    <slot name="button" />
  </div>

  {#if visible}
    <div
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      in:scale={{ duration: 100, start: 0.75, opacity: 0, easing: cubicOut }}
      out:scale={{ duration: 75, start: 0.75, opacity: 0, easing: cubicIn }}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div class="py-1" role="none">
        <slot />
      </div>
    </div>
  {/if}
</div>
