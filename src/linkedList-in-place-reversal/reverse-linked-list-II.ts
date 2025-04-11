/**
 * https://leetcode.com/problems/reverse-linked-list-ii/description/
 * 92. Reverse Linked List II
 * 
 * Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.
 * 
 * Example 1:
 * 
 * 
 * Input: head = [1,2,3,4,5], left = 2, right = 4
 * Output: [1,4,3,2,5]
 * Example 2:
 * 
 * Input: head = [5], left = 1, right = 1
 * Output: [5]
 *  
 * 
 * Constraints:
 * 
 * The number of nodes in the list is n.
 * 1 <= n <= 500
 * -500 <= Node.val <= 500
 * 1 <= left <= right <= n
 *  
 * 
 * Follow up: Could you do it in one pass?
 */

import { ListNode } from "../linked-list/list-node"

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