/**
 * https://leetcode.com/problems/partition-list/description/
 * Partition List
 *
 * Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.
 *
 * You should preserve the original relative order of the nodes in each of the two partitions.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: head = [1,4,3,2,5,2], x = 3
 * Output: [1,2,2,4,3,5]
 * Example 2:
 *
 * Input: head = [2,1], x = 2
 * Output: [1,2]
 *
 *
 * Constraints:
 *
 * The number of nodes in the list is in the range [0, 200].
 * -100 <= Node.val <= 100
 * -200 <= x <= 200
 */

import { ListNode } from "../list-node"

function partition(head: ListNode | null, x: number): ListNode | null {
    let minor = new ListNode(-1, undefined)
    let major = new ListNode(-1, undefined)
    let currentMinor = minor
    let currentMajor = major
    let current = head

    while(current) {
        if (current.val < x) {
            currentMinor.next = current
            currentMinor = currentMinor.next
        } else {
            currentMajor.next = current
            currentMajor = currentMajor.next
        }

        current = current.next
    }

    head = minor.next ? minor.next : head
    currentMinor.next = major.next
    currentMajor.next = null

    return head
};
