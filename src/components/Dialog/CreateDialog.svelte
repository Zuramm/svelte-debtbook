<script>
  import { scale } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { modal } from "../../lib/stores";
  import {
    useMutation,
    useQueryClient,
  } from "@sveltestack/svelte-query";
  import { createDebt } from "../../lib/api";

  import DebtForm from "../DebtForm.svelte";

  export let amount = 0;
  export let date = new Date();
  export let description = "";

  const queryClient = useQueryClient();

  const createMutation = useMutation(createDebt, {
    onSuccess: () => {
      queryClient.invalidateQueries("alldebts");
    },
  });

  function oncancel() {
    $modal = undefined;
  }

  function oncreate() {
    $createMutation.mutate({ amount, date, description });
    $modal = undefined;
  }
</script>

<div
  class="bg-white p-4 rounded-xl shadow-sm space-y-4 w-full max-w-lg"
  on:click|stopPropagation
	in:scale={{ duration: 125, start: 0.75, opacity: 0, easing: cubicOut }}
	out:scale={{ duration: 100, start: 0.75, opacity: 0, easing: cubicIn }}
>
  <h1 class="tex-black text-xl">Create a Debt Entry</h1>

  <DebtForm bind:amount bind:date bind:description />

  <div class="flex justify-between pt-1">
    <button
      class="transition py-2 px-4 rounded-full hover:bg-gray-100 focus:outline-none focus:ring focus:ring-green-300"
      on:click={oncancel}
    >
      Cancel
    </button>
    <button
      class="transition py-2 px-4 border-none rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
      on:click={oncreate}
    >
      Create
    </button>
  </div>
</div>
