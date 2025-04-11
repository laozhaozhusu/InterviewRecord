function createEventBus() {
    const events = {};

    return {
        // 订阅
        on(event, callback) {
            if (!events[event]) {
                events[event] = [];
            }
            events[event].push(callback);
        },

        // 取消订阅
        off(event, callback) {
            if (!events[event]) return;
            events[event] = events[event].filter(cb => cb !== callback);
        },

        // 只执行一次
        once(event, callback) {
            const wrapper = (...args) => {
                callback(...args);
                this.off(event, wrapper);
            };
            this.on(event, wrapper);
        },

        // 发布
        emit(event, ...args) {
            if (!events[event]) return;
            events[event].forEach(cb => cb(...args));
        }
    };
}
