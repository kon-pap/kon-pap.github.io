let nodes = []
function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i=0; i < 100; i++) {
    let x = random(0, width)
    let y = random(0, height)
    nodes.push(new Node(x, y, i + 1))
  }
}

function draw() {
  background(220);
  for (let node of nodes) {
    node.update()
    node.show()
  }
  
  for (let node of nodes) {
    for (let n of node.findNeighbors(nodes)) {
     line(node.getX(), node.getY(), n.getX(), n.getY()) 
    }
  }
}