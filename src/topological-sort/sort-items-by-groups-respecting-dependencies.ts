/**
 * 
 * 1203. Sort Items by Groups Respecting Dependencies
 * 
 * There are n items each belonging to zero or one of m groups where group[i] is the group that the i-th item belongs to and it's equal to -1 if the i-th item belongs to no group. The items and the groups are zero indexed. A group can have no item belonging to it.
 * 
 * Return a sorted list of the items such that:
 * 
 * The items that belong to the same group are next to each other in the sorted list.
 * There are some relations between these items where beforeItems[i] is a list containing all the items that should come before the i-th item in the sorted array (to the left of the i-th item).
 * Return any solution if there is more than one solution and return an empty list if there is no solution.
 * 
 *  
 * 
 * Example 1:
 * 
 * 
 * 
 * Input: n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3,6],[],[],[]]
 * Output: [6,3,4,1,5,2,0,7]
 * Example 2:
 * 
 * Input: n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3],[],[4],[]]
 * Output: []
 * Explanation: This is the same as example 1 except that 4 needs to be before 6 in the sorted list.
 *  
 * 
 * Constraints:
 * 
 * 1 <= m <= n <= 3 * 104
 * group.length == beforeItems.length == n
 * -1 <= group[i] <= m - 1
 * 0 <= beforeItems[i].length <= n - 1
 * 0 <= beforeItems[i][j] <= n - 1
 * i != beforeItems[i][j]
 * beforeItems[i] does not contain duplicates elements.
 */

function constructGraph(n: number, group: number[], beforeItems: number[][]) {
    const groupGraph = new Map<number, Set<number>>()

    for (let i = 0; i < n; i++) {
        for (const j of beforeItems[i]) {
            const gi = group[i]
            const gj = group[j]

            if (gi !== gj) {
                if (!groupGraph.has(gj)) {
                    groupGraph.set(gj, new Set())
                }
                groupGraph.get(gj)!.add(gi)
            }
        }
    }

    return groupGraph
}

function topoSortGroup(
    items: number[],
    itemGraph: number[][],
    itemIndegree: number[]
): number[] | null {
    const queue: number[] = []
    const result: number[] = []

    for (const item of items) {
        if (itemIndegree[item] === 0) {
            queue.push(item)
        }
    }

    while (queue.length > 0) {
        const node = queue.shift()!
        result.push(node)

        for (const next of itemGraph[node]) {
            itemIndegree[next]--
            if (itemIndegree[next] === 0) {
                queue.push(next)
            }
        }
    }

    return result.length === items.length ? result : null
}

function sortItems(n: number, m: number, group: number[], beforeItems: number[][]): number[] {
    let nextGroupId = m

    for (let i = 0; i < n; i++) {
        if (group[i] === -1) {
            group[i] = nextGroupId
            nextGroupId++
        }
    }

    const graph: Map<number, Set<number>> = constructGraph(n, group, beforeItems)
    const groupCount = Math.max(...group) + 1
    const indegree = Array(groupCount).fill(0)
 
    for (const [fromGroup, neighbors] of graph) {
        for (const toGroup of neighbors) {
            indegree[toGroup]++
        }
    }

    const queue: number[] = []

    for (let g = 0; g < groupCount; g++) {
        if (indegree[g] === 0) {
            queue.push(g)
        }
    }

    const groupOrder: number[] = []

    while (queue.length > 0) {
        const g = queue.shift()!
        groupOrder.push(g)

        const neighbors = graph.get(g)

        if (!neighbors) { 
            continue
        }

        for (const next of neighbors) {
            indegree[next]--

            if (indegree[next] === 0) {
                queue.push(next)
            }
        }
    }

    if (groupOrder.length !== groupCount) {
        return []
    }

    const itemsInGroup = new Map<number, number[]>()

    for (let i = 0; i < n; i++) {
        const g = group[i]
        if (!itemsInGroup.has(g)) {
            itemsInGroup.set(g, [])
        }
        itemsInGroup.get(g)!.push(i)
    }

    const itemGraph = Array.from({ length: n }, () => [] as number[])
    const itemIndegree = Array(n).fill(0)

    for (let i = 0; i < n; i++) {
        for (const j of beforeItems[i]) {
            if (group[i] === group[j]) {
                itemGraph[j].push(i)
                itemIndegree[i]++
            }
        }
    }

    const result: number[] = []

    for (const g of groupOrder) {
        const items = itemsInGroup.get(g) ?? []

        if (items.length === 0) continue

        const sorted = topoSortGroup(items, itemGraph, itemIndegree)
        if (sorted === null) {
            return []
        }

        result.push(...sorted)
    }

    return result.length === n ? result : []
};

console.log(sortItems(8, 2, [-1,-1,1,0,0,1,0,-1], [[],[6],[5],[6],[3,6],[],[],[]])) // [6,3,4,1,5,2,0,7]