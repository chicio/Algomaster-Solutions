function hierholzer(node: string, graph: Map<string, string[]>, path: string[]) {
    const neighbors = graph.get(node)

    while (neighbors && neighbors.length > 0) {
        const next = neighbors.shift()!
        hierholzer(next, graph, path)
    }

    path.push(node)
}

export function eulerianPath(start: string, graph: Map<string, string[]>) {
    const path: string[] = []

    hierholzer(start, graph, path)

    return path.reverse()
}