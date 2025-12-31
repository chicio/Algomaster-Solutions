
/**
 * 
 * 210. Course Schedule II
 * 
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
 * 
 * For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
 * Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: numCourses = 2, prerequisites = [[1,0]]
 * Output: [0,1]
 * Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
 * Example 2:
 * 
 * Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
 * Output: [0,2,1,3]
 * Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
 * So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
 * Example 3:
 * 
 * Input: numCourses = 1, prerequisites = []
 * Output: [0]
 *  
 * 
 * Constraints:
 * 
 * 1 <= numCourses <= 2000
 * 0 <= prerequisites.length <= numCourses * (numCourses - 1)
 * prerequisites[i].length == 2
 * 0 <= ai, bi < numCourses
 * ai != bi
 * All the pairs [ai, bi] are distinct.
 */

function createAdiajencyListForNextCourses(prerequisites: number[][]) {
    const nextCourses: Map<number, number[]> = new Map()

    for (let i = 0; i < prerequisites.length; i++) {
        const [course, prerequisiteCourse] = prerequisites[i]
        let courses = nextCourses.get(prerequisiteCourse)

        if (!courses) {
            nextCourses.set(prerequisiteCourse, [course])
        } else {
            nextCourses.set(prerequisiteCourse, [...courses, course])
        }
    }  

    return nextCourses
}

function topologicalSortingDFS(
    nextCourses: Map<number, number[]>, 
    course: number, 
    visitedNodes: Set<number>, 
    visitingNodes: Set<number>, 
    sorting: number[]
) {
    if (visitingNodes.has(course)) {
        return true
    }

    if (visitedNodes.has(course)) {
        return false
    }

    visitingNodes.add(course)
    const courses = nextCourses.get(course) ?? []

    for (let coursePosition = 0; coursePosition < courses.length; coursePosition++) {
        const nextCourse = courses[coursePosition]
        
        if(topologicalSortingDFS(nextCourses, nextCourse, visitedNodes, visitingNodes, sorting)) {
            return true
        }
    }
    
    visitedNodes.add(course)
    visitingNodes.delete(course)
    sorting.unshift(course)
    
    return false
}

function topologicalSorting(nextCourses: Map<number, number[]>, numCourses: number) {
    const visitedNodes = new Set<number>()
    const visitingNodes = new Set<number>()
    const sorting: number[] = []

    for (let course = 0; course < numCourses; course++) {
        if (!visitedNodes.has(course)) {
            if(topologicalSortingDFS(nextCourses, course, visitedNodes, visitingNodes, sorting)) {
                return []
            }
        }
    }

    return sorting
}

function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const sorting = topologicalSorting(createAdiajencyListForNextCourses(prerequisites), numCourses)
    return sorting.length < numCourses ? [] : sorting
};

console.log(findOrder(2, [[1,0]])) // [0,1]
console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]])) // [0,2,1,3]