<script>
  let { title = 'Pracovní list – Osa úsečky' } = $props();
  
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
'    .header { text-align: center; border-bottom: 2px solid #3b82f6; padding-bottom: 12px; margin-bottom: 20px; }' +
'    .header-small { font-size: 9pt; color: #64748b; margin-bottom: 4px; }' +
'    .header-title { font-size: 18pt; font-weight: 700; color: #1e293b; margin: 8px 0; }' +
'    .student-info { display: flex; justify-content: space-between; font-size: 10pt; margin-top: 12px; padding-top: 8px; border-top: 1px solid #e2e8f0; }' +
'    .student-name { border-bottom: 1px solid #1e293b; min-width: 200px; display: inline-block; }' +
'    .example { margin-bottom: 28px; page-break-inside: avoid; }' +
'    .example-title { font-size: 13pt; font-weight: 700; color: #1e40af; margin-bottom: 8px; }' +
'    .example-task { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 12px 16px; margin-bottom: 12px; font-size: 11pt; }' +
'    .example-task strong { color: #1e40af; }' +
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
'    <div class="header-title">📐 Množina bodů – Osa úsečky – Pracovní list</div>' +
'    <div class="student-info">' +
'      <div>Datum: _______________</div>' +
'      <div>Jméno a příjmení: <span class="student-name">&nbsp;</span></div>' +
'    </div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 1: Střed úsečky a osa</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> Jsou dány body A a B, kde |AB| = 8 cm. Sestroj osu úsečky AB a vyznač její střed S. Ověř, že střed leží na ose.</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení a konstrukce:</div></div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 2: Bod na ose úsečky</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> Jsou dány body A a B, kde |AB| = 6 cm. Sestroj osu úsečky AB. Na ose vyznač bod X tak, aby |XA| = 5 cm. Ověř, že |XB| = 5 cm.</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení a konstrukce:</div></div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 3: Rovnoramenný trojúhelník</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> Je dána úsečka AB, kde |AB| = 7 cm. Najdi bod C tak, aby trojúhelník ABC byl rovnoramenný s |CA| = |CB| = 5 cm.</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení a konstrukce:</div></div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 4: Kružnice opsaná trojúhelníku</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> Je dán trojúhelník ABC s délkami stran a = 6 cm, b = 5 cm, c = 7 cm. Sestrojením os stran najdi střed kružnice opsané a kružnici narýsuj.</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení a konstrukce:</div></div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 5: Osa úsečky a přímka</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> Jsou dány body A, B (|AB| = 8 cm) a přímka <em>p</em> rovnoběžná s AB ve vzdálenosti 3 cm. Najdi na přímce <em>p</em> bod X, který je stejně vzdálený od A i B.</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení a konstrukce:</div></div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 6: Dvě osy úseček</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> Jsou dány tři body A, B, C neležící na jedné přímce (|AB| = 6 cm, |BC| = 5 cm, |AC| = 7 cm). Najdi bod X, který je stejně vzdálený od všech tří bodů. Jaká je vzdálenost |XA|?</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení a konstrukce:</div></div>' +
'  </div>' +
'  <div class="footer">© Studijní portál · Množina bodů daných vlastností – Osa úsečky</div>' +
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
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Segoe UI', system-ui, sans-serif;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
    transition: all 0.2s ease;
  }
  .pdf-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
    background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  }
  .pdf-btn:active {
    transform: translateY(0);
  }
  .pdf-btn svg {
    flex-shrink: 0;
  }
</style>
