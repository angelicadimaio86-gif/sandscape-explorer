/**
 * Helper per immagini campioni.
 * - Restituisce URL valido o `null`.
 * - `placeholderImage` è un'immagine SVG inline neutra (no fetch esterno).
 */

export const placeholderImage =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
       <rect width="400" height="300" fill="#EFE6D6"/>
       <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
             font-family="Georgia, serif" font-size="18" fill="#8A7659">
         Immagine non disponibile
       </text>
     </svg>`,
  );

export function safeImageSrc(src: string | null | undefined): string {
  if (!src || src.trim().length === 0) return placeholderImage;
  return src;
}