<script>
  import {
    useQuery,
    useMutation,
    useQueryClient,
  } from "@sveltestack/svelte-query";

  import Dropdown from "./Dropdown.svelte";
  import DebtCard from "./DebtCard.svelte";
  import CreateDialog from "./CreateDialog.svelte";
  import UpdateDialog from "./UpdateDialog.svelte";

  import {
    map,
    flow,
    groupBy,
    toPairs,
    reverse,
    sortBy,
    partition,
  } from "lodash/fp";
  import { createDebt, DebtbookAPI, getAllDebts } from "./api.js";

  const transformAPIData = flow(
    reverse,
    partition((debt) => debt.date <= today),
    map(
      flow(
        groupBy((debt) => debt.date.substring(0, "YYYY-MM".length)),
        toPairs,
        map(([date, months]) => ({
          date: new Date(date),
          data: flow(sortBy(["date", "description"]), reverse)(months),
        })),
        sortBy("date"),
        reverse
      )
    )
  );

  const queryClient = useQueryClient();

  const queryResult = useQuery("debts", getAllDebts);

  // let debtbook = new DebtbookAPI();
  // debtbook
  //   .get()
  //   .then(() => (debtbook = debtbook));

  $: data = flow(
    reverse,
    partition((debt) => debt.date <= today),
    map(
      flow(
        groupBy((debt) => debt.date.substring(0, "YYYY-MM".length)),
        toPairs,
        map(([date, months]) => ({
          date: new Date(date),
          data: flow(sortBy(["date", "description"]), reverse)(months),
        })),
        sortBy("date"),
        reverse
      )
    )
  )($queryResult.data);

  let openDialog;
  let currentDebt;
  let today;

  (function updateNow() {
    today = new Date().toISOString().substring(0, "YYYY-MM-DD".length);

    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const milliTillMidnight = midnight - now;

    setTimeout(updateNow, milliTillMidnight);
  })();

  function onImport() {
    const element = document.createElement("input");
    element.type = "file";

    element.style.display = "none";
    document.body.appendChild(element);

    element.addEventListener("change", function () {
      try {
        debtbook = JSON.parse(element.files[0].text());
      } catch (e) {}
      document.body.removeChild(element);
    });

    element.click();
  }

  function onExport() {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:application/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(debtbook))
    );
    element.setAttribute(
      "download",
      `debtbook-${new Date().toDateString()}.json`
    );
    element.setAttribute("target", "_blank");

    console.log(JSON.stringify(debtbook.toJSON()));

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function closeDialog() {
    openDialog = undefined;
  }

  function onCancel() {
    currentDebt = undefined;
    closeDialog();
  }

  async function onCreate(data) {
    console.log(data);
    await debtbook.create(data.detail);
    debtbook = debtbook;
    closeDialog();
  }

  async function onDelete() {
    await debtbook.delete(currentDebt);
    debtbook = debtbook;
    currentDebt = undefined;
    closeDialog();
  }

  async function onUpdate(data) {
    await debtbook.update(currentDebt, data.detail);
    debtbook = debtbook;
    currentDebt = undefined;
    closeDialog();
  }
</script>

<div
  class="h-screen bg-green-300 overflow-auto relative font-mono bg-graph pb-24 md:pb-12"
>
  <div class="bg-green-50 sticky top-0">
    <div class="max-w-lg mx-auto p-4 space-y-4">
      <div class="flex justify-between flex-row">
        <div class="flex-1 flex">
          <h1 class="w-100 flex-none font-bold text-4xl text-green-900">
            Debtbook
          </h1>
          {#if $queryResult.isLoading}
          <svg class="animate-spin mx-8 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {/if}
        </div>
        <Dropdown>
          <button
            slot="button"
            type="button"
            class="inline-flex justify-center w-full rounded-full border-none p-2 text-gray-700 hover:bg-gray-700 hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-100 focus:ring-green-500"
            id="options-menu"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <!-- Heroicon name: solid/dots-vertical -->
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
              />
            </svg>
          </button>
          <button
            type="submit"
            class="block w-full border-none text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            on:click={onExport}
          >
            Export JSON
          </button>
          <button
            type="submit"
            class="block w-full border-none text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            on:click={onImport}
          >
            Import JSON
          </button>
        </Dropdown>
      </div>
    </div>
  </div>
  <div class="max-w-lg mx-auto p-4 space-y-4">
    {#if $queryResult.isError}
      <div class="">
        <h1>Error!</h1>
        <span>{$queryResult.error.message}</span>
      </div>
    {:else if !$queryResult.isLoading}
      {#each data[1] as month}
        <h2 class="text-2xl pt-2 border-b-2 border-green-600 text-green-900">
          {month.date.toLocaleDateString("en-US", { month: "long" })}
        </h2>
        {#each month.data as debt}
          <DebtCard
            amount={debt.amount}
            date={debt.date}
            description={debt.description}
            on:click={() => {
              openDialog = "update";
              currentDebt = debt;
            }}
          />
        {/each}
      {/each}

      <div class="mx-auto flex border-b-2 border-black">
        <p class="flex-1">Total</p>
        <p>
          {debtbook
            .sum()
            .toLocaleString(undefined, { style: "currency", currency: "EUR" })}
        </p>
      </div>

      {#each data[0] as month, i}
        {#if i > 0 || data[1].length === 0}
          <h2 class="text-2xl pt-2 border-b-2 border-green-600 text-green-900">
            {month.date.toLocaleDateString("en-US", { month: "long" })}
          </h2>
        {/if}
        {#each month.data as debt}
          <DebtCard
            amount={debt.amount}
            date={debt.date}
            description={debt.description}
            on:click={() => {
              openDialog = "update";
              currentDebt = debt;
            }}
          />
        {/each}
      {/each}
    {:else}
      <svg
        class="animate-spin mx-auto w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    {/if}
  </div>
</div>

<button
  class="transition fixed bottom-5 right-5 w-16 h-16 flex justify-center items-center text-3xl bg-green-500 shadow-xl border-none rounded-full hover:bg-green-600 focus:outline-none focus:ring focus:ring-black focus:ring-opacity-30 text-white"
  on:click={() => (openDialog = "create")}
>
  <svg
    class="w-14 h-14"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
</button>

{#if openDialog !== undefined}
  <div
    class="fixed inset-0 flex justify-center items-center font-mono"
    style="background: #0002"
    on:click={onCancel}
  >
    {#if openDialog === "update"}
      <UpdateDialog
        ref={currentDebt.ref}
        amount={currentDebt.amount}
        date={currentDebt.date}
        description={currentDebt.description}
        on:cancel={onCancel}
        on:delete={onDelete}
        on:update={onUpdate}
      />
    {:else if openDialog === "create"}
      <CreateDialog on:cancel={onCancel} on:create={onCreate} />
    {/if}
  </div>
{/if}

<style>
  .bg-graph {
    background-color: #d1fae5;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%236ee7b7' fill-opacity='0.63'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
</style>
