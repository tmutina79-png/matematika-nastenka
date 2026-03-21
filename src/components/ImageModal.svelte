<script>
  let { src, alt = '', class: className = '' } = $props();
  let open = $state(false);

  function onKey(e) {
    if (!open) return;
    if (e.key === 'Escape') open = false;
  }
</script>

<svelte:window onkeydown={onKey} />

<div class={className}>
  <button class="img-btn" onclick={() => open = true} aria-label="Zvětšit obrázek">
    <img {src} {alt} class="img-preview" />
    <div class="zoom-hint">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/><line x1="8" y1="11" x2="14" y2="11"/><line x1="11" y1="8" x2="11" y2="14"/></svg>
      <span>Zvětšit</span>
    </div>
  </button>
</div>

{#if open}
  <div class="modal-backdrop" role="dialog" aria-modal="true" onclick={() => open = false}>
    <button class="modal-close" onclick={() => open = false} aria-label="Zavřít">✕</button>
    <img src={src} alt={alt} class="modal-img" />
  </div>
{/if}

<style>
  .img-btn {
    all: unset;
    cursor: zoom-in;
    display: block;
    width: 100%;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .img-btn:hover {
    transform: scale(1.01);
    box-shadow: 0 6px 24px rgba(59, 130, 246, 0.2);
  }
  .img-preview {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 12px;
  }
  .zoom-hint {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(15, 23, 42, 0.75);
    color: #e2e8f0;
    font-size: 12px;
    font-weight: 600;
    font-family: 'Segoe UI', system-ui, sans-serif;
    padding: 5px 10px;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
  }
  .img-btn:hover .zoom-hint { opacity: 1; }

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
    background: rgba(0, 0, 0, 0.92);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
  }

  .modal-img {
    max-width: 90vw;
    max-height: 90vh;
    width: auto;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    background: #fff;
  }

  .modal-close {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    font-size: 22px;
    border: none;
    cursor: pointer;
    z-index: 100000;
  }
  .modal-close:hover {
    background: rgba(255, 255, 255, 0.25);
  }
</style>
