export function showYearMonths(number) {
   const years = Math.floor(number /12);
   const months = number % 12;

   return years + "j " + months + "m";
}
