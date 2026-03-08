/**
 * https://leetcode.com/problems/time-needed-to-inform-all-employees/description/
 * 1376. Time Needed to Inform All Employees
 */

function buildAdjList(n: number, manager: number[]): number[][] {
    const adj: number[][] = Array.from({ length: n }, () => [])

    for (let employee = 0; employee < n; employee++) {
        const boss = manager[employee]

        if (boss !== -1) {
            adj[boss].push(employee)
        }
    }

    return adj
}

function dfs(current: number, hierarchy: number[][], informTime: number[], currentTime: number): number {
   const employees = hierarchy[current]
   let maxTime = currentTime

    for (const employee of employees) {
        maxTime = Math.max(maxTime, dfs(employee, hierarchy, informTime, currentTime + informTime[current]))
    }

    return maxTime
}

function numOfMinutes(n: number, headID: number, manager: number[], informTime: number[]): number {
    const hierarchy = buildAdjList(n, manager)
    return dfs(headID, hierarchy, informTime, 0)
};

console.log(numOfMinutes(1, 0, [-1], [0])) // 0
console.log(numOfMinutes(6, 2, [2,2,-1,2,2,2], [0,0,1,0,0,0])) // 1
console.log(numOfMinutes(7, 6, [1,2,3,4,5,6,-1], [0,6,5,4,3,2,1])) // 21