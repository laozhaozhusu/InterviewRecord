Array.prototype.myReduce = function (callback, initialValue) {
    // 检查回调函数是否为函数
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    const array = this;
    let accumulator;
    let startIndex;

    // 处理初始值
    if (arguments.length >= 2) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        // 如果没有提供初始值，则使用数组的第一个元素作为初始值
        if (array.length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        accumulator = array[0];
        startIndex = 1;
    }

    // 遍历数组
    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }

    return accumulator;
};

const arr = [1];

// 求和
const sum = arr.myReduce((acc, cur) => acc + cur, 0);
console.log(sum); // 输出: 10

// 求积
const product = arr.myReduce((acc, cur) => acc * cur, 1);
console.log(product); // 输出: 24

// 数组扁平化
const nestedArr = [[1, 2], [3, 4], [5, 6]];
const flatArr = nestedArr.myReduce((acc, cur) => acc.concat(cur), []);
console.log(flatArr); // 输出: [1, 2, 3, 4, 5, 6]