import React, {useState, useRef, useEffect} from 'react';
import { useModes } from '../../contexts/context.jsx';
import "./grid.css"
import styled from 'styled-components';
// import { BFS, DFS } from '../../utils/algos.jsx';


function Grid() {

  const [cost, setCost] = useState(Infinity);
  const [steps, setSteps] = useState(Infinity);
  const [showResult, setShowResult] = useState(false);
    
  const {
    grid,
    setGrid,
    editing,
    setEditFlag,
    mode,
    start,
    end,
    run,
    res,
    algo,
    weight,
    restart,
  } = useModes();

  const [refarray, setRefArray] = useState(getrefarray(grid));

  function getrefarray(grid) {
    let array = [];
    console.log("grid: ", grid)
    grid.forEach((elem) => {
      elem.forEach((child) => {
        array.push(useRef());
      });
    });
    console.log("array is: ", array)
    return array;
  }

  function BFS(graph, visited, parent, start, target) {
    let queue = [start];
    let count = 0;
    visited[`${start.x}-${start.y}`] = true;
    while (queue.length > 0) {
      count += 1;
      let c = queue.pop();
      refarray[c.x + c.y * 50].current.style["transition-delay"] = `${
        count * 8
      }ms`;
      refarray[c.x + c.y * 50].current.classList.add("visited");
      if (c.x == target.x && c.y == target.y){ 
        return [c, count];
      }

      if (
        c.x + 1 < 50 &&
        !visited[`${c.x + 1}-${c.y}`] &&
        !graph[c.y][c.x + 1].isWall
      ) {
        queue.unshift({ x: c.x + 1, y: c.y });
        parent[`${c.x + 1}-${c.y}`] = { ...c };
        visited[`${c.x + 1}-${c.y}`] = true;
      }
      if (
        c.x - 1 >= 0 &&
        !visited[`${c.x - 1}-${c.y}`] &&
        !graph[c.y][c.x - 1].isWall
      ) {
        queue.unshift({ x: c.x - 1, y: c.y });
        parent[`${c.x - 1}-${c.y}`] = { ...c };
        visited[`${c.x - 1}-${c.y}`] = true;
      }
      if (
        c.y + 1 < 25 &&
        !visited[`${c.x}-${c.y + 1}`] &&
        !graph[c.y + 1][c.x].isWall
      ) {
        queue.unshift({ x: c.x, y: c.y + 1 });
        parent[`${c.x}-${c.y + 1}`] = { ...c };
        visited[`${c.x}-${c.y + 1}`] = true;
      }
      if (
        c.y - 1 >= 0 &&
        !visited[`${c.x}-${c.y - 1}`] &&
        !graph[c.y - 1][c.x].isWall
      ) {
        queue.unshift({ x: c.x, y: c.y - 1 });
        parent[`${c.x}-${c.y - 1}`] = { ...c };
        visited[`${c.x}-${c.y - 1}`] = true;
      }
    }
    return null;
  }

  function DFS(graph, visited, parent, start, target) {
    let queue = [start];
    let count = 0;
    visited[`${start.x}-${start.y}`] = true;
    while (queue.length > 0) {
      count += 1;
      let c = queue[0];
      queue.shift();
      refarray[c.x + c.y * 50].current.style["transition-delay"] = `${
        count * 8
      }ms`;
      refarray[c.x + c.y * 50].current.classList.add("visited");
      if (c.x == target.x && c.y == target.y) {
        return [c, count];
      }

      if (
        c.y + 1 < 25 &&
        !visited[`${c.x}-${c.y + 1}`] &&
        !graph[c.y + 1][c.x].isWall
      ) {
        queue.unshift({ x: c.x, y: c.y + 1 });
        parent[`${c.x}-${c.y + 1}`] = { ...c };
        visited[`${c.x}-${c.y + 1}`] = true;
      }
      if (
        c.x - 1 >= 0 &&
        !visited[`${c.x - 1}-${c.y}`] &&
        !graph[c.y][c.x - 1].isWall
      ) {
        queue.unshift({ x: c.x - 1, y: c.y });
        parent[`${c.x - 1}-${c.y}`] = { ...c };
        visited[`${c.x - 1}-${c.y}`] = true;
      }
      if (
        c.y - 1 >= 0 &&
        !visited[`${c.x}-${c.y - 1}`] &&
        !graph[c.y - 1][c.x].isWall
      ) {
        queue.unshift({ x: c.x, y: c.y - 1 });
        parent[`${c.x}-${c.y - 1}`] = { ...c };
        visited[`${c.x}-${c.y - 1}`] = true;
      }
      if (
        c.x + 1 < 50 &&
        !visited[`${c.x + 1}-${c.y}`] &&
        !graph[c.y][c.x + 1].isWall
      ) {
        queue.unshift({ x: c.x + 1, y: c.y });
        parent[`${c.x + 1}-${c.y}`] = { ...c };
        visited[`${c.x + 1}-${c.y}`] = true;
      }
    }
    return null;
  }

  function dijkstra(graph, start, target, parent, distances) {
    const rows = 25;
    const cols = 50;
    let count = 0;

    let priorityQueue = new MinPriorityQueue();

    // Distance to the start node is 0
    distances[`${start.x}-${start.y}`] = 0;
    priorityQueue.insert({ x: start.x, y: start.y }, 0);

    while (!priorityQueue.isEmpty()) {
      count += 1
      let { element: c, priority: dist } = priorityQueue.extractMin();

      refarray[c.x + c.y * 50].current.style["transition-delay"] = `${
        count*4
      }ms`;
      refarray[c.x + c.y * 50].current.classList.add("visited");

      // If the target node is reached, return the path and distance
      if (c.x === target.x && c.y === target.y) {
        return [c, dist];
      }

      // Explore neighbors
      const neighbors = [
        { x: c.x + 1, y: c.y },
        { x: c.x - 1, y: c.y },
        { x: c.x, y: c.y + 1 },
        { x: c.x, y: c.y - 1 },
      ];

      for (let neighbor of neighbors) {
        if (
          neighbor.x >= 0 &&
          neighbor.x < cols &&
          neighbor.y >= 0 &&
          neighbor.y < rows &&
          !graph[neighbor.y][neighbor.x].isWall
        ) {
          let newDist = dist + graph[neighbor.y][neighbor.x].weight;
          if (newDist < distances[`${neighbor.x}-${neighbor.y}`]) {
            distances[`${neighbor.x}-${neighbor.y}`] = newDist;
            parent[`${neighbor.x}-${neighbor.y}`] = { x: c.x, y: c.y };
            priorityQueue.insert({ x: neighbor.x, y: neighbor.y }, newDist);
          }
        }
      }
    }

    return null;
  }

  // Helper class for Min Priority Queue
  class MinPriorityQueue {
    constructor() {
      this.queue = [];
    }

    insert(element, priority) {
      this.queue.push({ element, priority });
      this.queue.sort((a, b) => a.priority - b.priority);
    }

    extractMin() {
      return this.queue.shift();
    }

    isEmpty() {
      return this.queue.length === 0;
    }
  }


  // const dx = [0, 1, 0, -1];
  // const dy = [1, 0, -1, 0];

  // function isValid(x, y, graph, visited) {
  //   return (
  //     x >= 0 &&
  //     x < 50 &&
  //     y >= 0 &&
  //     y < 25 &&
  //     !visited[`(${x}, ${y})`] &&
  //     !graph[y][x].isWall
  //   );
  // }

  // function BFS(graph, parent, visited, start, target) {
  //   let q = [start];
  //   let count = 0;
  //   visited[`(${start.x},${start.y})`] = true;
  //   while (q.length > 0) {
  //     count += 1;
  //     let topNode = q.pop();
  //     const nodeNum = topNode.x + topNode.y * 50;
  //     refarray[nodeNum].current.style["transition-delay"] = `${count * 8}ms`;
  //     refarray[nodeNum].current.classList.add("visited");

  //     if (topNode.x == target.x && topNode.y == target.y)
  //       return [topNode, count];

  //     for (let i = 0; i < 4; i++) {
  //       if (isValid(topNode.x + dx[i], topNode.y + dy[i], graph, visited)) {
  //         q.unshift({ x: topNode.x + dx[i], y: topNode.y + dy[i] });
  //         parent[`(${topNode.x + dx[i]},${topNode.y + dy[i]})`] = {
  //           ...topNode,
  //         };
  //         visited[`(${topNode.x + dx[i]},${topNode.y + dy[i]})`] = true;
  //       }
  //     }
  //   }

  //   return null;
  // }

  // function DFS(graph, parent, visited, start, target) {
  //   let q = [start];
  //   let count = 0;
  //   visited[`(${start.x},${start.y})`] = true;
  //   while (q.length > 0) {
  //     count += 1;
  //     let topNode = q.ueue[0];
  //     q.shift();
  //     const nodeNum = topNode.x + topNode.y * 50;
  //     refarray[nodeNum].current.style["transition-delay"] = `${count * 8}ms`;
  //     refarray[nodeNum].current.classList.add("visited");

  //     if (topNode.x == target.x && topNode.y == target.y)
  //       return [topNode, count];

  //     for (let i = 0; i < 4; i++) {
  //       if (isValid(topNode.x + dx[i], topNode.y + dy[i], graph, visited)) {
  //         q.unshift({ x: topNode.x + dx[i], y: topNode.y + dy[i] });
  //         parent[`(${topNode.x + dx[i]},${topNode.y + dy[i]})`] = {
  //           ...topNode,
  //         };
  //         visited[`(${topNode.x + dx[i]},${topNode.y + dy[i]})`] = true;
  //       }
  //     }
  //   }

  //   return -1;
  // }

  // useEffect(() => {
  //   if (algo == "BFS") {
  //     let visited = {};
  //     let parent = {};
  //     for (let j = 0; j < 25; j++) {
  //       for (let i = 0; i < 50; i++) {
  //         visited[`(${i},${j})`] = false;
  //         parent[`(${i},${j})`] = null;
  //       }
  //     }
  //     let result = BFS(
  //       grid,
  //       parent,
  //       visited,
  //       start.current,
  //       end.current,
  //     );
    
  //     let path = []
  //     if(result != null){
  //       let current = result[0]
  //       while(parent[`(${current.x},${current.y})`] != null){
  //         path.push(current)
  //         current = parent[`(${current.x},${current.y})`]
  //       }
  //       setTimeout(() => {
  //         path.reverse().forEach((elem, index) => {
  //           refarray[elem.x + elem.y * 50].current.style[
  //             "transition-delay"
  //           ] = `${index * 15}ms`;
  //           refarray[elem.x + elem.y * 50].current.classList.add("path");
  //         });
  //       }, result[1] * 9);
  //     }
  //   }
  // }, [run])

  useEffect(() => {
    if (algo == "BFS") {
      let visited = {};
      let parent = {};
      for (let j = 0; j < 25; j++) {
        for (let i = 0; i < 50; i++) {
          visited[`${i}-${j}`] = false;
          parent[`${i}-${j}`] = null;
        }
      }
      let result = BFS(grid, visited, parent, start.current, end.current);
      let path = [];
      if (result != null) {
        let current = result[0];
        while (parent[`${current.x}-${current.y}`] != null) {
          path.push(current);
          current = parent[`${current.x}-${current.y}`];
        }
        setTimeout(() => {
          let cnt = 0;
          let dist = 0;
          path.reverse().forEach((elem, index) => {
            refarray[elem.x + elem.y * 50].current.style[
              "transition-delay"
            ] = `${index * 15}ms`;
            refarray[elem.x + elem.y * 50].current.classList.add("path");
            cnt += 1;
            dist += parseInt(grid[elem.y][elem.x].weight);
          });
          setSteps(cnt);
          setCost(dist);
          setShowResult(true);
        }, result[1] * 9);
      }
    }
    if (algo == "DFS") {
      let visited = {};
      let parent = {};
      for (let j = 0; j < 25; j++) {
        for (let i = 0; i < 50; i++) {
          visited[`${i}-${j}`] = false;
          parent[`${i}-${j}`] = null;
        }
      }
      let result = DFS(grid, visited, parent, start.current, end.current);
      let path = [];
      if (result != null) {
        let current = result[0];
        while (parent[`${current.x}-${current.y}`] != null) {
          path.push(current);
          current = parent[`${current.x}-${current.y}`];
        }
        setTimeout(() => {
          let cnt = 0;
          let dist = 0;
          path.reverse().forEach((elem, index) => {
            refarray[elem.x + elem.y * 50].current.style[
              "transition-delay"
            ] = `${index * 15}ms`;
            refarray[elem.x + elem.y * 50].current.classList.add("path");
            cnt += 1;
            dist += parseInt(grid[elem.y][elem.x].weight)
          });
          setCost(dist);
          setSteps(cnt);
          setShowResult(true);
        }, result[1] * 9);
      }
    }

    if (algo == "Dijkstra") {
      let distances = {};
      let parent = {};

      // Initialize distances to infinity and visited to false
      for (let y = 0; y < 25; y++) {
        for (let x = 0; x < 50; x++) {
          distances[`${x}-${y}`] = Infinity;
          parent[`${x}-${y}`] = null;
        }
      }
      let result = dijkstra(grid, start.current, end.current, parent, distances);
      let path = [];
      if (result != null) {
        let current = result[0];
        while (parent[`${current.x}-${current.y}`] != null) {
          path.push(current);
          current = parent[`${current.x}-${current.y}`];
        }
        setTimeout(() => {
          let cnt = 0
          let dist = 0;
          path.reverse().forEach((elem, index) => {
            refarray[elem.x + elem.y * 50].current.style[
              "transition-delay"
            ] = `${index * 15}ms`;
            refarray[elem.x + elem.y * 50].current.classList.add("path");
            // console.log("weight: ", grid[elem.x][elem.y].weight);
            dist += parseInt(grid[elem.y][elem.x].weight);
            cnt++;
            // refarray[elem.x + elem.y * 50].current.innerHTML = cnt++;
          });
          setSteps(cnt);
          setCost(dist);
          setShowResult(true);
        }, result[1] * 9);
      }
    }
  }, [run]);

   useEffect(() => {
    setShowResult(false);
     refarray.forEach((elem) => {
       elem.current.style["transition-delay"] = "0ms";
     });
     refarray.forEach((elem) => {
       elem.current.classList.remove("visited");
       elem.current.classList.remove("path");
      //  elem.current.innerHTML = ``; // Clear inner content
     });
   }, [res]);

  return (
    <div>
      {/* {showResult && <h3 style={{textAlign:'center'}}> Cost to reach Target : {cost} </h3>} */}
      <StyledHeading>
        Start : ({start.current.x},{start.current.y}) {"------------->"} End: ({end.current.x},{end.current.y}){" "}
        {showResult && `Steps : ${steps} Cost: ${cost}`}
      </StyledHeading>
      <div className="board">
        {refarray.map((elem, index) => {
          let classList = ["cell"];
          let yindex = Math.floor(index / 50);
          let xindex = index % 50;
          let cell = grid[yindex][xindex];

          if (cell.isWall) {
            classList.push("wall");
          }

          return (
            <div
              key={`${index}`}
              ref={elem}
              className={classList.join(" ")}
              onMouseDown={() => {
                setEditFlag(true);
              }}
              onMouseUp={() => {
                setEditFlag(false);
              }}
              onMouseMove={() => {
                if (!editing) return;
                const current = grid[yindex][xindex];
                if (current.isStart || current.isTarget) return;
                switch (mode) {
                  case "setStart":
                    var newgrid = grid.map((elem) => {
                      return elem.map((elem) => {
                        if (!elem.isStart) return elem;
                        return { ...elem, isStart: false };
                      });
                    });
                    newgrid[yindex][xindex] = {
                      ...newgrid[yindex][xindex],
                      isStart: true,
                      isTarget: false,
                      weight: 1,
                      isWall: false,
                    };
                    start.current = { x: xindex, y: yindex };
                    setGrid(newgrid);
                    break;

                  case "setTarget":
                    var newgrid = grid.map((elem) => {
                      return elem.map((elem) => {
                        if (!elem.isTarget) return elem;
                        return { ...elem, isTarget: false };
                      });
                    });
                    newgrid[yindex][xindex] = {
                      ...newgrid[yindex][xindex],
                      isStart: false,
                      isTarget: true,
                      weight: 1,
                      isWall: false,
                    };
                    end.current = { x: xindex, y: yindex };
                    setGrid(newgrid);
                    break;

                  case "addBricks":
                    var newgrid = grid.slice();
                    newgrid[yindex][xindex] = {
                      ...newgrid[yindex][xindex],
                      weight: 1,
                      isWall: true,
                    };
                    setGrid(newgrid);
                    break;

                  case "addWeight":
                    var newgrid = grid.slice();
                    newgrid[yindex][xindex] = {
                      ...newgrid[yindex][xindex],
                      weight: weight,
                      isWall: false,
                    };
                    setGrid(newgrid);
                    break;
                  default:
                    return;
                }
              }}
            >
              {cell.weight > 1 ? cell.weight : null}
              {cell.isStart ? <i className="bi bi-geo-alt"></i> : null}
              {cell.isTarget ? <i className="bi bi-geo"></i> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Grid

const StyledHeading = styled.h3`
  text-align: center:
  color: blue;
  background-color: white;
  padding: 1rem;
`