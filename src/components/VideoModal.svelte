<script>
  let { src = '', title = 'Vizualizace', thumbnailImg = '' } = $props();
  let open = $state(false);
  let iframeEl = $state(null);
  let isPlaying = $state(true);

  function close(e) {
    if (e.target === e.currentTarget) open = false;
  }

  function onKey(e) {
    if (!open) return;
    if (e.key === 'Escape') open = false;
    if (e.key === 'ArrowLeft') sendCmd('rew');
    if (e.key === 'ArrowRight') sendCmd('fwd');
    if (e.key === ' ') { e.preventDefault(); sendCmd('toggle'); }
  }

  function sendCmd(cmd) {
    if (!iframeEl?.contentWindow) return;
    try {
      // Posílám zprávu přímo do iframe pomocí postMessage
      iframeEl.contentWindow.postMessage(cmd, '*');
      if (cmd === 'toggle') {
        isPlaying = !isPlaying;
      }
      if (cmd === 'stop') {
        isPlaying = false;
      }
    } catch(e) { /* cross-origin guard */ }
  }
</script>

<svelte:window onkeydown={onKey} />

<!-- Thumbnail -->
{#if thumbnailImg}
<button class="img-thumbnail" onclick={() => { open = true; isPlaying = true; }} aria-label="Přehrát vizualizaci">
  <img src={thumbnailImg} alt={title} class="img-thumb-pic" />
  <div class="img-play-overlay">
    <div class="play-btn">
      <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
        <path d="M8 5v14l11-7z"/>
      </svg>
    </div>
    <span class="img-play-label">▶ Přehrát vizualizaci</span>
  </div>
</button>
{:else}
<button class="thumbnail" onclick={() => { open = true; isPlaying = true; }} aria-label="Přehrát vizualizaci">
  <div class="thumb-inner">
    <div class="thumb-preview">
      <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="80" rx="6" fill="#0f172a"/>
        <line x1="10" y1="60" x2="110" y2="60" stroke="#334155" stroke-width="1"/>
        <line x1="20" y1="10" x2="20" y2="70" stroke="#334155" stroke-width="1"/>
        <path d="M20,58 Q40,55 55,45 Q70,30 85,18 Q95,12 110,10" stroke="#3b82f6" stroke-width="2" fill="none" stroke-linecap="round"/>
        <circle cx="40" cy="53" r="2.5" fill="#f59e0b"/>
        <circle cx="65" cy="35" r="2.5" fill="#f59e0b"/>
        <circle cx="90" cy="16" r="2.5" fill="#f59e0b"/>
      </svg>
    </div>
    <div class="play-overlay">
      <div class="play-btn">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    </div>
    <div class="thumb-label">
      <span class="thumb-icon">🎬</span>
      <span>{title}</span>
    </div>
  </div>
</button>
{/if}

<!-- Modal -->
{#if open}
  <div class="modal-backdrop" onclick={close} role="dialog" aria-modal="true">
    <div class="modal-container">
      <div class="modal-header">
        <span class="modal-title">{title}</span>
        <div class="modal-controls">
          <button class="ctrl-btn" onclick={() => sendCmd('rew')} aria-label="Posun zpět o 0,3s" title="⏪ -0,3s">⏪</button>
          <button class="ctrl-btn" onclick={() => sendCmd('stop')} aria-label="Stop" title="⏹ Stop">⏹</button>
          <button class="ctrl-btn ctrl-play" onclick={() => sendCmd('toggle')} aria-label={isPlaying ? 'Pauza' : 'Přehrát'} title={isPlaying ? '⏸ Pauza' : '▶ Přehrát'}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button class="ctrl-btn" onclick={() => sendCmd('fwd')} aria-label="Posun vpřed o 0,3s" title="⏩ +0,3s">⏩</button>
        </div>
        <button class="modal-close" onclick={() => open = false} aria-label="Zavřít">✕</button>
      </div>
      <div class="modal-body">
        <iframe bind:this={iframeEl} {src} title={title} frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  </div>
{/if}

<style>
  .thumbnail {
    all: unset;
    cursor: pointer;
    display: block;
    width: 200px;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(30, 58, 95, 0.18), 0 1.5px 6px rgba(0,0,0,0.10);
    transition: transform 0.22s ease, box-shadow 0.22s ease;
    background: #0f172a;
    border: 2px solid #1e3a5f;
  }
  .thumbnail:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.25), 0 2px 8px rgba(0,0,0,0.15);
    border-color: #3b82f6;
  }
  .thumbnail:active { transform: scale(0.98); }

  .thumb-inner { position: relative; }

  .thumb-preview {
    width: 100%;
    aspect-ratio: 3/2;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  }
  .thumb-preview svg { width: 100%; height: auto; }

  .play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15, 23, 42, 0.35);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .thumbnail:hover .play-overlay { opacity: 1; }

  .play-btn {
    width: 48px; height: 48px;
    border-radius: 50%;
    background: rgba(59, 130, 246, 0.85);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 12px rgba(59,130,246,0.4);
  }

  .thumb-label {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 12px;
    background: #1e293b;
    color: #e2e8f0;
    font-size: 13px;
    font-weight: 600;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }
  .thumb-icon { font-size: 15px; }

  /* ── Image Thumbnail ── */
  .img-thumbnail {
    all: unset;
    cursor: pointer;
    display: block;
    width: 100%;
    max-width: 280px;
    margin: 1.5rem 0;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 24px rgba(30, 58, 95, 0.18);
    transition: transform 0.22s ease, box-shadow 0.22s ease;
    border: 2px solid #1e3a5f;
  }
  .img-thumbnail:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.25);
    border-color: #3b82f6;
  }
  .img-thumbnail:active { transform: scale(0.99); }
  .img-thumb-pic {
    display: block;
    width: 100%;
    height: auto;
  }
  .img-play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: rgba(15, 23, 42, 0.0);
    transition: background 0.25s;
  }
  .img-thumbnail:hover .img-play-overlay {
    background: rgba(15, 23, 42, 0.55);
  }
  .img-play-overlay .play-btn {
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.25s, transform 0.25s;
  }
  .img-thumbnail:hover .img-play-overlay .play-btn {
    opacity: 1;
    transform: scale(1);
  }
  .img-play-label {
    color: #e2e8f0;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Segoe UI', system-ui, sans-serif;
    opacity: 0;
    transition: opacity 0.25s;
    text-shadow: 0 1px 4px rgba(0,0,0,0.6);
  }
  .img-thumbnail:hover .img-play-label {
    opacity: 1;
  }

  /* ── Modal ── */
  .modal-backdrop {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0, 0, 0, 0.82);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal-container {
    background: #0f172a;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 24px 80px rgba(0,0,0,0.6);
    border: 1px solid #1e3a5f;
    animation: scaleIn 0.25s ease;
    width: min(92vw, 1000px);
    height: min(85vh, 700px);
    display: flex;
    flex-direction: column;
  }
  @keyframes scaleIn { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }

  .modal-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 20px;
    background: #1e293b;
    border-bottom: 1px solid #334155;
    gap: 16px;
    flex-shrink: 0;
  }
  .modal-title {
    color: #e2e8f0; font-size: 15px; font-weight: 600;
    font-family: 'Segoe UI', system-ui, sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .modal-controls {
    display: flex; align-items: center; gap: 6px;
    flex-shrink: 0;
  }
  .ctrl-btn {
    all: unset; cursor: pointer;
    color: #cbd5e1;
    font-size: 18px;
    width: 38px; height: 34px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 8px;
    background: #0f172a;
    border: 1px solid #334155;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .ctrl-btn:hover { background: #334155; border-color: #60a5fa; color: #e2e8f0; }
  .ctrl-btn:active { background: #475569; }
  .ctrl-play { font-size: 20px; width: 44px; }

  .modal-close {
    all: unset; cursor: pointer;
    color: #94a3b8; font-size: 18px;
    width: 34px; height: 34px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 8px;
    border: 1px solid transparent;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    flex-shrink: 0;
  }
  .modal-close:hover { background: #7f1d1d; color: #fecaca; border-color: #ef4444; }

  .modal-body {
    flex: 1;
    min-height: 0;
  }
  .modal-body iframe {
    width: 100%; height: 100%; border: none;
  }
</style>