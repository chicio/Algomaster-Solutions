/**
 * https://leetcode.com/problems/single-threaded-cpu/description/
 * 1834. Single-Threaded CPU
 */

import {Heap} from "../heap";

type Task = {
    enqueueTime: number;
    processingTime: number;
    index: number;
};

function getOrder(tasks: number[][]): number[] {
    const tasksWithIndex: Task[] = tasks.map(([enqueue, process], index) => ({
        enqueueTime: enqueue,
        processingTime: process,
        index,
    }));
    tasksWithIndex.sort((a, b) => a.enqueueTime - b.enqueueTime);

    const tasksPriority = new Heap<Task>((task, anotherTask) => {
        if (task.processingTime === anotherTask.processingTime) {
            return task.index - anotherTask.index
        }

        return task.processingTime - anotherTask.processingTime
    })

    let currentTask = 0
    let currentTime = 0
    let executionOrder: number[] = []

    while (currentTask < tasksWithIndex.length || tasksPriority.size() > 0) {
        if (tasksPriority.size() === 0 && tasksWithIndex[currentTask].enqueueTime > currentTime) {
            currentTime = tasksWithIndex[currentTask].enqueueTime
        }

        while (currentTask < tasksWithIndex.length &&
        tasksWithIndex[currentTask].enqueueTime <= currentTime) {
            tasksPriority.insert(tasksWithIndex[currentTask])
            currentTask++
        }

        if (tasksPriority.size() > 0) {
            const task = tasksPriority.extract()!
            executionOrder.push(task.index)
            currentTime += task.processingTime
        }
    }

    return executionOrder
}

console.log(getOrder([[1,2],[2,4],[3,2],[4,1]]))
