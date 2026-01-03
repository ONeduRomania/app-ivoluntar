/**
 * Convertește un string într-un slug URL-friendly
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Elimină diacriticele
    .replace(/[^a-z0-9]+/g, "-") // Înlocuiește caracterele non-alfanumerice cu -
    .replace(/^-+|-+$/g, ""); // Elimină - de la început și sfârșit
}

