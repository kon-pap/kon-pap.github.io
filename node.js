class Node {
    constructor(x, y, i) {
      this.pos = createVector(x, y)
      this.radius = 10
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
    
    findNeighbors(nodes) {
      let neighbors = []
      let maxDist = 60
      for (let n of nodes) {
        let dist = maxDist**2 - ((this.pos.x - n.getX())**2 + (this.pos.y - n.getY())**2)
  
        if (dist >= 0 && dist != maxDist**2) {
          neighbors.push(n)
        }
      }
      
      return neighbors
    }
    
    update() {
      this.pos.x = map(noise(this.xoff1), 0, 1, -width / 3, 4 / 3 * width)
      this.pos.y = map(noise(this.xoff2), 0, 1, -height / 3, 4 / 3 * height)
      this.xoff1 += 0.0005
      this.xoff2 += 0.0005
    }
    
    show() {
      fill(this.primary)
      stroke(this.secondary);
      ellipse(this.pos.x, this.pos.y, this.radius)
    }
}