/**
 * https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/
 * 82. Remove Duplicates from Sorted List II
 * 
 * Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.
 * 
 *  
 * 
 * Example 1:
 * 
 * 
 * Input: head = [1,2,3,3,4,4,5]
 * Output: [1,2,5]
 * Example 2:
 * 
 * 
 * Input: head = [1,1,1,2,3]
 * Output: [2,3]
 *  
 * 
 * Constraints:
 * 
 * The number of nodes in the list is in the range [0, 300].
 * -100 <= Node.val <= 100
 * The list is guaranteed to be sorted in ascending order.
 */

import { ListNode } from "./list-node"

function deleteDuplicates(head: ListNode | null): ListNode | null {
    if (!head) {
        return null
    }

    let current: ListNode | null = new ListNode(-1, head)

    while (current) {
        if (current.next && current.next?.val === current.next?.next?.val) {
            let value = current.next.val
            let toBeRemoved: ListNode | null = current.next

            while (toBeRemoved?.val === value) {
                if (toBeRemoved === head) {
                    head = head.next
                }
                toBeRemoved = toBeRemoved.next
            }

            current.next = toBeRemoved
        } else {
            current = current.next
        }
    }

    return head
}