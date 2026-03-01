// utils/stringUtils.ts (ou dentro do componente mesmo)
export function normalizeMealName(name: string): string {
    return name
        .normalize("NFD")                // separa acentos
        .replace(/[\u0300-\u036f]/g, "") // remove acentos
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");           // normaliza espaços
}