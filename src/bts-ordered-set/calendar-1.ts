/**
 * https://leetcode.com/problems/my-calendar-i/description/?source=submission-noac
 * 729. My Calendar I
 *
 * You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a double booking.
 *
 * A double booking happens when two events have some non-empty intersection (i.e., some moment is common to both events.).
 *
 * The event can be represented as a pair of integers startTime and endTime that represents a booking on the half-open interval [startTime, endTime), the range of real numbers x such that startTime <= x < endTime.
 *
 * Implement the MyCalendar class:
 *
 * MyCalendar() Initializes the calendar object.
 * boolean book(int startTime, int endTime) Returns true if the event can be added to the calendar successfully without causing a double booking. Otherwise, return false and do not add the event to the calendar.
 *
 *
 * Example 1:
 *
 * Input
 * ["MyCalendar", "book", "book", "book"]
 * [[], [10, 20], [15, 25], [20, 30]]
 * Output
 * [null, true, false, true]
 *
 * Explanation
 * MyCalendar myCalendar = new MyCalendar();
 * myCalendar.book(10, 20); // return True
 * myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event.
 * myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.
 *
 *
 * Constraints:
 *
 * 0 <= start < end <= 109
 * At most 1000 calls will be made to book.
 */

// Binary search tree solution

class CalendarTreeNode {
    start: number;
    end: number;
    left: CalendarTreeNode | null;
    right: CalendarTreeNode | null;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
        this.left = null;
        this.right = null;
    }
}

class MyCalendar {
    private root: CalendarTreeNode | null = null;

    book(start: number, end: number): boolean {
        const newEvent = new CalendarTreeNode(start, end);

        if (!this.root) {
            this.root = newEvent;
            return true;
        }

        return this.insert(this.root, newEvent);
    }

    private insert(root: CalendarTreeNode, newEvent: CalendarTreeNode): boolean {
        if (newEvent.start < root.end && newEvent.end > root.start) {
            return false;
        }

        if (newEvent.start >= root.end) {
            if (root.right) {
                return this.insert(root.right, newEvent);
            }
            root.right = newEvent;
            return true;
        } else {
            if (root.left) {
                return this.insert(root.left, newEvent);
            }
            root.left = newEvent;
            return true;
        }
    }
}

// Binary search solution

interface CalendarEvent {
    startTime: number;
    endTime: number;
}

class MyCalendar2 {
    constructor(
        private readonly events: CalendarEvent[] = []
    ) { }

    book(startTime: number, endTime: number): boolean {
        const position = this.searchEventPosition(startTime)
        const previousEvent = this.events[position - 1];
        const event = this.events[position]

        if (previousEvent && previousEvent.endTime > startTime) {
            return false;
        }

        if (event && event.startTime < endTime) {
            return false
        }

        this.events.splice(position, 0, { startTime, endTime })

        return true
    }

    private searchEventPosition(newStart: number): number {
        let left = 0
        let right = this.events.length - 1

        while (left <= right) {
            let mid = left + Math.floor((right  - left) / 2)
            let currentEvent = this.events[mid]

            if (newStart > currentEvent.startTime) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }

        return left
    }
}
