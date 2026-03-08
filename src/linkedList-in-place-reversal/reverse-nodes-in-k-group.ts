/**
 * https://leetcode.com/problems/reverse-nodes-in-k-group/description/
 * 25. Reverse Nodes in k-Group
 */

import { ListNode } from "../list-node"

function reverse(node: ListNode | null, until: number) {
    let prev = null
    let curr = node
    let forw = null
    let position = 1

    while (curr != null && position <= until) {
        forw = curr.next
        curr.next = prev
        prev = curr
        curr = forw
        position++
    }

    return prev
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    let position = 1
    let current = head

    while (position <= k && current !== null) {
        position++
        current = current.next
    }

    if (position <= k) {
        return head
    }

    let inverted = reverse(head, k)
    head!.next = reverseKGroup(current, k)
    head = inverted

    return head
};
