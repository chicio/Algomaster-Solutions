/**
 * https://leetcode.com/problems/minimum-number-of-refueling-stops/description/
 * 871. Minimum Number of Refueling Stops
 */


import { Heap } from "../heap";

function minRefuelStops(target: number, startFuel: number, stations: number[][]): number {
    const stationsRank = new Heap<number>((a, b) => b - a);
    let tank = startFuel;
    let refuels = 0;
    let prevPosition = 0;

    for (let i = 0; i < stations.length; i++) {
        const [position, fuel] = stations[i];

        while (tank < position && stationsRank.size() > 0) {
            tank += stationsRank.extract()!;
            refuels++;
        }

        if (tank < position) return -1;

        stationsRank.insert(fuel);
    }

    while (tank < target && stationsRank.size() > 0) {
        tank += stationsRank.extract()!;
        refuels++;
    }

    return tank >= target ? refuels : -1;
};

console.log(minRefuelStops(100, 10, [[10,60],[20,30],[30,30],[60,40]])) // 2
console.log(minRefuelStops(1, 1, [])) // 0
console.log(minRefuelStops(100, 1, [[10,100]])) // -1