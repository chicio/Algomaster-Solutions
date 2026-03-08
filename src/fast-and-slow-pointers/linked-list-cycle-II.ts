/**
 * https://leetcode.com/problems/linked-list-cycle-ii/description/
 * 142. Linked List Cycle II
 */

import { ListNode } from "../list-node"

function detectCycle(head: ListNode | null): ListNode | null {
    let slow = head?.next
    let fast = head?.next?.next
    let cycle = false

    while (slow && fast && !cycle) {
        if (slow === fast) {
            cycle = true
        } else {
            slow = slow?.next
            fast = fast?.next?.next
        }
    }

    if (!cycle) {
        return null
    }

    slow = head

    while (slow !== fast) {
        slow = slow?.next ?? null
        fast = fast?.next
    }

    return slow
};
