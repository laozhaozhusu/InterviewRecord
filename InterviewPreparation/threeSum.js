// 三数之和
// 题目：给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0？找出所有满足条件且不重复的三元组。
// 比如 [1,2,1,6,2,-1,-2, -5, -4] 
const sum = (nums) => {
    nums.sort((a, b) => a - b)
    const n = nums.length
    const res = []

    for (let i = 0; i < nums.lengtn - 2; i++) {
        let left = i + 1; right = n - 1;
        while (left < right) {
            if (nums[i] + nums[left] + nums[right] === 0) {
                res.push([nums[i], nums[left], nums[right]])
            } else if (nums[i] + nums[left] + nums[right] > 0) {
                left++
            } else {
                riht--
            }
        }
    }
    return res
}