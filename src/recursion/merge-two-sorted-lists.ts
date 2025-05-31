/**
 * https://leetcode.com/problems/merge-two-sorted-lists/description/
 * 21. Merge Two Sorted Lists
 *
 * You are given the heads of two sorted linked lists list1 and list2.
 *
 * Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
 *
 * Return the head of the merged linked list.
 *
 *
 *
 * Example 1:
 *
 *
 * Input: list1 = [1,2,4], list2 = [1,3,4]
 * Output: [1,1,2,3,4,4]
 * Example 2:
 *
 * Input: list1 = [], list2 = []
 * Output: []
 * Example 3:
 *
 * Input: list1 = [], list2 = [0]
 * Output: [0]
 *
 *
 * Constraints:
 *
 * The number of nodes in both lists is in the range [0, 50].
 * -100 <= Node.val <= 100
 * Both list1 and list2 are sorted in non-decreasing order.
 */
import {ListNode} from "../linked-list/list-node";

function mergeTwoListsRecursive(head: ListNode, list1: ListNode | null, list2: ListNode | null) {
    if (list1 === null && list2 === null) {
        return
    }

    if (list1 === null) {
        head.next = list2
        return
    }

    if (list2 === null) {
        head.next = list1
        return
    }

    if (list1.val < list2.val) {
        head.next = list1
        mergeTwoListsRecursive(head.next, list1.next, list2)
    } else {
        head.next = list2
        mergeTwoListsRecursive(head.next, list1, list2.next)
    }
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    let dummy = new ListNode(-1, null)
    let head = dummy

    mergeTwoListsRecursive(head, list1, list2)

    return dummy.next
}
