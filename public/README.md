# Museo Digitale delle Sabbie del Mondo

Progetto didattico dell'ITCS "Maria Lazzari" — Una collezione digitale di campioni di sabbia provenienti da tutto il mondo.

## Struttura del progetto

```
public/
├── museo/
│   ├── index.html          # Home page con hero, filtri e galleria
│   └── dettaglio.html      # Pagina dettaglio campione
├── style.css               # Tutti gli stili CSS
├── script.js               # Logica home page (filtri, ricerca, card)
├── dettaglio.js            # Logica pagina dettaglio (metadati, correlati, QR)
├── dati.json               # Database dei 52 campioni
├── images/
│   ├── campioni/           # Immagini principali (1.jpg ... 52.jpg)
│   └── microscopio/        # Immagini al microscopio (1.png ... 52.png)
└── placeholder.svg         # Immagine fallback
```

## Come aggiornare i dati

### Modificare un campione esistente

1. Apri `public/dati.json`
2. Trova il campione per `id`
3. Modifica i campi desiderati
4. Salva il file

### Aggiungere un nuovo campione

1. Aggiungi un nuovo oggetto JSON in `public/dati.json` con tutti i campi:
   ```json
   {
     "id": 53,
     "nome": "Nome della spiaggia",
     "provenienza": "Località completa",
     "provincia": "",
     "isola": "",
     "regione": "",
     "bacino": "Mare/Oceano",
     "paese": "Paese",
     "continente": "Continente",
     "tipologia": "Marina",
     "anno": 2024,
     "descrizione": "Descrizione del campione...",
     "immagine": "images/campioni/53.jpg",
     "microscopio": "images/microscopio/53.png",
     "qrcode": ""
   }
   ```
2. Aggiungi l'immagine in `public/images/campioni/53.jpg`
3. Aggiungi l'immagine al microscopio in `public/images/microscopio/53.png`

## Come aggiungere immagini

- **Immagini dei campioni**: formato `.jpg`, salvare in `public/images/campioni/` con nome numerico (es. `1.jpg`)
- **Immagini al microscopio**: formato `.png`, salvare in `public/images/microscopio/` con lo stesso numero (es. `1.png`)
- Assicurarsi che il numero corrisponda all'`id` del campione in `dati.json`

## Come pubblicare su GitHub Pages

### Metodo 1: Deploy diretto

1. Crea un nuovo repository su GitHub
2. Copia il contenuto della cartella `public/` nella root del repository
3. Vai in **Settings → Pages**
4. Seleziona **Source: Deploy from a branch**
5. Seleziona il branch `main` e la cartella `/ (root)`
6. Clicca **Save**
7. Il sito sarà disponibile all'indirizzo `https://tuousername.github.io/nome-repo/museo/`

### Metodo 2: Con cartella docs

1. Rinomina la cartella `public/` in `docs/`
2. Carica tutto il repository su GitHub
3. In **Settings → Pages**, seleziona la cartella `/docs`

## Come testare in locale

### Con VS Code Live Server

1. Installa l'estensione **Live Server** in VS Code
2. Apri la cartella `public/`
3. Clicca destro su `museo/index.html` → **Open with Live Server**

### Con Python

```bash
cd public
python3 -m http.server 8000
```
Poi apri `http://localhost:8000/museo/` nel browser.

### Con Node.js

```bash
npx serve public
```

## Funzionalità implementate

- ✅ Home page con hero, statistiche e introduzione
- ✅ Galleria dinamica di 52 campioni caricati da JSON
- ✅ Card moderne con immagine, nome, provenienza e tag
- ✅ Filtro per continente
- ✅ Filtro per paese (dinamico, si aggiorna in base al continente)
- ✅ Filtro per tipologia
- ✅ Barra di ricerca testuale
- ✅ Pulsante reset filtri
- ✅ Contatore risultati
- ✅ Stato vuoto elegante
- ✅ Pagina dettaglio con tutti i metadati
- ✅ Immagine principale + immagine al microscopio
- ✅ QR code generato dinamicamente
- ✅ Campioni correlati per continente
- ✅ Design responsive (mobile, tablet, desktop)
- ✅ Animazioni leggere (fade-in, hover)
- ✅ Palette naturale ispirata a sabbia, terra e oceano
- ✅ Accessibilità (alt text, semantica HTML, contrasto)
- ✅ Caricamento dinamico da file JSON

## Tecnologie utilizzate

- HTML5 semantico
- CSS3 (variabili CSS, Grid, Flexbox, animazioni)
- JavaScript vanilla (ES6+, Fetch API)
- Google Fonts (Playfair Display + Inter)
- QRCode.js (CDN) per generazione QR code

## Crediti

Progetto didattico dell'**ITCS "Maria Lazzari"**
Collezione di sabbie curata dagli studenti e docenti dell'istituto.
