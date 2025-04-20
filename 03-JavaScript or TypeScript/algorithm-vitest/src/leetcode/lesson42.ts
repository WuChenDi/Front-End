export function trap(height: number[]): number {
  if (height.length < 2) {
    return 0
  }

  let left = 1
  let right = height.length - 2
  let lmax = height[0]
  let rmax = height[height.length - 1]
  let ans = 0

  while (left <= right) {
    if (lmax < rmax) {
      ans += height[left] >= lmax ? 0 : lmax - height[left]
      lmax = Math.max(lmax, height[left])
      left++
    } else {
      ans += height[right] >= rmax ? 0 : rmax - height[right]
      rmax = Math.max(rmax, height[right])
      right--
    }
  }

  return ans
};
