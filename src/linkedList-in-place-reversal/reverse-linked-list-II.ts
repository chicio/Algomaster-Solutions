/**
 * https://leetcode.com/problems/reverse-linked-list-ii/description/
 * 92. Reverse Linked List II
 */

import { ListNode } from "../list-node"

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    let position = 1
    let dummy = new ListNode(-1, head)
    let leftNode: ListNode | null = dummy

    while (position < left) {
        leftNode = leftNode!.next
        position++
    }

    let headReverse: ListNode = leftNode!.next!
    let next: ListNode | null = null

    while (position < right) {
        next = headReverse?.next ?? null
        headReverse.next = next?.next ?? null
        next!.next = leftNode!.next
        leftNode!.next = next
        position++
    }

    return dummy.next
};
