<script>
  let selectedProblems = $state([]);

  const problems = [
    {
      id: 1,
      title: 'Rovnoběžky ve vzdálenosti d – základní konstrukce',
      text: 'Je dána přímka p. Sestroj množinu všech bodů, které mají od přímky p vzdálenost d = 3 cm. Kolik přímek tvoří výslednou množinu?'
    },
    {
      id: 2,
      title: 'Bod na rovnoběžce a na kružnici',
      text: 'Je dána přímka p a bod S ležící na přímce p. Najdi všechny body X, které mají od přímky p vzdálenost 4 cm a zároveň od bodu S vzdálenost 5 cm.'
    },
    {
      id: 3,
      title: 'Pás mezi dvěma rovnoběžkami',
      text: 'Je dána přímka p. Urči množinu všech bodů X, pro které platí: d(X, p) ≤ 3 cm. Jaký útvar tato množina tvoří?'
    },
    {
      id: 4,
      title: 'Průnik rovnoběžek s osou úsečky',
      text: 'Je dána přímka p a úsečka AB, kde A leží na přímce p. Najdi body X, které jsou ve vzdálenosti 2 cm od přímky p a zároveň jsou stejně vzdálené od bodů A a B.'
    },
    {
      id: 5,
      title: 'Dvě rovnoběžné přímky – společné body',
      text: 'Jsou dány dvě rovnoběžné přímky p a q ve vzdálenosti 5 cm. Najdi množinu bodů X, které mají od přímky p vzdálenost 2 cm a od přímky q vzdálenost 3 cm.'
    },
    {
      id: 6,
      title: 'Osa pásu a kružnice',
      text: 'Jsou dány dvě rovnoběžné přímky p₁ a p₂ ve vzdálenosti 6 cm. Mezi nimi leží bod S ve vzdálenosti 3 cm od obou přímek. Najdi body X, které leží na ose pásu a zároveň mají od bodu S vzdálenost 4 cm.'
    }
  ];

  function toggleProblem(id) {
    if (selectedProblems.includes(id)) {
      selectedProblems = selectedProblems.filter(p => p !== id);
    } else {
      selectedProblems = [...selectedProblems, id];
    }
  }

  function selectAll() {
    selectedProblems = problems.map(p => p.id);
  }

  function generatePdf() {
    const selected = problems.filter(p => selectedProblems.includes(p.id));
    if (selected.length === 0) { alert('Vyber alespoň jeden příklad!'); return; }
    const isGeometry = true;
    const singleProblemClass = selected.length === 1 ? 'single-problem' : '';
    const layoutClass = isGeometry ? 'geometry-layout' : 'standard-layout';

    const content = selected.map((p, i) => `
      <div class="problem">
        <h3>Příklad ${i + 1}: ${p.title}</h3>
        <p>${p.text}</p>
        <div class="workspace">
          <p class="ws-label">Místo pro řešení a konstrukci:</p>
          <div class="ws-space"></div>
        </div>
      </div>
    `).join('');

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Rovnoběžky – Příklady</title>
    <style>
      @page{size:A4;margin:2cm}
      body{font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;line-height:1.6}
      h1{text-align:center;color:#1e3a8a;font-size:22px;margin-bottom:12px}
      .student-info{display:flex;justify-content:space-between;border-bottom:2px solid #dbeafe;padding-bottom:10px;margin-bottom:20px;font-size:13px;color:#1e293b}
      .student-info span{border-bottom:1px solid #1e293b;min-width:180px;display:inline-block;margin-left:6px}
      .problem{page-break-inside:avoid;margin-bottom:14px;border:1px solid #e2e8f0;border-radius:8px;padding:16px;display:flex;flex-direction:column}
      .problem:last-child{margin-bottom:0}
      h3{color:#1e3a8a;font-size:15px;margin:0 0 8px 0;border-bottom:2px solid #dbeafe;padding-bottom:6px}
      p{margin:0 0 8px 0;font-size:14px}
      .workspace{margin-top:10px;display:flex;flex-direction:column;flex:1}
      .ws-label{font-size:11px;color:#94a3b8;margin-bottom:4px}
      .ws-space{min-height:300px;border:1px solid #e2e8f0;border-radius:6px;flex:1}
      .single-problem .ws-space{min-height:420px}
      .geometry-layout .problem{min-height:9.6cm}
      .geometry-layout .workspace{flex:1}
      .geometry-layout .ws-space{min-height:6cm}
      .geometry-layout.single-problem .problem{min-height:auto}
      .geometry-layout.single-problem .ws-space{min-height:12cm}
      .standard-layout .ws-space{min-height:5cm;max-height:5cm}
    </style></head><body class="${layoutClass} ${singleProblemClass}">
    <h1>📏 Množina bodů – Rovnoběžky – Pracovní list</h1>
    <div class="student-info"><div>Příjmení a jméno žáka: <span>&nbsp;</span></div><div>Datum: <span>&nbsp;</span></div></div>
    ${content}
    </body></html>`;

    const w = window.open('', '_blank');
    w.document.write(html);
    w.document.close();
    setTimeout(() => w.print(), 500);
  }
</script>

<div class="pdf-gen">
  <div class="pdf-header">
    <div class="pdf-icon">🖨️</div>
    <div>
      <h3 class="pdf-title">Vygeneruj PDF s příklady</h3>
      <p class="pdf-sub">Vyber příklady a vytiskni si je na papír</p>
    </div>
  </div>

  <div class="pdf-list">
    {#each problems as p}
      <label class="pdf-item" class:selected={selectedProblems.includes(p.id)}>
        <input type="checkbox" checked={selectedProblems.includes(p.id)} onchange={() => toggleProblem(p.id)} />
        <span class="pdf-item-title">{p.title}</span>
        <span class="pdf-item-text">{p.text}</span>
      </label>
    {/each}
  </div>

  <div class="pdf-actions">
    <button class="pdf-btn pdf-btn-all" onclick={selectAll}>☑️ Vybrat vše</button>
    <button class="pdf-btn pdf-btn-gen" onclick={generatePdf}>🖨️ Vygenerovat příklady do PDF ({selectedProblems.length})</button>
  </div>
</div>

<style>
  .pdf-gen {
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 14px;
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
  .pdf-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
  .pdf-icon { font-size: 2rem; }
  .pdf-title { font-size: 1.1rem; font-weight: 700; color: #1e3a8a; margin: 0; }
  .pdf-sub { font-size: 0.8rem; color: #64748b; margin: 0; }
  .pdf-list { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
  .pdf-item {
    display: flex; align-items: flex-start; gap: 0.75rem;
    padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 8px;
    background: white; cursor: pointer; transition: all 0.15s;
  }
  .pdf-item:hover { border-color: #93c5fd; }
  .pdf-item.selected { border-color: #3b82f6; background: #eff6ff; }
  .pdf-item input[type="checkbox"] { margin-top: 3px; accent-color: #3b82f6; }
  .pdf-item-title { font-weight: 700; color: #1e3a8a; font-size: 0.9rem; white-space: nowrap; }
  .pdf-item-text { font-size: 0.8rem; color: #64748b; }
  .pdf-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
  .pdf-btn {
    padding: 0.6rem 1.2rem; border-radius: 8px; border: none;
    font-weight: 700; font-size: 0.9rem; cursor: pointer;
    font-family: inherit; transition: all 0.15s;
  }
  .pdf-btn-all { background: #e2e8f0; color: #334155; }
  .pdf-btn-all:hover { background: #cbd5e1; }
  .pdf-btn-gen { background: #3b82f6; color: white; }
  .pdf-btn-gen:hover { background: #2563eb; }
</style>
