<script>
  import { scale } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { modal } from "$lib/stores";
  import { getContext } from "svelte";
  import { m } from "$lib/paraglide/messages";

  import TransactionForm from "$components/TransactionForm.svelte";

  /** @type {{ amount: number, date: Date, description: string }} */
  let { amount = $bindable(), date = $bindable(), description = $bindable() } = $props();

  /** @type {import("$lib/api").Repository} */
  const debtbook = getContext('debtbook');

  function oncancel() {
    $modal = undefined;
  }

  function oncreate() {
    debtbook.create({ person_id: 1, amount, timestamp: date.getTime(), description });
    $modal = undefined;
  }
</script>

<div
  class="bg-white p-4 rounded-xl shadow-sm space-y-4 w-full max-w-lg"
  onclick={e => e.stopPropagation()}
  onkeydown={e => e.stopPropagation()}
  role="dialog"
  tabindex="0"
	in:scale={{ duration: 125, start: 0.75, opacity: 0, easing: cubicOut }}
	out:scale={{ duration: 100, start: 0.75, opacity: 0, easing: cubicIn }}
>
  <h1 class="tex-black text-xl">Create a Debt Entry</h1>

  <TransactionForm bind:amount bind:date bind:description />

  <div class="flex justify-between pt-1">
    <button
      class="transition py-2 px-4 rounded-full hover:bg-gray-100 focus:outline-none focus:ring focus:ring-green-300"
      onclick={oncancel}
    >
      {m.create_dialog_cancel()}
    </button>
    <button
      class="transition py-2 px-4 border-none rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
      onclick={oncreate}
    >
      {m.create_dialog_create()}
    </button>
  </div>
</div>
