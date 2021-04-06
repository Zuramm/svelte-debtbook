<script>
  import { modal } from "../lib/stores";

  import Plus from "./Icons/Plus.svelte";
  import CreateDialog from "./Dialog/CreateDialog.svelte";

  function openCreateDialog() {
    $modal = [CreateDialog, {}];
  }
</script>

<button
  class="transition fixed bottom-5 right-5 w-16 h-16 flex justify-center items-center text-3xl bg-green-500 shadow-xl border-none rounded-full hover:bg-green-600 focus:outline-none focus:ring focus:ring-black focus:ring-opacity-30 text-white"
  on:click={openCreateDialog}
>
  <Plus/>
</button>