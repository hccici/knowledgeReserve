class EventBus {
    eventMap = {}
    on(eventName, fn) {
        if (!this.eventMap[eventName]) {
            this.eventMap[eventName] = [fn]
        } else {
            this.eventMap[eventName].push(fn)
        }
    }
    emit(eventName, ...args) {
        if (!this.eventMap[eventName]) {
            return
        }
        // 因为可能有通过once添加进来的，数组长度会发生改变影响遍历，所以复制一个
        [...this.eventMap[eventName]].forEach(fn => {
            fn.call(null, ...args)
        })
    }
    off(eventName, fn) {
        // 如果eventName为空，清除所有
        if (!eventName) {
            this.eventMap = {}
            return
        }
        // 如果fn为空，删除所有eventName下的fn
        if (!fn) {
            this.eventMap[eventName] = null
            return
        }
        let eventList = this.eventMap[eventName]
        for (let i = 0; i < eventList.length; i++) {
            if (fn === eventList[i] || fn === eventList[i]._fn) { // once需要
                eventList.splice(i, 1)
                break
            }
        }
    }
    once(eventName, fn) {
        // 包装一下fn
        const handle = (...args) => {
            fn.call(null, ...args)
            this.off(eventName, handle)
        }
        // 这里有个需要注意的点，因为用户不知道handle，只知道fn，所以他主动去off的时候不会生效，所在handle挂载在一个fn，修改一下off的比较
        handle._fn = fn
        this.on(eventName, handle)
    }
}
const eb = new EventBus()
eb.on('add', (a, b) => {
    console.log(a + b)
})
let cb = (a, b) => {
    console.log(`${a}${b}`)
}
eb.once('add', cb)
eb.emit('add', 1, 2)
eb.emit('add', 3, 4)
