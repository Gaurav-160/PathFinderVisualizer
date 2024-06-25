export function getGrid(width, height) {
    let grid = [];
    for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            row.push({
                x: j,
                y: i,
                isStart: false,
                isTarget: false,
                weight: 1,
                isWall: false
            });
        }
        grid.push(row);
    }
    grid[Math.floor(height / 2)][Math.floor(width / 2)].isStart = true;
    grid[height - 2][width - 2].isTarget = true;

    return grid;
}

