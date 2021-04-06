<script>
  import { scale } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { modal } from "../../lib/stores";
  import {
    useMutation,
    useQueryClient,
  } from "@sveltestack/svelte-query";
  import { deleteDebt, updateDebt } from "../../lib/api";

  import DebtForm from "../DebtForm.svelte";

  export let ref;
  export let amount;
  export let date;
  export let description;

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteDebt, {
    onSuccess: () => {
      queryClient.invalidateQueries("alldebts");
    },
  });

  const updateMutation = useMutation(updateDebt, {
    onSuccess: () => {
      queryClient.invalidateQueries("alldebts");
    },
  });

  function oncancel() {
    $modal = undefined;
  }

  function ondelete() {
    $deleteMutation.mutate({ref})
    $modal = undefined;
  }

  function onupdate() {
    $updateMutation.mutate({ ref, amount, date, description });
    $modal = undefined;
  }
</script>

<div
  class="bg-white p-4 rounded-xl shadow-sm space-y-4 w-full max-w-lg"
  on:click|stopPropagation
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
