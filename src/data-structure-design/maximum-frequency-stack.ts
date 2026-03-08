/**
 * https://leetcode.com/problems/maximum-frequency-stack/description/
 * 895. Maximum Frequency Stack
 */

class FreqStack {
    private valToFreq: Map<number, number>;
    private freqToStack: Map<number, number[]>;
    private maxFreq: number;

    constructor() {
        this.valToFreq = new Map();
        this.freqToStack = new Map();
        this.maxFreq = 0;
    }

    push(val: number): void {
        const freq = (this.valToFreq.get(val) ?? 0) + 1;
        this.valToFreq.set(val, freq);

        if (freq > this.maxFreq) {
            this.maxFreq = freq;
        }

        if (!this.freqToStack.has(freq)) {
            this.freqToStack.set(freq, []);
        }

        this.freqToStack.get(freq)!.push(val);
    }

    pop(): number {
        const stack = this.freqToStack.get(this.maxFreq)!;
        const val = stack.pop()!;
        this.valToFreq.set(val, this.valToFreq.get(val)! - 1);

        if (stack.length === 0) {
            this.freqToStack.delete(this.maxFreq);
            this.maxFreq--;
        }

        return val;
    }
}
