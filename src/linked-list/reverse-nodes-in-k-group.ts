/**
 * 
 * https://leetcode.com/problems/reverse-nodes-in-k-group/description/
 * 25. Reverse Nodes in k-Group
 * 
 * Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.
 * 
 * k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.
 * 
 * You may not alter the values in the list's nodes, only nodes themselves may be changed.
 * 
 *  
 * 
 * Example 1:
 * 
 * 
 * Input: head = [1,2,3,4,5], k = 2
 * Output: [2,1,4,3,5]
 * Example 2:
 * 
 * 
 * Input: head = [1,2,3,4,5], k = 3
 * Output: [3,2,1,4,5]
 *  
 * 
 * Constraints:
 * 
 * The number of nodes in the list is n.
 * 1 <= k <= n <= 5000
 * 0 <= Node.val <= 1000
 *  
 * 
 * Follow-up: Can you solve the problem in O(1) extra memory space?
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