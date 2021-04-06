<script>
  import { fly } from "svelte/transition";
  import { modal } from "../lib/stores";

  import UpdateDialog from "./Dialog/UpdateDialog.svelte";

  export let ref;
  export let amount = 0;
  export let date = new Date();
  export let description = "";

  $: isInFuture = date > new Date();

  function openUpdateDialog() {
    console.log("hello")
    $modal = [
      UpdateDialog,
      {
        ref,
        amount,
        date,
        description
      },
    ];
  }
</script>

<div
  class="transition p-6 rounded-xl flex items-center space-x-4 hover:not-italic hover:bg-gray-100 focus:outline-none focus:ring-black focus:ring-opacity-20 focus:ring cursor-pointer {isInFuture
    ? 'bg-white bg-opacity-60 shadow-sm text-gray-600 italic'
    : 'bg-white shadow-md'}"
  tabindex="0"
  on:click={openUpdateDialog}
  in:fly={{ y: 200, duration: 200 }}
  out:fly={{ y: 200, duration: 200 }}
>
  <p class="flex-1">
    {#if description}
      {description}
    {:else}
      --
    {/if}
    <br />
    <span class="text-gray-400 {isInFuture ? 'text-gray-500' : ''}"
      >{new Date(date).toLocaleDateString()}</span
    >
  </p>
  <p
    class="flex-shrink-0 text-right"
    class:text-red-600={!isInFuture && amount < 0}
    class:text-green-600={!isInFuture && amount > 0}
  >
    {amount.toLocaleString(undefined, { style: "currency", currency: "EUR" })}
  </p>
</div>
