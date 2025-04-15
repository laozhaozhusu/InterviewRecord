const sum1 = (nums: number[]): number[][] => {
    nums.sort((a, b) => a - b)
    const res: number[][] = []

    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            if (nums[i] + nums[left] + nums[right] === 0) {
                res.push([nums[i], nums[left], nums[right]])
            } else if (nums[i] + nums[left] + nums[right] > 0) {
                left++
            } else {
                right--
            }
        }
    }
    return res
}