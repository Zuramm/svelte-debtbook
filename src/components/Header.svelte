<script>
    import { m } from "$lib/paraglide/messages";
    import { locales, setLocale } from "$lib/paraglide/runtime";

    /** @type {{ active?: 'people' | 'settings' | undefined }} */
    let { active = undefined } = $props();
</script>

<div class="bg-green-50 sticky top-0">
    <div class="max-w-lg mx-auto p-4 space-y-4">
        <div class="flex justify-between flex-row">
            <div class="flex-1 flex space-x-2">
            <h1 class="grow flex-none font-bold text-4xl text-green-900">
                {m.app_title()}
            </h1>
            <a href="/person" class="transition-colors p-2 rounded-md text-green-900 underline hover:bg-green-200 {active === 'people' ? 'bg-green-200 decoration-wavy' : ''}">People</a>
            <a href="/settings" class="transition-colors p-2 rounded-md text-green-900 underline hover:bg-green-200 {active === 'settings' ? 'bg-green-200 decoration-wavy' : ''}">Settings</a>
            {#each locales as locale}
                <button onclick={() => setLocale(locale)} class="transition-colors rounded-md px-2 py-1 bg-green-200 text-green-900 hover:bg-green-300">{locale}</button>
            {/each}
            <!-- {#if queryClient.isFetching()}
                <Spinner className="mx-4 w-5 text-green-600" />
            {/if} -->
            </div>
        </div>
    </div>
</div>