/**
 * https://leetcode.com/problems/my-calendar-ii/description/
 * 731. My Calendar II
 */

class MyCalendarTwo {
    private timeline: [number, number][] = [];

    book(start: number, end: number): boolean {
        const temp = [...this.timeline];
        temp.push([start, 1]);
        temp.push([end, -1]);

        temp.sort((a, b) => {
            if (a[0] !== b[0])  {
                return a[0] - b[0];
            }

            return a[1] - b[1];
        });

        let active = 0;

        for (const [_, delta] of temp) {
            active += delta;
            if (active >= 3) {
                return false;
            }
        }

        this.timeline = temp;

        return true;
    }
}
