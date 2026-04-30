## Problema

I dropdown dei filtri "Continenti", "Paesi" e "Tipologie" si aprono ma vengono coperti dalle card della collezione sottostante (vedi screenshot: card #2 si vede sopra le opzioni "Asia", "Cipro", "Cava"). Il pannello esiste ma sta visivamente dietro alle immagini delle card.

## Causa

In `public/style.css`:
- `.multi-select-panel` ha `z-index: 50`
- Le card e i loro elementi interni (immagini, badge) creano stacking contexts che finiscono sopra al pannello del filtro
- Inoltre il contenitore `.multi-select` non alza il proprio z-index quando aperto, quindi anche se il pannello è alto, il parent lo "intrappola" sotto

## Soluzione

Modifiche solo a `public/style.css` (zero JS, zero HTML):

1. **`.multi-select`** — aggiungere `z-index: 1` di base, e una regola `.multi-select:has(.multi-select-btn[aria-expanded="true"]) { z-index: 300; }` per portarlo sopra alle card quando aperto.

2. **`.multi-select-panel`** — alzare `z-index` da `50` a `300` così il pannello stesso è sempre sopra qualunque card.

3. **Card della collezione** — assicurarsi che `.card` e `.card-image-wrapper` abbiano `z-index: 1` (non maggiore), così non competono con i dropdown.

4. **Mobile** — verificare che sui telefoni (viewport stretti) il pannello rimanga `position: absolute` ancorato al bottone e non vada fuori schermo; se necessario aggiungere `max-width: calc(100vw - 32px)`.

## File modificati

- `public/style.css` (solo regole z-index dei filtri multi-select e card)

Nessun cambiamento di logica, nessun rischio di regressione su mappa, dettaglio o filtri.
