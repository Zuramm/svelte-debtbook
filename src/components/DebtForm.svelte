<script>
  import { m } from "$lib/paraglide/messages";
  import { getLocale } from "$lib/paraglide/runtime";

  /** @type {{ amount: number, date: Date, description: string }} */
  let { amount = $bindable(), date = $bindable(), description = $bindable() } = $props();

  /**
   * @param {Date?} date
   * @returns {string?}
   */
  function getDateString(date) {
    if (date) {
      const string = date.toISOString();
      if (string === "Invalid Date") {
        return null;
      }
      return date.toISOString().substring(0, "YYYY-MM-DD".length);
    }
    return null;
  }

  let dateInput = $derived(getDateString(date));

  /**
   * @param {number} amount
   * @returns {string}
   */
  function formatAmount(amount) {
    return amount.toLocaleString(getLocale(), {
      style: "currency",
      currency: "EUR",
    });
  }

  function updateDate() {
    if (dateInput) {
      date = new Date(dateInput);
    }
  }
</script>

<div>
  <label for="debt-description">{m.debt_form_description()}</label>
  <input
    class="transition w-full mt-1 p-2 border-none rounded-md shadow-md bg-gray-50 focus:outline-none focus:ring focus:ring-green-300"
    id="debt-description"
    type="text"
    bind:value={description}
  />
</div>

<div>
  <label for="debt-date">{m.debt_form_date()}</label>
  <input
    class="transition w-full mt-1 p-2 border-none rounded-md shadow-md bg-gray-50 focus:outline-none focus:ring focus:ring-green-300"
    id="debt-date"
    type="date"
    bind:value={dateInput}
    onchange={updateDate}
  />
</div>

<div>
  <label for="debt-amount">
    {m.debt_form_amount()}
    {#if amount < 0}
      ({m.debt_form_amount_negative({amount: formatAmount(-amount)})})
    {:else if amount > 0}
      ({m.debt_form_amount_positive({amount: formatAmount(amount)})})
    {/if}
  </label>
  <input
    class="transition w-full mt-1 p-2 border-none rounded-md shadow-md bg-gray-50 focus:outline-none focus:ring focus:ring-green-300"
    id="debt-amount"
    type="number"
    bind:value={amount}
  />
</div>
