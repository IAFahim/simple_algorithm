export default class Rod_Cutting_dp {
    price: number[];
    dp: number[];

    constructor(price: number[]) {
        this.price = price;
        this.dp = new Array(price.length + 1);
        for (let i = 0; i < this.dp.length; i++) {
            this.dp[i] = -Infinity;
        }
    }

    cut_rod_with_length(length: number): number {
        if (this.dp[length] >= 0) {
            return this.dp[length];
        }
        let max;
        if (length === 0) {
            max = 0;
        } else {
            max = -Infinity;
            for (let i = 1; i <= length; i++) {
                max = Math.max(max, this.price[i - 1] + this.cut_rod_with_length(length - i));
            }
        }
        this.dp[length] = max;
        return max;
    }
}

function test_rod_cutting() {
    let price = [1, 5, 8, 9, 10, 12, 17];
    let rod = new Rod_Cutting_dp(price);
    for (let i = 1; i <= price.length; i++) {
        console.log(rod.cut_rod_with_length(i));
    }
}

test_rod_cutting();