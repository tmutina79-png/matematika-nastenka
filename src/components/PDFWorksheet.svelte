<script>
  let selectedProblems = $state([]);

  const problems = [
    {
      id: 1,
      title: 'Umístění studny',
      text: 'Dva sousedé (domy A a B) chtějí vykopat společnou studnu tak, aby byla od obou domů stejně daleko. Kde může studna ležet?'
    },
    {
      id: 2,
      title: 'Dosah WiFi routeru',
      text: 'WiFi router má dosah 15 metrů. Router je umístěn uprostřed obývacího pokoje. Kde všude bude signál dostupný?'
    },
    {
      id: 3,
      title: 'Železniční trať',
      text: 'Podél železniční tratě (přímky p) se nesmí stavět blíže než 50 metrů. Kde přesně je hranice, za kterou už stavět lze?'
    },
    {
      id: 4,
      title: 'Rozhodčí na hřišti',
      text: 'Rozhodčí chce stát tak, aby měl stejný výhled na obě branky (body A a B). Kde se má postavit?'
    },
    {
      id: 5,
      title: 'Kamera na rohu budovy',
      text: 'Na rohu budovy (kde se stýkají dvě zdi p a q) má být umístěna bezpečnostní kamera tak, aby sledovala obě zdi stejně. Kam ji umístit?'
    },
    {
      id: 6,
      title: 'Hledání pokladu',
      text: 'Piráti ukryli poklad přesně 100 kroků od starého dubu (bod D) a zároveň 80 kroků od skály (bod S). Kde může poklad být, pokud víme, že |DS| = 120 kroků?'
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

    const content = selected.map((p, i) => `
      <div class="problem">
        <h3>Příklad ${i + 1}: ${p.title}</h3>
        <p>${p.text}</p>
        <div class="workspace">
          <p class="ws-label">Místo pro řešení a konstrukci:</p>
          <div class="ws-lines">${'<div class="line"></div>'.repeat(8)}</div>
        </div>
      </div>
    `).join('');

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Množina bodů – Příklady</title>
    <style>
      @page{size:A4;margin:2cm}
      body{font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;line-height:1.6}
      h1{text-align:center;color:#1e3a8a;font-size:22px;margin-bottom:5px}
      .subtitle{text-align:center;color:#64748b;font-size:13px;margin-bottom:25px}
      .problem{page-break-inside:avoid;margin-bottom:30px;border:1px solid #e2e8f0;border-radius:8px;padding:16px}
      h3{color:#1e3a8a;font-size:15px;margin:0 0 8px 0;border-bottom:2px solid #dbeafe;padding-bottom:6px}
      p{margin:0 0 8px 0;font-size:14px}
      .workspace{margin-top:10px}
      .ws-label{font-size:11px;color:#94a3b8;margin-bottom:4px}
      .line{border-bottom:1px dotted #cbd5e1;height:28px}
      .footer{text-align:center;font-size:10px;color:#94a3b8;margin-top:30px;border-top:1px solid #e2e8f0;padding-top:8px}
    </style></head><body>
    <h1>📐 Množina bodů daných vlastností – Pracovní list</h1>
    <p class="subtitle">Studijní materiál: Ing. Tomáš Mutina, Mgr. Aleš Bajnar | ${new Date().toLocaleDateString('cs-CZ')}</p>
    ${content}
    <div class="footer">Studijní portál – Matematika | Vygenerováno ${new Date().toLocaleDateString('cs-CZ')}</div>
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
