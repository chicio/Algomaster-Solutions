/**
 * https://leetcode.com/problems/maximum-profit-in-job-scheduling/
 * 1235. Maximum Profit in Job Scheduling
 */

interface Interval {
    startTime: number;
    endTime: number;
    profit: number;
}

function jobScheduling(
    startTime: number[],
    endTime: number[],
    profit: number[]
): number {
    const n = startTime.length
    const jobs: Interval[] = []

    for (let i = 0; i < n; i++) {
        jobs.push({ startTime: startTime[i], endTime: endTime[i], profit: profit[i] })
    }

    jobs.sort((a, b) => a.startTime - b.startTime)

    const memo = new Array(n).fill(-1)

    function dfs(i: number): number {
        if (i >= n) { 
            return 0
        }
        
        if (memo[i] !== -1) {
            return memo[i]
        }

        let skip = dfs(i + 1)

        const job = jobs[i]
        const nextIndex = binarySearch(job.endTime, i + 1)
        let take = job.profit + dfs(nextIndex)

        memo[i] = Math.max(skip, take)

        return memo[i]
    }

    function binarySearch(target: number, startIndex: number): number {
        let left = startIndex
        let right = n

        while (left < right) {
            const mid = Math.floor((left + right) / 2)

            if (jobs[mid].startTime < target) {
                left = mid + 1
            } else {
                right = mid
            }
        }

        return left
    }

    return dfs(0)
}