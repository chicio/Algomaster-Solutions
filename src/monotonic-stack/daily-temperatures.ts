/**
 * https://leetcode.com/problems/daily-temperatures/
 * 739. Daily Temperatures
 */

function dailyTemperatures(temperatures: number[]): number[] {
    const stack: { temperature: number, day: number }[] = []
    const answers = Array(temperatures.length).fill(0)

    for (let i = 0; i < temperatures.length; i++) {
        const currentTemperature = temperatures[i]
        
        while (stack.length > 0 && stack[stack.length - 1].temperature < currentTemperature) {
            let currentGreater = stack.pop()!
            answers[currentGreater.day] = i - currentGreater.day
        }

        stack.push({ temperature: temperatures[i], day: i })
    }

    return answers
};

console.log(dailyTemperatures([73,74,75,71,69,72,76,73]))
