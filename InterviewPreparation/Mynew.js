function myNew(constructor, ...args) {
    // 创建一个空对象，作为新实例的基础
    const instance = Object.create(constructor.prototype);

    // 调用构造函数，将 this 绑定到新创建的对象上，并传入参数
    const result = constructor.apply(instance, args);

    // 如果构造函数返回一个对象，则返回该对象，否则返回新创建的实例
    return typeof result === 'object' && result!== null? result : instance;
}

// 测试代码
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.sayHello = function () {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
};

const person = myNew(Person, 'Alice', 30);
person.sayHello();