/**
 * https://leetcode.com/problems/merge-k-sorted-lists/description/
 * 23. Merge k Sorted Lists
 */

import { Heap } from "../heap";
import { ListNode } from "../list-node";

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    const heap = new Heap<ListNode>((a, b) => a.val - b.val);

    for (const node of lists) {
        if (node !== null) {
            heap.insert(node);
        }
    }

    const dummy = new ListNode(0);
    let curr = dummy;

    while (heap.size() > 0) {
        const minNode = heap.extract()!;
        curr.next = minNode;
        curr = curr.next;

        if (minNode.next !== null) {
            heap.insert(minNode.next);
        }
    }

    return dummy.next;
}