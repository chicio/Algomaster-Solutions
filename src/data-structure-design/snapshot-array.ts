/**
 * https://leetcode.com/problems/snapshot-array/description/
 * 1146. Snapshot Array
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
