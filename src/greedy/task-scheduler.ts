/**
 * 621. Task Scheduler
 * 
 * You are given an array of CPU tasks, each labeled with a letter from A to Z, and a number n. Each CPU interval can be idle or allow the completion of one task. Tasks can be completed in any order, but there's a constraint: there has to be a gap of at least n intervals between two tasks with the same label.
 * 
 * Return the minimum number of CPU intervals required to complete all tasks.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: tasks = ["A","A","A","B","B","B"], n = 2
 * 
 * Output: 8
 * 
 * Explanation: A possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B.
 * 
 * After completing task A, you must wait two intervals before doing A again. The same applies to task B. In the 3rd interval, neither A nor B can be done, so you idle. By the 4th interval, you can do A again as 2 intervals have passed.
 * 
 * Example 2:
 * 
 * Input: tasks = ["A","C","A","B","D","B"], n = 1
 * 
 * Output: 6
 * 
 * Explanation: A possible sequence is: A -> B -> C -> D -> A -> B.
 * 
 * With a cooling interval of 1, you can repeat a task after just one other task.
 * 
 * Example 3:
 * 
 * Input: tasks = ["A","A","A", "B","B","B"], n = 3
 * 
 * Output: 10
 * 
 * Explanation: A possible sequence is: A -> B -> idle -> idle -> A -> B -> idle -> idle -> A -> B.
 * 
 * There are only two types of tasks, A and B, which need to be separated by 3 intervals. This leads to idling twice between repetitions of these tasks.
 * 
 *  
 * 
 * Constraints:
 * 
 * 1 <= tasks.length <= 104
 * tasks[i] is an uppercase English letter.
 * 0 <= n <= 100
 */

import { Heap } from "../heap";

type TaskCount = { task: string; count: number }
type CooldownItem = { task: string; count: number; availableAt: number }

function leastInterval(tasks: string[], n: number): number {
    const maxHeap = new Heap<TaskCount>((a, b) => b.count - a.count)
    const frequency = new Map<string, number>()
    
    for (const t of tasks) {
        frequency.set(t, (frequency.get(t) || 0) + 1)
    }

    for (const [task, count] of frequency.entries()) {
        maxHeap.insert({ task, count })
    }

    const cooldown: CooldownItem[] = [];
    let time = 0;

    while (maxHeap.size() > 0 || cooldown.length > 0) {
        time++;
        const current = maxHeap.extract()
        
        if (current) {
            current.count--

            if (current.count > 0) {
                cooldown.push({ task: current.task, count: current.count, availableAt: time + n })
            }
        }

        if (cooldown.length > 0 && cooldown[0].availableAt === time) {
            while (cooldown.length > 0 && cooldown[0].availableAt === time) {
                const ready = cooldown.shift()!
                maxHeap.insert({ task: ready.task, count: ready.count })
            }
        }
    }

    return time;
}


console.log(leastInterval(["A","A","A","B","B","B"], 2)) // 8
console.log(leastInterval(["A","C","A","B","D","B"], 1)) // 6
console.log(leastInterval(["A","A","A", "B","B","B"], 3)) // 10