<script>
  import TransactionList from "$components/TransactionList.svelte";
  import TransactionCreateButton from "$components/TransactionCreateButton.svelte";
	import { getContext, onMount } from "svelte";
	import { m } from "$lib/paraglide/messages";
  import { getLocale } from "$lib/paraglide/runtime";
  import { today } from "$lib/stores";
	import Spinner from "$components/icons/spinner.svelte";

  /** @type {import("$lib/api").Repository} */
  const debtbook = getContext('debtbook');

  /**
   * Group transactions into past and future
   * @param {import("$lib/api").Transaction[]} transactions
   * @param {number} today
   * @returns {[import("$lib/api").Transaction[], import("$lib/api").Transaction[]]}
   */
  function groupTransactions(transactions, today) {
    const past = [];
    const future = [];
    for (const transaction of transactions) {
      if (transaction.timestamp <= today) {
        past.push(transaction);
      } else {
        future.push(transaction);
      }
    }
    return [past, future];
  }

  const totalDebt = debtbook.transactionGetTotalDebt();

  /** @type {import("$lib/api").Transaction[]} */
  let transactions = $state([]);
  let isLoading = $state(true);
  /** @type {string[]} */
  let errors = $state([]);

  onMount(async () => {
    try {
      transactions = await debtbook.transactionGetPageByPerson(1);
    } catch (error) {
      if (error instanceof Error) {
        errors.push(m.index_list_error({ message: error.message }));
      } else if (error) {
        errors.push(m.index_list_error({ message: error.toString() }));
      }
    }
    isLoading = false;
  });

  let [pastData, futureData] = $derived(groupTransactions(transactions, $today.getTime()));
</script>

<div class="space-y-4">
  {#if isLoading}
    {m.index_loading()}
    <Spinner className="mx-auto w-5 text-green-600" />
  {/if}

  {#if errors.length > 0}
    <div class="space-y-2">
    {#each errors as error}
        <p class="bg-red-100 border-red-400 border text-red-600 p-2 rounded-md">{error}</p>
      {/each}
    </div>
  {/if}

  <TransactionList transactions={futureData} />

  <div class="mx-auto flex px-4 border-b-2 border-black">
    <p class="flex-1">{m.index_total()}</p>
    <p>
      {#await totalDebt}
        ...
      {:then total}
        {(total/100).toLocaleString(getLocale(), {
          style: "currency",
          currency: "EUR",
        })}
      {:catch error}
        {m.index_currency_error(error)}
      {/await}
    </p>
  </div>

  <TransactionList transactions={pastData} showFirstTitle={futureData.length === 0} />
</div>

<TransactionCreateButton />
