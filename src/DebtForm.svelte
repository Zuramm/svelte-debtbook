<script>
  export let amount = 0;
  export let date = new Date().toISOString();
  export let description = "";
</script>

<div>
  <label for="debt-description">Description</label>
  <input
    class="transition w-full mt-1 p-2 border-none rounded-md shadow-md bg-gray-50 focus:outline-none focus:ring focus:ring-green-300"
    id="debt-description"
    type="text"
    bind:value={description}
  />
</div>

<div>
  <label for="debt-date">Date</label>
  <input
    class="transition w-full mt-1 p-2 border-none rounded-md shadow-md bg-gray-50 focus:outline-none focus:ring focus:ring-green-300"
    id="debt-date"
    type="date"
    bind:value={date}
  />
</div>

<div>
  <label for="debt-amount">
    Amount
    {#if amount < 0}
      (you owe someone {Math.abs(amount).toLocaleString(undefined, { style: "currency", currency: "EUR" })})
    {:else if amount > 0}
      (someone owes you {amount.toLocaleString(undefined, { style: "currency", currency: "EUR" })})
    {:else}
      (someone owes you)
    {/if}
  </label>
  <input
    class="transition w-full mt-1 p-2 border-none rounded-md shadow-md bg-gray-50 focus:outline-none focus:ring focus:ring-green-300"
    id="debt-amount"
    type="number"
    bind:value={amount}
  />
</div>
