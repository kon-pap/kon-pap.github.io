class Node {
    constructor(x, y, i) {
      this.pos = createVector(x, y)
      this.radius = 5
      this.maxDist = 120
      this.xoff1 = random(i * 1000000, (i + 1) * 1000000)
      this.xoff2 = random(-(i + 1) * 1000000, -i * 1000000)
      this.primary = color(0, 0, 0)
      this.secondary = color(64, 64, 64)
    }
    
    getX() {
      return this.pos.x
    }
    
    getY() {
      return this.pos.y  
    }
    
    findNeighbors(nodes, lim) {
      let neighbors = []
      let maxDist = this.maxDist
      for (let i = lim; i < nodes.length; i++) {
        let dist = maxDist**2 - ((this.pos.x - nodes[i].getX())**2 + (this.pos.y - nodes[i].getY())**2)
  
        if (dist >= 0 && dist != maxDist**2) {
          neighbors.push(nodes[i])
        }
      }
      
      return neighbors
    }
    
    update() {
      this.pos.x = map(noise(this.xoff1), 0, 1, -width *  2/ 3, 5 / 3 * width)
      this.pos.y = map(noise(this.xoff2), 0, 1, -height *  2/ 3, 5 / 3 * height)
      this.xoff1 += 0.0003
      this.xoff2 += 0.0003
    }
    
    show() {
      noFill();
      stroke(this.secondary);
      strokeWeight(2);
      ellipse(this.pos.x, this.pos.y, 2 * this.radius)
    }
}