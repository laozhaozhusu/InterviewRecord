function MyPromise(executor) {
    let state = 'pending';
    let value = undefined;
    let reason = undefined;
    const onFulfilledCallbacks = [];
    const onRejectedCallbacks = [];

    function resolve(val) {
        if (state === 'pending') {
            state = 'fulfilled';
            value = val;
            onFulfilledCallbacks.forEach(cb => cb(value));
        }
    }

    function reject(err) {
        if (state === 'pending') {
            state = 'rejected';
            reason = err;
            onRejectedCallbacks.forEach(cb => cb(reason));
        }
    }

    try {
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }

    return {
        then(onFulfilled, onRejected) {
            return MyPromise((resolveNext, rejectNext) => {
                function handle(callback, data, resolver, rejecter) {
                    try {
                        const result = callback ? callback(data) : data;
                        if (result && typeof result.then === 'function') {
                            result.then(resolveNext, rejectNext);
                        } else {
                            resolver(result);
                        }
                    } catch (err) {
                        rejecter(err);
                    }
                }

                if (state === 'fulfilled') {
                    setTimeout(() => handle(onFulfilled, value, resolveNext, rejectNext));
                } else if (state === 'rejected') {
                    setTimeout(() => handle(onRejected, reason, resolveNext, rejectNext));
                } else {
                    onFulfilledCallbacks.push(val => handle(onFulfilled, val, resolveNext, rejectNext));
                    onRejectedCallbacks.push(err => handle(onRejected, err, resolveNext, rejectNext));
                }
            });
        },

        catch(onRejected) {
            return this.then(null, onRejected);
        }
    };
}