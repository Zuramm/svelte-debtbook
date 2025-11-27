<script>
  import { scale } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { modal } from "../../lib/stores";
  import { getContext } from "svelte";

  import DebtForm from "../DebtForm.svelte";

  /** @type {number} */
  export let ref;
  /** @type {number} */
  export let amount;
  /** @type {Date} */
  export let date;
  /** @type {string} */
  export let description;

  /** @type {import("$lib/api").Repository} */
  const debtbook = getContext('debtbook');

  function oncancel() {
    $modal = undefined;
  }

  function ondelete() {
    debtbook.transactionDelete(ref);
    $modal = undefined;
  }

  function onupdate() {
    debtbook.transactionUpdate({ id: ref, person_id: 1, amount, timestamp: date.getTime(), description });
    $modal = undefined;
  }
</script>

<div
  class="bg-white p-4 rounded-xl shadow-sm space-y-4 w-full max-w-lg"
  on:click|stopPropagation
  on:keydown|stopPropagation
  role="dialog"
  tabindex="0"
  in:scale={{ duration: 125, start: 0.75, opacity: 0, easing: cubicOut }}
  out:scale={{ duration: 100, start: 0.75, opacity: 0, easing: cubicIn }}
>
  <h1 class="tex-black text-xl">Update a Debt Entry</h1>

  <DebtForm bind:amount bind:date bind:description />

  <div class="flex justify-between pt-1">
    <button
      class="transition py-2 px-4 rounded-full hover:bg-gray-100 focus:outline-none focus:ring focus:ring-green-300"
      on:click={oncancel}
    >
      Cancel
    </button>
    <div class="space-x-2">
      <button
        class="transition py-2 px-4 border-2 border-red-500 rounded-full text-red-600 text-base hover:bg-red-500 hover:text-white focus:outline-none focus:ring focus:ring-red-300"
        on:click={ondelete}
      >
        Delete
      </button>
      <button
        class="transition py-2 px-4 border-none rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
        on:click={onupdate}
      >
        Update
      </button>
    </div>
  </div>
</div>
