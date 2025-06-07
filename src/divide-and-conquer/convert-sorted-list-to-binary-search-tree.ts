import {ListNode} from "../list-node";
import {TreeNode} from "../tree-node";

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

function constructBST(head: ListNode | null): TreeNode | null {
    if (!head) {
        return null
    }

    if (!head.next) {
        return new TreeNode(head.val); // Fabrizio, remember the leafs of the tree.
    }

    let median = findMedianOf(head)
    let value = median.next!.val
    let leftNode = head
    let rightNode = median.next!.next

    median.next!.next = null
    median.next = null

    return new TreeNode(
        value,
        constructBST(leftNode),
        constructBST(rightNode)
    )
}

function sortedListToBST(head: ListNode | null): TreeNode | null {
    if (!head) {
        return null
    }

    return constructBST(head)
}
