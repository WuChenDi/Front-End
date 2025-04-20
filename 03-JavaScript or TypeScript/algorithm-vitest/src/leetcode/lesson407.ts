export function trapRainWater(heightMap: number[][]): number {
  // 检查输入是否为空
  if (!heightMap.length || !heightMap[0].length) return 0;

  const m = heightMap.length;                // 行数
  const n = heightMap[0].length;             // 列数
  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // 四个方向：右、下、左、上

  // 定义一个单元格类型，包含坐标(x,y)和高度h
  type Cell = { x: number, y: number, h: number };

  // 创建访问记录数组，默认所有格子都未访问
  const visited = Array(m).fill(0).map(() => Array(n).fill(false));
  // 储存边界单元格的数组
  const cells: Cell[] = [];

  // 将所有边界格子加入队列，并标记为已访问
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 || i === m - 1 || j === 0 || j === n - 1) {
        cells.push({ x: i, y: j, h: heightMap[i][j] });
        visited[i][j] = true;
      }
    }
  }

  // 按高度从低到高排序边界格子
  cells.sort((a, b) => a.h - b.h);

  let result = 0; // 累计收集的雨水量

  // 当还有格子待处理时循环
  while (cells.length) {
    // 取出高度最小的单元格（最可能溢出的位置）
    const curr = cells.shift()!;

    // 检查这个格子的四个相邻方向
    for (const [dx, dy] of dirs) {
      const nx = curr.x + dx;  // 计算邻居的x坐标
      const ny = curr.y + dy;  // 计算邻居的y坐标

      // 如果邻居超出边界或已经访问过，则跳过
      if (nx < 0 || nx >= m || ny < 0 || ny >= n || visited[nx][ny]) continue;

      // 如果邻居的高度比当前格子低，说明可以存水
      if (heightMap[nx][ny] < curr.h) {
        // 存水量 = 当前格子高度 - 邻居格子高度
        result += curr.h - heightMap[nx][ny];
      }

      // 标记邻居为已访问
      visited[nx][ny] = true;

      // 计算邻居的实际水面高度（取原高度和当前水位的较大值）
      const nextHeight = Math.max(heightMap[nx][ny], curr.h);
      const newCell = { x: nx, y: ny, h: nextHeight };

      // 用二分查找找到插入位置，保持数组按高度排序
      let left = 0, right = cells.length;
      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (cells[mid].h > newCell.h) {
          right = mid;
        } else {
          left = mid + 1;
        }
      }
      cells.splice(left, 0, newCell); // 在正确位置插入新格子
    }
  }

  return result; // 返回总存水量
}
