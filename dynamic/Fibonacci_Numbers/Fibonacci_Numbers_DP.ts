export default class Fibonacci_Numbers_DP {
    fibonacci: number[];

    constructor() {
        this.fibonacci = new Array(100);
        for (let i = 0; i < this.fibonacci.length; i++) {
            this.fibonacci[i] = -Infinity;
        }
    }

    fib(n) {
        if (this.fibonacci[n] != -Infinity) {
            return this.fibonacci[n];
        }
        if (n <= 1) {
            return n;
        }
        this.fibonacci[n] = this.fib(n - 1) + this.fib(n - 2);
        return this.fibonacci[n];
    }
}

function test_fibonacci() {
    let fib = new Fibonacci_Numbers_DP();
    console.log(fib.fib(3));
}

test_fibonacci();