/**
 * https://leetcode.com/problems/snapshot-array/description/
 * 1146. Snapshot Array
 * 
 * Implement a SnapshotArray that supports the following interface:
 * 
 * SnapshotArray(int length) initializes an array-like data structure with the given length. Initially, each element equals 0.
 * void set(index, val) sets the element at the given index to be equal to val.
 * int snap() takes a snapshot of the array and returns the snap_id: the total number of times we called snap() minus 1.
 * int get(index, snap_id) returns the value at the given index, at the time we took the snapshot with the given snap_id
 *  
 * 
 * Example 1:
 * 
 * Input: ["SnapshotArray","set","snap","set","get"]
 * [[3],[0,5],[],[0,6],[0,0]]
 * Output: [null,null,0,null,5]
 * Explanation: 
 * SnapshotArray snapshotArr = new SnapshotArray(3); // set the length to be 3
 * snapshotArr.set(0,5);  // Set array[0] = 5
 * snapshotArr.snap();  // Take a snapshot, return snap_id = 0
 * snapshotArr.set(0,6);
 * snapshotArr.get(0,0);  // Get the value of array[0] with snap_id = 0, return 5
 *  
 * 
 * Constraints:
 * 
 * 1 <= length <= 5 * 104
 * 0 <= index < length
 * 0 <= val <= 109
 * 0 <= snap_id < (the total number of times we call snap())
 * At most 5 * 104 calls will be made to set, snap, and get.
 */

class SnapshotArray {
    constructor(
        length: number,
        private currentSnap: number = 0,
        private readonly snaps: Map<number, number>[] = Array.from({ length }, () => new Map<number, number>())
    ) { }

    set(index: number, val: number): void {
        this.snaps[index].set(this.currentSnap, val)
    }

    snap(): number {
        return this.currentSnap++
    }

    get(index: number, snap_id: number): number {
        const changes: Map<number, number> = this.snaps[index]
        
        while (snap_id >= 0) {
            if (changes.has(snap_id)) {
                return changes.get(snap_id)!
            }

            snap_id--
        }

        return 0
    }
}
