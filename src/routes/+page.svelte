<script>
  import DebtList from "../components/DebtList.svelte";
  import DebtCreateButton from "../components/DebtCreateButton.svelte";
	import { getContext } from "svelte";
	import { m } from "../lib/paraglide/messages";
  import { getLocale } from "$lib/paraglide/runtime";

  let today = Date.now();

  /** @type {import("$lib/api").Repository} */
  const debtbook = getContext('debtbook');

  /**
   * Group transactions into past and future
   * @param {import("$lib/api").Transaction[]} transactions
   * @returns {[import("$lib/api").Transaction[], import("$lib/api").Transaction[]]}
   */
  function groupTransactions(transactions) {
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

  let totalDebt = debtbook.transactionGetTotalDebt();
  let totalDebtByPerson = debtbook.transactionGetPageByPerson(1).then(groupTransactions);
</script>

<div class="space-y-4">
  {#await totalDebtByPerson}
    {m.index_loading()}
  {:then [pastData, futureData]}
    <DebtList debts={futureData} />

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

    <DebtList debts={pastData} showFirstTitle={futureData.length === 0} />

  {:catch error}
    {m.index_list_error(error)}
  {/await}
</div>

<DebtCreateButton />
