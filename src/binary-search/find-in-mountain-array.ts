/**
 * https://leetcode.com/problems/find-in-mountain-array/description/
 * 1095. Find in Mountain Array
 *
 * (This problem is an interactive problem.)
 *
 * You may recall that an array arr is a mountain array if and only if:
 *
 * arr.length >= 3
 * There exists some i with 0 < i < arr.length - 1 such that:
 * arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
 * arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
 * Given a mountain array mountainArr, return the minimum index such that mountainArr.get(index) == target. If such an index does not exist, return -1.
 *
 * You cannot access the mountain array directly. You may only access the array using a MountainArray interface:
 *
 * MountainArray.get(k) returns the element of the array at index k (0-indexed).
 * MountainArray.length() returns the length of the array.
 * Submissions making more than 100 calls to MountainArray.get will be judged Wrong Answer. Also, any solutions that attempt to circumvent the judge will result in disqualification.
 *
 *
 *
 * Example 1:
 *
 * Input: mountainArr = [1,2,3,4,5,3,1], target = 3
 * Output: 2
 * Explanation: 3 exists in the array, at index=2 and index=5. Return the minimum index, which is 2.
 * Example 2:
 *
 * Input: mountainArr = [0,1,2,4,2,1], target = 3
 * Output: -1
 * Explanation: 3 does not exist in the array, so we return -1.
 *
 *
 * Constraints:
 *
 * 3 <= mountainArr.length() <= 104
 * 0 <= target <= 109
 * 0 <= mountainArr.get(index) <= 109
 */


class MountainArray {
    get(index: number): number {return 0; }
    length(): number { return 0; }
}

function findPeak(mountainArr: MountainArray) {
    let left = 0
    let right = mountainArr.length() - 1

    while (left < right) {
        const mid = left + Math.floor((right - left) / 2)

        if (mountainArr.get(mid) < mountainArr.get(mid + 1)) {
            left = mid + 1
        } else {
            right = mid
        }
    }

    return left
}

function find(
    target: number,
    mountainArr: MountainArray,
    left: number,
    right: number,
    condition: (mid: number, target: number) => boolean
) {
    let currentLeft = left
    let currentRight = right

    while (currentLeft <= currentRight) {
        const midIndex = currentLeft + Math.floor((currentRight - currentLeft) / 2)
        const mid = mountainArr.get(midIndex)

        if (mid === target) {
            return midIndex
        }

        if (condition(mid, target)) {
            currentLeft = midIndex + 1
        } else {
            currentRight = midIndex - 1
        }
    }

    return -1
}


function findInMountainArray(target: number, mountainArr: MountainArray) {
    let peak = findPeak(mountainArr)
    let left = find(
        target,
        mountainArr,
        0,
        peak,
        (mid, target) => mid < target
    )
    let right = find(
        target,
        mountainArr,
        peak,
        mountainArr.length() - 1,
        (mid, target) => mid > target
    )

    if (left === -1 && right === -1) {
        return -1
    }

    if (left === -1) {
        return right
    }

    if (right === -1) {
        return left
    }

    return Math.min(left, right)
};
