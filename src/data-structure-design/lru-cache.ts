/**
 * https://leetcode.com/problems/lru-cache/description/
 * 146. LRU Cache
 */


class DoubleLinkedNode {
    key: number;
    value: number;
    prev: DoubleLinkedNode | null = null;
    next: DoubleLinkedNode | null = null;

    constructor(key: number, value: number) {
        this.key = key;
        this.value = value;
    }
}

class LRUCache {
    constructor(
        private readonly capacity: number, 
        private cache: Map<number, DoubleLinkedNode> = new Map(), 
        private head: DoubleLinkedNode = new DoubleLinkedNode(0, 0),
        private tail: DoubleLinkedNode = new DoubleLinkedNode(0, 0),
    ) { 
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key: number): number {
        const node = this.cache.get(key)

        if (!node) {
            return -1
        }

        this.removeNode(node) 
        this.addNodeToHead(node)

        return node.value
    }

    put(key: number, value: number): void {
        if (this.cache.has(key)) {
            const node = this.cache.get(key)!;
            node.value = value;
            this.removeNode(node) 
            this.addNodeToHead(node)
            return;
        }

        const newNode = new DoubleLinkedNode(key, value);
        this.cache.set(key, newNode);
        this.addNodeToHead(newNode);

        if (this.cache.size > this.capacity) {
            const tail = this.popTail();
            this.cache.delete(tail.key);
        }
    }

    private removeNode(node: DoubleLinkedNode) {
        let prev = node.prev
        let next = node.next
        node.prev = null
        node.next = null
        prev.next = next
        next.prev = prev
    }

    private addNodeToHead(node: DoubleLinkedNode): void {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next!.prev = node;
        this.head.next = node;
    }

    private popTail(): DoubleLinkedNode {
        const res = this.tail.prev!;
        this.removeNode(res);
        return res;
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */