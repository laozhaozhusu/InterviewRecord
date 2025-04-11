function createReactive(obj) {
    const observers = new Set();

    const observe = fn => {
        observers.add(fn);
    };

    const notify = () => {
        observers.forEach(fn => fn());
    };

    const proxy = new Proxy(obj, {
        set(target, key, value) {
            const result = Reflect.set(target, key, value);
            notify(); // 数据更新时通知观察者
            return result;
        },
        get(target, key) {
            return Reflect.get(target, key);
        }
    });

    return { proxy, observe };
}

const state = {
    count: 0,
    name: 'Vue3风格'
};

const { proxy, observe } = createReactive(state);

// 注册观察者
observe(() => {
    console.log('count changed:', proxy.count);
});

// 修改值时触发通知
proxy.count++; // 输出：count changed: 1
proxy.count = 10; // 输出：count changed: 10