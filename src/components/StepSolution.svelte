<script>
  let { steps = [] } = $props();
  let visibleSteps = $state(1);
  
  function showNextStep() {
    if (visibleSteps < steps.length) {
      visibleSteps++;
    }
  }
  
  function reset() {
    visibleSteps = 1;
  }
</script>

<div class="step-solution">
  {#each steps as step, i}
    {#if i < visibleSteps}
      <div class="step" class:step-new={i === visibleSteps - 1 && i > 0}>
        <div class="step-header">
          <span class="step-number">Krok {i + 1}</span>
          <span class="step-title">{step.title}</span>
        </div>
        <div class="step-content">
          {@html step.content}
        </div>
      </div>
    {/if}
  {/each}
  
  <div class="step-controls">
    {#if visibleSteps < steps.length}
      <button class="btn-next" onclick={showNextStep}>
        👉 Další krok ({visibleSteps}/{steps.length})
      </button>
    {:else}
      <div class="step-complete">
        ✅ Kompletní řešení
        <button class="btn-reset" onclick={reset}>🔄 Začít znovu</button>
      </div>
    {/if}
  </div>
</div>

<style>
  .step-solution {
    background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
    border: 2px solid #86efac;
    border-radius: 12px;
    padding: 1rem;
    margin: 0.5rem 0;
  }
  
  .step {
    background: white;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    margin-bottom: 0.75rem;
    border-left: 4px solid #22c55e;
    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.1);
  }
  
  .step-new {
    animation: slideIn 0.3s ease-out;
    border-left-color: #3b82f6;
    background: linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%);
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .step-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .step-number {
    background: #22c55e;
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    text-transform: uppercase;
  }
  
  .step-new .step-number {
    background: #3b82f6;
  }
  
  .step-title {
    font-weight: 600;
    color: #166534;
    font-size: 0.9rem;
  }
  
  .step-new .step-title {
    color: #1e40af;
  }
  
  .step-content {
    color: #374151;
    font-size: 0.9rem;
    line-height: 1.6;
  }
  
  .step-content :global(p) {
    margin: 0.25rem 0;
  }
  
  .step-content :global(.katex-display) {
    margin: 0.5rem 0;
  }
  
  .step-controls {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }
  
  .btn-next {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
  
  .btn-next:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
  }
  
  .btn-next:active {
    transform: translateY(0);
  }
  
  .step-complete {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #166534;
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  .btn-reset {
    background: #f3f4f6;
    color: #6b7280;
    border: 1px solid #d1d5db;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-reset:hover {
    background: #e5e7eb;
    color: #374151;
  }
</style>
