export function isNumber(number: string | number): boolean {
    return !isNaN(parseInt(`${number}`) * 1);
}