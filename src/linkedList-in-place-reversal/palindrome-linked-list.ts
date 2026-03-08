/**
 * https://leetcode.com/problems/palindrome-linked-list/description/
 * 234. Palindrome Linked List
 */

import { ListNode } from "../list-node"

function isPalindrome(head: ListNode | null): boolean {
    let stack: number[] = []
    let current = head
    let count = 0

    while (current) {
        stack.push(current.val)
        current = current.next
    }

    current = head

    while (current) {
        if (stack[stack.length - 1] === current.val) {
            stack.pop()
        }
        current = current.next
    }

    return stack.length === 0
}
