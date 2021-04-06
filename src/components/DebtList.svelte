<script>
  import {
    map,
    flow,
    groupBy,
    toPairs,
    reverse,
    sortBy,
  } from "lodash/fp";

  import DebtCard from "./DebtCard.svelte";

  export let debts;
  export let showFirstTitle = true;

  $: data = flow(
    groupBy((debt) => debt.date.toISOString().substring(0, "YYYY-MM".length)),
    toPairs,
    map(([date, months]) => ({
      date: new Date(date),
      data: flow(sortBy(["date", "description"]), reverse)(months),
    })),
    sortBy("date"),
    reverse
  )(debts);
</script>

{#each data as month, i}
  {#if i > 0 || showFirstTitle}
    <h2 class="text-2xl pt-2 border-b-2 border-green-600 text-green-900">
      {month.date.toLocaleDateString("en-US", { month: "long" })}
    </h2>
  {/if}
  {#each month.data as debt}
    <DebtCard
      ref={debt.ref}
      amount={debt.amount}
      date={debt.date}
      description={debt.description}
    />
  {/each}
{/each}
