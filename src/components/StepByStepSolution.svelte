<script>
  let { steps = [], hint = "" } = $props();
  let currentStep = $state(0);
  let showHint = $state(false);
</script>

<div class="step-solution my-4">
  <!-- Nápověda -->
  {#if hint}
    <button
      class="hint-btn w-full text-left px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors mb-3"
      onclick={() => showHint = !showHint}
    >
      <span class="flex items-center gap-2">
        <span class="text-amber-600">💡</span>
        <span class="font-medium text-amber-800">Nápověda</span>
        <svg class="w-4 h-4 ml-auto transition-transform text-amber-600 {showHint ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </span>
    </button>
    {#if showHint}
      <div class="hint-content px-4 py-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg mb-4 text-amber-900">
        {@html hint}
      </div>
    {/if}
  {/if}

  <!-- Postup řešení -->
  <div class="steps-container">
    <button
      class="steps-btn w-full text-left px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
      onclick={() => { if (currentStep === 0) currentStep = 1; else currentStep = 0; }}
    >
      <span class="flex items-center gap-2">
        <span class="text-blue-600">📝</span>
        <span class="font-medium text-blue-800">Postup řešení ({currentStep}/{steps.length} kroků)</span>
        <svg class="w-4 h-4 ml-auto transition-transform text-blue-600 {currentStep > 0 ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </span>
    </button>

    {#if currentStep > 0}
      <div class="steps-content mt-3 space-y-2">
        {#each steps.slice(0, currentStep) as step, i}
          <div class="step px-4 py-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
            <div class="flex items-start gap-3">
              <span class="step-number shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div class="step-text text-blue-900">
                {@html step}
              </div>
            </div>
          </div>
        {/each}

        <!-- Tlačítka pro navigaci -->
        <div class="flex gap-2 mt-4">
          {#if currentStep < steps.length}
            <button
              class="next-step-btn px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              onclick={() => currentStep++}
            >
              <span>Další krok</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          {:else}
            <div class="complete-badge px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium flex items-center gap-2">
              <span>✅</span>
              <span>Kompletní řešení</span>
            </div>
          {/if}
          
          {#if currentStep > 1}
            <button
              class="reset-btn px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              onclick={() => currentStep = 1}
            >
              ↩️ Od začátku
            </button>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .step-solution {
    font-family: system-ui, -apple-system, sans-serif;
  }
  
  .step-text :global(strong) {
    color: #1e40af;
  }
  
  .hint-content :global(strong) {
    color: #92400e;
  }
</style>
