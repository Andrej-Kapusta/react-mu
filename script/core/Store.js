class Store {
    constructor() {
        this.flatData = {}
    }
    update(path, value) {
        this.set(path, value)
        // console.log("after update", this.flatData)
    }
    set(path, value) {
        const key = path.join("/")
        this.flatData[key] = value
    }
    remove(path) {
        const key = path.join("/")
        delete this.flatData[key]
        // console.log("after remove", this.flatData)
    }
    clear() {
        this.flatData = {}
    }
    getEntries() {
        return Object.keys(this.flatData).map(k => [k, this.flatData[k]])
    }
}

const instance = new Store()
// Object.freeze(instance)

export default instance