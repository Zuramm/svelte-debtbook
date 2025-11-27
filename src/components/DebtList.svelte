<script>
  import DebtCard from "./DebtCard.svelte";
  import { getLocale } from "$lib/paraglide/runtime";

  /** @type {import("$lib/api").Transaction[]} */
  export let debts;
  /** @type {boolean} */
  export let showFirstTitle = true;

  $: data = (() => {
    /** Group debts by "YYYY-MM" @type {Record<string, import("$lib/api").Transaction[]>} */
    const groups = {};
    if (debts) {
      for (const debt of debts) {
        const monthKey = new Date(debt.timestamp).toISOString().substring(0, "YYYY-MM".length);
        if (!groups[monthKey]) groups[monthKey] = [];
        groups[monthKey].push(debt);
      }
    }
    // Convert groups to pairs [date, debts[]]
    const pairs = Object.entries(groups);
    // Sort each group by date then description, most recent first
    const result = pairs.map(([date, months]) => {
      const sorted = [...months].sort((a, b) => {
        if (a.timestamp < b.timestamp) return -1;
        if (a.timestamp > b.timestamp) return 1;
        // fallback to description string comparison
        if (a.description < b.description) return -1;
        if (a.description > b.description) return 1;
        return 0;
      }).reverse();
      return { date: new Date(date), data: sorted };
    });
    // Sort months by date descending (most recent first)
    result.sort((a, b) => b.date.getTime() - a.date.getTime());
    return result;
  })();
</script>

{#each data as month, i}
  {#if i > 0 || showFirstTitle}
    <h2 class="text-2xl pt-2 border-b-2 border-green-600 text-green-900">
      {month.date.toLocaleDateString(getLocale(), { month: "long" })}
    </h2>
  {/if}
  {#each month.data as debt}
    <DebtCard
      ref={debt.id}
      amount={debt.amount}
      date={new Date(debt.timestamp)}
      description={debt.description}
    />
  {/each}
{/each}
