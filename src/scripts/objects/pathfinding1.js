class PathfinderNode {
  constructor(gridX, gridY, isWalkable) {
    this.gridX = gridX;
    this.gridY = gridY;
    this.hCost = 0;
    this.gCost = 0;
    this.parent = null;
    this.isWalkable = isWalkable;
  }

  get fCost() {
    this.gCost + this.hCost;
  }
}

export default class Pathfinder {
  constructor(tiles, tileWidth, tileHeight) {
    this.tileWidth = tileWidth || 64
    this.tileHeight = tileHeight || 64;
    this.lengthY = tiles.length;
    this.lengthX = tiles[0].length;
    this.nodes = tiles.map(function(row, y) {
      return row.map(function(isWalkable, x) {
        return new PathfinderNode(x, y, isWalkable);
      });
    });
  }

  getPath(pointA, pointB) {
    const startNode = this.getNodeFromXY(pointA.x, pointA.y);
    const targetNode = this.getNodeFromXY(pointB.x, pointB.y);
    const deadNodes = [];
    const liveNodes = [startNode];
    while (liveNodes.length) {
      let currentNode = liveNodes[0];

      for (let i = 1; i < liveNodes.length; i++) {
        const node = liveNodes[i];

        if (node.fCost < currentNode.fCost || (node.fCost === currentNode.fCost && node.hCost < currentNode.hCost)) {
          currentNode = node;
        }
      }
    
      liveNodes.splice(liveNodes.findIndex((node) => node === currentNode), 1);
      deadNodes.push(currentNode);
      

      if (currentNode === targetNode) {
        return this.tracePath(startNode, targetNode);
      }
      
      this.getNeighbours(currentNode).forEach((neighbour) => {
        if (neighbour.isWalkable == 1&& !deadNodes.includes(neighbour)) {
          const cost = currentNode.gCost + this.getDistance(currentNode, neighbour);

          if (cost < neighbour.gCost || !liveNodes.includes(neighbour)) {
            neighbour.gCost = cost;
            neighbour.hCost = this.getDistance(neighbour, targetNode);
            neighbour.parent = currentNode;

            if (!liveNodes.includes(neighbour)) {
              liveNodes.push(neighbour);
            }
          }
        }
      });
    }

    return null;
  }

  tracePath(nodeA, nodeB) {
    const path = [];
  
    let currentNode = nodeB;
  
    while (currentNode !== nodeA) {
      path.push({
        x: (currentNode.gridX * this.tileWidth) + (this.tileWidth / 2),
        y: (currentNode.gridY * this.tileHeight) + (this.tileHeight / 2)
      });
  
      currentNode = currentNode.parent;
    }

    path.reverse();
  
    return path;
  }
  
  getNeighbours(node) {
    const neighbours = [];
    
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        if (x === 0 && y === 0) {
          continue;
        }
        
        const checkX = node.gridX + x;
        const checkY = node.gridY + y;
  
        if (checkX >= 0 && checkX < this.lengthX && checkY >= 0 && checkY < this.lengthY) {
          neighbours.push(this.nodes[checkY][checkX]);
        }
      }
    }
  
    return neighbours;
  }
  
  getNodeFromXY(x, y) {
    const gridX = Math.floor(x / this.tileWidth);
    const gridY = Math.floor(y / this.tileHeight);
  
    return this.nodes[gridY][gridX] || null;
  }
  
  getDistance(nodeA, nodeB) {
    const distX = Math.abs(nodeA.gridX - nodeB.gridX);
    const distY = Math.abs(nodeA.gridY - nodeB.gridY);
  
    if (distX > distY) {
      return this.calcDistance(distY, distX);
    }
    
    return this.calcDistance(distX, distY);
  }
  
  calcDistance(a, b) {
    return (14 * a) + (10 * (b - a));
  }
}