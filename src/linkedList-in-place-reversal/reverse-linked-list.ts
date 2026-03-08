/**
 * https://leetcode.com/problems/reverse-linked-list/description/
 * 206. Reverse Linked List
 */

import { ListNode } from "../list-node"

function reverseList(head: ListNode | null): ListNode | null {
    let current = head
    let previous = null
    let next = null

    while (current) {
        next = current.next
        current.next = previous
        previous = current
        current = next
    }

    return previous
};
