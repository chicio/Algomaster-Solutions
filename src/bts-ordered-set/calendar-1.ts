/**
 * https://leetcode.com/problems/my-calendar-i/description/?source=submission-noac
 * 729. My Calendar I
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
