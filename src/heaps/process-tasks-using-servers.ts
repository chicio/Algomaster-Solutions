/**
 * https://leetcode.com/problems/process-tasks-using-servers/description/
 * 1882. Process Tasks Using Servers
 */

import {Heap} from "../heap";

type FreeServer = {
    weight: number;
    index: number;
}

type BusyServer = {
    freeTime: number;
    weight: number;
    index: number;
}

function assignTasks(servers: number[], tasks: number[]): number[] {
    const freeServers = new Heap<FreeServer>((server, anotherServer) => {
        if (server.weight === anotherServer.weight) {
            return server.index - anotherServer.index
        }

        return server.weight - anotherServer.weight
    })
    const busyServers = new Heap<BusyServer>((server, anotherServer) => {
        if (server.freeTime !== anotherServer.freeTime) {
            return server.freeTime - anotherServer.freeTime;
        }

        if (server.weight !== anotherServer.weight) {
            return server.weight - anotherServer.weight;
        }

        return server.index - anotherServer.index;
    })

    servers.map((weight, index) => freeServers.insert({ weight, index }))

    let time = 0
    let ans = []

    for (let i = 0; i < tasks.length; i++) {
        const taskTime = tasks[i];
        time = Math.max(time, i);

        while (busyServers.size() > 0 && busyServers.peek()!.freeTime <= time) {
            const newFreeServer = busyServers.extract()!;
            freeServers.insert({ weight: newFreeServer.weight, index: newFreeServer.index });
        }

        if (freeServers.size() === 0) {
            const server = busyServers.extract()!;
            time = server.freeTime;
            freeServers.insert({ weight: server.weight, index: server.index });

            while (busyServers.size() > 0 && busyServers.peek()!.freeTime <= time) {
                const server = busyServers.extract()!;
                freeServers.insert({ weight: server.weight, index: server.index });
            }
        }

        const server = freeServers.extract()!;
        busyServers.insert({
            freeTime: time + tasks[i],
            weight: server.weight,
            index: server.index
        });
        ans.push(server.index)
    }

    return ans
}
