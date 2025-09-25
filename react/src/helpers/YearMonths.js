export function showYearMonths(number) {
    if (number === "-") {
        return "-"
    } else {
        const years = Math.floor(number / 12);
        const months = number % 12;

        return years + "j " + months + "m";
    }
}
