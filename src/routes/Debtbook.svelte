<script>
  import { useQuery } from "@sveltestack/svelte-query";
  import { getAllDebts } from "../lib/api";
  import { flow, reverse, partition, sumBy } from "lodash/fp";

  import DebtList from "../components/DebtList.svelte";
  import DebtCreateButton from "../components/DebtCreateButton.svelte";

  const queryResult = useQuery("alldebts", getAllDebts);

  let today = new Date();

  $: [pastData, futureData] = flow(
    reverse,
    partition((debt) => debt.date <= today)
  )($queryResult.data);
</script>

{#if $queryResult.isLoading}
  Loading...
{:else if $queryResult.error}
  An error has occurred:
  {$queryResult.error.message}
{:else}
  <div class="space-y-4">
    <DebtList debts={futureData} />

    <div class="mx-auto flex px-4 border-b-2 border-black">
      <p class="flex-1">Total</p>
      <p>
        {sumBy("amount", pastData).toLocaleString(undefined, {
          style: "currency",
          currency: "EUR",
        })}
      </p>
    </div>

    <DebtList debts={pastData} showFirstTitle={futureData.length === 0} />
  </div>

  <DebtCreateButton />
{/if}
