class RandomizedSet {
    constructor(
        private map: Map<number, number> = new Map(), 
        private list: number[] = []
    ) {}

    insert(val: number): boolean {
        if(this.map.has(val)) {
            return false
        }

        const count = this.list.push(val)
        this.map.set(val, count - 1)

        return true
    }

    remove(val: number): boolean {
        if(!this.map.has(val)) {
            return false;
        }

        const index: number = this.map.get(val)!; 
        [this.list[index], this.list[this.list.length - 1]] = [this.list[this.list.length - 1], this.list[index]];
        this.list.pop(); 

        if (index < this.list.length) {  
            this.map.set(this.list[index], index);
        }

        this.map.delete(val);  

        return true;
    }

    getRandom(): number {
        return this.list[Math.floor(Math.random() * this.list.length)]
    }
}