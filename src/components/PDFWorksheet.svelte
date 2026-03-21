<script>
  let { title = 'Pracovní list' } = $props();
  
  function generatePDF() {
    // Vytvoření nového okna s tiskovým obsahem
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
'    .solution-space { border: 1px dashed #cbd5e1; border-radius: 8px; min-height: 120px; padding: 12px; background: #fafafa; }' +
'    .solution-label { font-size: 9pt; color: #94a3b8; margin-bottom: 8px; }' +
'    .solution-lines { border-bottom: 1px solid #e2e8f0; height: 24px; }' +
'    .footer { margin-top: 30px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 9pt; color: #94a3b8; text-align: center; }' +
'    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }' +
'  </style>' +
'</head>' +
'<body>' +
'  <div class="header">' +
'    <div class="header-small">Studijní materiál vytvořený: Ing. Tomáš Mutina, Mgr. Aleš Bajnar</div>' +
'    <div class="header-title">📐 Množina bodů daných vlastností – Pracovní list</div>' +
'    <div class="student-info">' +
'      <div>Datum: _______________</div>' +
'      <div>Jméno a příjmení: <span class="student-name">&nbsp;</span></div>' +
'    </div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 1: Umístění studny</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> Dva sousedé (domy A a B) chtějí vykopat společnou studnu tak, aby byla od obou domů stejně daleko. Kde může studna ležet?</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení:</div><div class="solution-lines"></div><div class="solution-lines"></div><div class="solution-lines"></div><div class="solution-lines"></div></div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 2: Dosah WiFi routeru</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> WiFi router má dosah 15 metrů. Router je umístěn uprostřed obývacího pokoje. Kde všude bude signál dostupný?</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení:</div><div class="solution-lines"></div><div class="solution-lines"></div><div class="solution-lines"></div><div class="solution-lines"></div></div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 3: Železniční trať</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> Podél železniční tratě (přímky p) se nesmí stavět blíže než 50 metrů. Kde přesně je hranice, za kterou už stavět lze?</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení:</div><div class="solution-lines"></div><div class="solution-lines"></div><div class="solution-lines"></div><div class="solution-lines"></div></div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 4: Rozhodčí na hřišti</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> Rozhodčí chce stát tak, aby měl stejný výhled na obě branky (body A a B). Kde se má postavit?</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení:</div><div class="solution-lines"></div><div class="solution-lines"></div><div class="solution-lines"></div><div class="solution-lines"></div></div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 5: Kamera na rohu budovy</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> Na rohu budovy (kde se stýkají dvě zdi p a q) má být umístěna bezpečnostní kamera tak, aby sledovala obě zdi stejně. Kam ji umístit?</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení:</div><div class="solution-lines"></div><div class="solution-lines"></div><div class="solution-lines"></div><div class="solution-lines"></div></div>' +
'  </div>' +
'  <div class="example">' +
'    <div class="example-title">Příklad 6: Hledání pokladu</div>' +
'    <div class="example-task"><strong>📝 Zadání:</strong> Piráti ukryli poklad přesně 100 kroků od starého dubu (bod D) a zároveň 80 kroků od skály (bod S). Kde může poklad být, pokud víme, že |DS| = 120 kroků?</div>' +
'    <div class="solution-space"><div class="solution-label">Řešení:</div><div class="solution-lines"></div><div class="solution-lines"></div><div class="solution-lines"></div><div class="solution-lines"></div></div>' +
'  </div>' +
'  <div class="footer">© Studijní portál · Množina bodů daných vlastností</div>' +
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
  <span>📄 Stáhnout PDF</span>
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
