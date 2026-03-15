function knapsack01(
    weights: number[],
    values: number[],
    capacity: number
): number {
    const n = weights.length;

    const dp = Array.from(
        { length: n + 1 },
        () => new Array(capacity + 1).fill(0)
    );

    for (let i = 1; i <= n; i++) {
        const weight = weights[i - 1];
        const value = values[i - 1];

        for (let w = 0; w <= capacity; w++) {

            if (weight > w) {
                dp[i][w] = dp[i - 1][w];
            } else {
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    value + dp[i - 1][w - weight]
                );
            }
        }
    }

    return dp[n][capacity];
}