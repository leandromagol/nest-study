
export function integerToDecimal(number: number) {
    if (number <= 0 ){
        return 0
    }
    return (number / 100).toFixed(2)
}