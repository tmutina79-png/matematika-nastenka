<script>
  import { onMount } from 'svelte';

  let { problems = [] } = $props();
  let count = $state(5);
  let generated = $state([]);
  let revealed = $state({});
  let score = $state(null);

  function generate() {
    const shuffled = [...problems].sort(() => Math.random() - 0.5);
    generated = shuffled.slice(0, Math.min(count, shuffled.length)).map((p, i) => ({ ...p, idx: i }));
    revealed = {};
    score = null;
  }

  function reveal(idx) {
    revealed = { ...revealed, [idx]: true };
  }

  function revealAll() {
    const r = {};
    generated.forEach((_, i) => r[i] = true);
    revealed = r;
    score = generated.length;
  }

  let allRevealed = $derived(Object.keys(revealed).length === generated.length && generated.length > 0);
</script>

<div class="tg-wrap">
  <div class="tg-header">
    <div class="tg-icon-box">🎯</div>
    <div>
      <h3 class="tg-title">Generátor testů</h3>
      <p class="tg-sub">Vyber počet otázek a vygeneruj si test</p>
    </div>
  </div>

  <div class="tg-controls">
    <label class="tg-label">
      Počet otázek:
      <select class="tg-select" bind:value={count}>
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={8}>8</option>
        <option value={10}>10</option>
      </select>
    </label>
    <button class="tg-btn-gen" onclick={generate}>
      🎲 Vygenerovat test
    </button>
  </div>

  {#if generated.length > 0}
    <div class="tg-test">
      <div class="tg-test-header">
        <span class="tg-test-badge">📋 Test – {generated.length} otázek</span>
        {#if !allRevealed}
          <button class="tg-btn-small" onclick={revealAll}>Zobrazit vše</button>
        {/if}
      </div>

      <ol class="tg-questions">
        {#each generated as q, i (i)}
          <li class="tg-q">
            <div class="tg-q-top">
              <span class="tg-q-cat">{q.category}</span>
              <span class="tg-q-num">#{i + 1}</span>
            </div>
            <p class="tg-q-text">{q.question}</p>
            {#if revealed[i]}
              <div class="tg-q-answer">
                <span class="tg-q-answer-label">Řešení:</span>
                <p class="tg-q-answer-text">{q.answer}</p>
              </div>
            {:else}
              <button class="tg-btn-reveal" onclick={() => reveal(i)}>
                👁️ Ukázat řešení
              </button>
            {/if}
          </li>
        {/each}
      </ol>

      {#if allRevealed}
        <div class="tg-eval">
          <p class="tg-eval-title">Jak se ti dařilo?</p>
          <p class="tg-eval-text">Spočítej si, kolik otázek jsi zodpověděl/a správně <strong>před</strong> zobrazením řešení.</p>
          <div class="tg-eval-options">
            <button class="tg-eval-btn tg-eval-pass" onclick={() => { score = 'pass'; }}>✅ 80 % a více správně</button>
            <button class="tg-eval-btn tg-eval-fail" onclick={() => { score = 'fail'; }}>❌ Méně než 80 %</button>
          </div>
          {#if score === 'pass'}
            <div class="tg-eval-msg tg-eval-msg-pass">🎉 Výborně! Látku máš dobře zvládnutou.</div>
          {/if}
          {#if score === 'fail'}
            <div class="tg-eval-msg tg-eval-msg-fail">⚠️ Zdá se, že jsi danému tématu dostatečně neporozuměl/a. Prostuduj si látku znovu a vygeneruj si nový test.</div>
          {/if}
        </div>
        <div class="tg-done">
          <span>✅ Test dokončen!</span>
          <button class="tg-btn-gen" onclick={generate}>🔄 Nový test</button>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .tg-wrap{background:#fff;border-radius:20px;padding:24px;box-shadow:0 1px 3px rgba(0,0,0,.05),0 6px 24px rgba(0,0,0,.04);border:1px solid #e5e7eb}
  .tg-header{display:flex;align-items:center;gap:12px;margin-bottom:18px}
  .tg-icon-box{font-size:28px;width:48px;height:48px;display:flex;align-items:center;justify-content:center;background:#ede9fe;border-radius:14px}
  .tg-title{font-size:17px;font-weight:700;color:#111827;margin:0}
  .tg-sub{font-size:12px;color:#6b7280;margin:2px 0 0}

  .tg-controls{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px}
  .tg-label{font-size:13px;font-weight:600;color:#374151;display:flex;align-items:center;gap:8px}
  .tg-select{padding:6px 12px;border-radius:10px;border:1px solid #d1d5db;font-size:13px;background:#f9fafb;font-family:inherit}
  .tg-btn-gen{padding:9px 18px;background:#4f46e5;color:#fff;border:none;border-radius:12px;font-size:13px;font-weight:600;cursor:pointer;transition:background .15s;font-family:inherit}
  .tg-btn-gen:hover{background:#4338ca}
  .tg-btn-gen:active{transform:scale(.97)}
  .tg-btn-small{padding:5px 12px;background:#f3f4f6;color:#374151;border:1px solid #e5e7eb;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit}
  .tg-btn-small:hover{background:#e5e7eb}

  .tg-test{margin-top:4px}
  .tg-test-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
  .tg-test-badge{font-size:13px;font-weight:700;color:#4f46e5;background:#eef2ff;padding:4px 14px;border-radius:99px}

  .tg-questions{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
  .tg-q{padding:14px;background:#f9fafb;border:1px solid #f3f4f6;border-radius:14px}
  .tg-q-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
  .tg-q-cat{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#6366f1;background:#eef2ff;padding:2px 8px;border-radius:99px}
  .tg-q-num{font-size:11px;color:#9ca3af;font-weight:600}
  .tg-q-text{font-size:14px;font-weight:600;color:#1f2937;margin:0;line-height:1.5}

  .tg-btn-reveal{margin-top:8px;padding:6px 14px;background:#eef2ff;color:#4338ca;border:none;border-radius:10px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:background .15s}
  .tg-btn-reveal:hover{background:#e0e7ff}

  .tg-q-answer{margin-top:10px;padding:12px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:10px;animation:fadeIn .3s ease}
  @keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
  .tg-q-answer-label{font-size:11px;font-weight:700;color:#065f46}
  .tg-q-answer-text{font-size:13px;color:#064e3b;font-weight:500;margin:4px 0 0}

  .tg-done{display:flex;align-items:center;justify-content:space-between;margin-top:14px;padding:12px 16px;background:#ecfdf5;border-radius:12px;font-size:14px;font-weight:700;color:#065f46}

  .tg-eval{margin-top:16px;padding:16px;background:#fefce8;border:1px solid #fde68a;border-radius:14px;text-align:center}
  .tg-eval-title{font-size:15px;font-weight:700;color:#92400e;margin:0 0 4px}
  .tg-eval-text{font-size:12px;color:#78716c;margin:0 0 12px}
  .tg-eval-options{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
  .tg-eval-btn{padding:8px 18px;border:2px solid;border-radius:12px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .15s}
  .tg-eval-pass{border-color:#86efac;background:#f0fdf4;color:#166534}
  .tg-eval-pass:hover{background:#dcfce7}
  .tg-eval-fail{border-color:#fcd34d;background:#fffbeb;color:#92400e}
  .tg-eval-fail:hover{background:#fef3c7}
  .tg-eval-msg{margin-top:12px;padding:10px 14px;border-radius:10px;font-size:13px;font-weight:600;animation:fadeIn .3s ease}
  .tg-eval-msg-pass{background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46}
  .tg-eval-msg-fail{background:#fff7ed;border:1px solid #fed7aa;color:#9a3412}
</style>