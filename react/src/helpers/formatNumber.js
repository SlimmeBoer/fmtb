export function formatNumber(value) {
    if (typeof value === 'number') {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    return value; // Strings of andere types ongewijzigd teruggeven
}
