import { Heap } from "../heap";

function maxEvents(events: number[][]): number {
    events.sort((a, b) => a[0] - b[0]);
    const minHeap = new Heap<number>((a, b) => a - b); 
    let day = 0;
    let i = 0;
    let attended = 0;

    while (i < events.length || minHeap.size() > 0) {
        if (minHeap.size() === 0) {
            day = Math.max(day, events[i][0]);
        }

        while (i < events.length && events[i][0] <= day) {
            minHeap.insert(events[i][1]);
            i++;
        }

        while (minHeap.size() > 0 && minHeap.peek()! < day) {
            minHeap.extract();
        }

        if (minHeap.size() > 0) {
            minHeap.extract();
            attended++;
            day++;
        }
    }

    return attended;
}

console.log(maxEvents([[1,2],[2,3],[3,4]])); // 3
console.log(maxEvents([[1,2],[2,3],[3,4],[1,2]])); // 4
console.log(maxEvents([[1,4],[4,4],[2,2],[3,4],[1,1]])); // 4
console.log(maxEvents([[1,100000]])); // 1
console.log(maxEvents([[1,1],[1,2],[1,3],[1,4],[1,5]])); // 5