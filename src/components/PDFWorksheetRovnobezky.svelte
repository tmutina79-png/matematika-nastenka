<script>
  let { title = 'Pracovní list – Rovnoběžky' } = $props();
  
  function generatePDF() {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Povol vyskakovací okna pro generování PDF');
      return;
    }
    
    const pageTitle = title;
    
    const html = '<!DOCTYPE html>' +
'<html lang="cs">' +
'<head>' +
'  <meta charset="UTF-8">' +
'  <title>' + pageTitle + '</title>' +
'  <style>' +
'    * { margin: 0; padding: 0; box-sizing: border-box; }' +
'    @page { size: A4; margin: 15mm 20mm 20mm 20mm; }' +
'    body { font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; }' +
'    .header { text-align: center; border-bottom: 2px solid #0d9488; padding-bottom: 12px; margin-bottom: 20px; }' +
'    .header-small { font-size: 9pt; color: #64748b; margin-bottom: 4px; }' +
'    .header-title { font-size: 18pt; font-weight: 700; color: #1e293b; margin: 8px 0; }' +
'    .student-info { display: flex; justify-content: space-between; font-size: 10pt; margin-top: 12px; padding-top: 8px; border-top: 1px solid #e2e8f0; }' +
'    .student-name { border-bottom: 1px solid #1e293b; min-width: 200px; display: inline-block; }' +
'    .example { margin-bottom: 28px; page-break-inside: avoid; }' +
'    .example-title { font-size: 13pt; font-weight: 700; color: #115e59; margin-bottom: 8px; }' +
'    .example-task { background: #f0fdfa; border-left: 4px solid #0d9488; padding: 12px 16px; margin-bottom: 12px; font-size: 11pt; }' +
'    .example-task strong { color: #115e59; }' +
'    .example-task em { font-style: italic; }' +
'    .solution-space { border: 1px solid #cbd5e1; border-radius: 8px; min-height: 140px; padding: 12px; }' +
'    .solution-label { font-size: 9pt; color: #94a3b8; margin-bottom: 8px; }' +
'    .footer { margin-top: 30px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 9pt; color: #94a3b8; text-align: center; }' +
'    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }' +
'  </style>' +
'</head>' +
'<body>' +
'  <div class="header">' +
'    <div class="header-small">Studijní materiál vytvořený: Ing. Tomáš Mutina, Mgr. Aleš Bajnar</div>' +
'    <div class="header-title">📏 Množina bodů – Rovnoběžky – Pracovní list</div>' +
'    <div class="student-info">' +
'      <div>Datum: _______________</div>' +
'      <div>Jméno a příjmení: <span class="student-name">&nbsp;</span></div>' +
'    </div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 1: Rovnoběžky ve vzdálenosti d – základní konstrukce</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> Je dána přímka p. Sestroj množinu všech bodů, které mají od přímky p vzdálenost d = 3 cm. Kolik přímek tvoří výslednou množinu?</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení a konstrukce:</div></div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 2: Bod na rovnoběžce a na kružnici</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> Je dána přímka p a bod S ležící na přímce p. Najdi všechny body X, které mají od přímky p vzdálenost 4 cm a zároveň od bodu S vzdálenost 5 cm.</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení a konstrukce:</div></div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 3: Pás mezi dvěma rovnoběžkami</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> Je dána přímka p. Urči množinu všech bodů X, pro které platí: d(X, p) ≤ 3 cm. Jaký útvar tato množina tvoří?</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení a konstrukce:</div></div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 4: Průnik rovnoběžek s osou úsečky</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> Je dána přímka p a úsečka AB, kde A leží na přímce p. Najdi body X, které jsou ve vzdálenosti 2 cm od přímky p a zároveň jsou stejně vzdálené od bodů A a B.</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení a konstrukce:</div></div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 5: Dvě rovnoběžné přímky – společné body</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> Jsou dány dvě rovnoběžné přímky p a q ve vzdálenosti 5 cm. Najdi množinu bodů X, které mají od přímky p vzdálenost 2 cm a od přímky q vzdálenost 3 cm.</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení a konstrukce:</div></div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 6: Osa pásu a kružnice</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> Jsou dány dvě rovnoběžné přímky p₁ a p₂ ve vzdálenosti 6 cm. Mezi nimi leží bod S ve vzdálenosti 3 cm od obou přímek. Najdi body X, které leží na ose pásu a zároveň mají od bodu S vzdálenost 4 cm.</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení a konstrukce:</div></div>' +
'  </div>' +
'  <div class="footer">© Studijní portál · Množina bodů daných vlastností – Rovnoběžky</div>' +
'  <script>window.onload = function() { window.print(); };<\/script>' +
'</body>' +
'</html>';
    
    printWindow.document.write(html);
    printWindow.document.close();
  }
</script>

<button class="pdf-btn" onclick={generatePDF} aria-label="Stáhnout PDF pracovní list">
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
    <polyline points="14 2 14 8 20 8" fill="none" stroke="currentColor" stroke-width="2"/>
    <line x1="12" y1="18" x2="12" y2="12" stroke="white" stroke-width="2"/>
    <polyline points="9 15 12 18 15 15" fill="none" stroke="white" stroke-width="2"/>
  </svg>
  <span>Stáhnout PDF</span>
</button>

<style>
  .pdf-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    background: linear-gradient(135deg, #0d9488 0%, #115e59 100%);
    color: white;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Segoe UI', system-ui, sans-serif;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(13, 148, 136, 0.4);
    transition: all 0.2s ease;
  }
  .pdf-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(13, 148, 136, 0.5);
    background: linear-gradient(135deg, #0f766e 0%, #134e4a 100%);
  }
  .pdf-btn:active {
    transform: translateY(0);
  }
  .pdf-btn svg {
    flex-shrink: 0;
  }
</style>
