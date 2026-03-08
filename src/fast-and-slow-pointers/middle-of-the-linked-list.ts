/**
 * https://leetcode.com/problems/middle-of-the-linked-list/description/
 * 876. Middle of the Linked List
 */

import { ListNode } from "../list-node"

function middleNode(head: ListNode | null): ListNode | null {
    let slow: ListNode | null = new ListNode(-1, head)
    let fast: ListNode | null = new ListNode(-1, head)

    while (fast) {
        slow = slow?.next ?? null
        fast = fast.next?.next ?? null
    }

    return slow
};
