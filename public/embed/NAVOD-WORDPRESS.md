# Vložení animace na WordPress (skolni-nastenka.cz / VEDOS)

## 📁 Soubory k nahrání

Nahrajte tyto soubory na váš hosting nebo přímo do WordPress médií:
- `embed/mnozina-bodu-princip.html`

---

## 🔧 Způsob 1: Iframe v HTML bloku (doporučeno)

### Krok 1: Nahrajte HTML soubor
1. Přes FTP/SFTP nahrajte soubor `mnozina-bodu-princip.html` do složky `/wp-content/uploads/animace/`
2. Nebo použijte plugin "File Manager" ve WordPressu

### Krok 2: Vložte do stránky
V editoru Gutenberg přidejte blok **Vlastní HTML** a vložte:

```html
<div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
  <iframe 
    src="https://skolni-nastenka.cz/wp-content/uploads/animace/mnozina-bodu-princip.html" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    allowfullscreen
    loading="lazy"
    title="Množina bodů daných vlastností - animace">
  </iframe>
</div>
```

---

## 🔧 Způsob 2: Externí hosting (např. GitHub Pages)

### Krok 1: Nahrajte na GitHub Pages
1. Vytvořte nový repozitář na GitHubu
2. Nahrajte HTML soubor
3. Aktivujte GitHub Pages v Settings → Pages

### Krok 2: Vložte iframe
```html
<div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px;">
  <iframe 
    src="https://vase-skola.github.io/animace/mnozina-bodu-princip.html" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    allowfullscreen>
  </iframe>
</div>
```

---

## 🔧 Způsob 3: Plugin "WP File Download" nebo "Insert HTML Snippet"

1. Nainstalujte plugin **Insert HTML Snippet**
2. Vytvořte nový snippet s celým obsahem HTML souboru
3. Použijte shortcode `[xyz-snippet id="1"]` na stránce

---

## ⚠️ Řešení problémů

### Animace se nezobrazuje
- Zkontrolujte, že URL k souboru je správná
- Ověřte, že server povoluje přístup k HTML souborům

### Ovládací tlačítka nefungují
- Ujistěte se, že používáte verzi s vestavěnými ovládacími prvky (embed verze)

### Špatné rozměry
- Upravte `padding-bottom: 56.25%` (16:9) podle potřeby:
  - 4:3 = `padding-bottom: 75%`
  - 16:10 = `padding-bottom: 62.5%`

---

## 📱 Responsivní zobrazení

Animace se automaticky přizpůsobí velikosti kontejneru. Pro mobilní zařízení doporučuji:

```html
<style>
@media (max-width: 768px) {
  .animace-wrapper {
    padding-bottom: 75% !important; /* vyšší poměr pro mobily */
  }
}
</style>

<div class="animace-wrapper" style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0;">
  <iframe src="..." style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"></iframe>
</div>
```

---

## ✅ Hotové iframe kódy pro všechny animace

### Množina bodů - Princip
```html
<iframe src="URL/mnozina-bodu-princip.html" width="100%" height="450" style="border:none; border-radius:8px;"></iframe>
```

### Thalesova kružnice
```html
<iframe src="URL/video-mnozina-bodu-thales.html" width="100%" height="450" style="border:none; border-radius:8px;"></iframe>
```

### Konstrukce osy úsečky
```html
<iframe src="URL/video-priklad-osa-usecky.html" width="100%" height="450" style="border:none; border-radius:8px;"></iframe>
```

### Konstrukce trojúhelníku (Thales)
```html
<iframe src="URL/video-priklad-thales-trojuhelnik.html" width="100%" height="450" style="border:none; border-radius:8px;"></iframe>
```

---

**Poznámka:** Nahraďte `URL` skutečnou cestou k souborům na vašem serveru.
