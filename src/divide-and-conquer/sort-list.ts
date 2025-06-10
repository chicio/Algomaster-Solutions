/**
 * https://leetcode.com/problems/sort-list/description/
 * 148. Sort List
 *
 * Given the head of a linked list, return the list after sorting it in ascending order.
 *
 *
 * Example 1:
 *
 *
 * Input: head = [4,2,1,3]
 * Output: [1,2,3,4]
 * Example 2:
 *
 *
 * Input: head = [-1,5,3,4,0]
 * Output: [-1,0,3,4,5]
 * Example 3:
 *
 * Input: head = []
 * Output: []
 *
 *
 * Constraints:
 *
 * The number of nodes in the list is in the range [0, 5 * 104].
 * -105 <= Node.val <= 105
 *
 *
 * Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?
 */

import {ListNode} from "../list-node";

function findMedianOf(head: ListNode | null) {
    let dummy = new ListNode(-Infinity, head)
    let slow = dummy
    let fast = dummy.next

    while (fast?.next) {
        slow = slow.next!
        fast = fast.next?.next
    }

    return slow
}

function merge(firstHalf: ListNode | null, secondHalf: ListNode | null): ListNode | null {
    let dummy = new ListNode(-1)
    let current = dummy

    while (firstHalf && secondHalf) {
        if (firstHalf.val < secondHalf.val) {
            current.next = firstHalf
            firstHalf = firstHalf.next
        } else {
            current.next = secondHalf
            secondHalf = secondHalf.next
        }

        current = current.next
    }

    current.next = firstHalf ?? secondHalf

    return dummy.next
}

function sortList(head: ListNode | null): ListNode | null {
    if (!head || !head.next) {
        return head
    }

    let median = findMedianOf(head)
    let secondHalf = median.next
    median.next = null

    return merge(
        sortList(head),
        sortList(secondHalf)
    )
}
