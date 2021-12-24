let nodes = []
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i=0; i < 200; i++) {
    let x = random(0, width)
    let y = random(0, height)
    nodes.push(new Node(x, y, i + 1))
  }
}

function draw() {
  background(220);
  for (let node of nodes) {
    node.update()
  }
  
  for (let i = 0; i < nodes.length; i++) {
    let neighbors = nodes[i].findNeighbors(nodes, i + 1);
    for (let n of neighbors) {
      if ((nodes[i].getX()-n.getX())**2 + (nodes[i].getY()-n.getY())**2 > 5**2) {
        createLine(n, nodes[i], n.radius, n.maxDist)
      }
    }
  }

  for (let node of nodes) {
    node.show()
  }
}

function createLine(n1, n2, r, maxDist) {
  let cx1 = n1.getX(); let cy1 = n1.getY();
  let cx2 = n2.getX(); let cy2 = n2.getY();

  let strokeval = map((cx1 - cx2)**2 + (cy1 - cy2)**2, 0, maxDist**2, 100, 220)
  stroke(strokeval)
  if (cx1 == cx2) {
    //console.log("Parallel to yy'");
    if (cy1 > cy2) {
      line(cx1, cy1-r, cx2, cy2+r);
    }
    if (cy1 < cy2) {
      line(cx1, cy1+r, cx2, cy2-r);
    }
    
  }
  else if (cy1 == cy2) {
    //console.log("Parallel to xx'");
    if (cx1 < cx2) {
      line(cx1+r, cy1, cx2-r, cy2);
    }
    if (cx1 > cx2) {
      line(cx1-r, cy1, cx2+r, cy2);
    }
  }
  else {
    //console.log("Regular case");
    let l = (cy1 - cy2) / (cx1 - cx2);
    let a = l**2 + 1;
    let b1 = -2 * cx1 * a;
    let b2 = -2 * cx2 * a;
    let sqrtD = 2 * r * Math.sqrt(a);
    console.log(l, a, b1, b2, sqrtD)
    
    let x11 = (-b1 + sqrtD) / (2 * a);
    let y11 = (x11 - cx1) * l + cy1;
    let x12 = (-b1 - sqrtD) / (2 * a);
    let y12 = (x12 - cx1) * l + cy1;
    let x21 = (-b2 + sqrtD) / (2 * a);
    let y21 = (x21 - cx2) * l + cy2;
    let  x22 = (-b2 - sqrtD) / (2 * a);
    let y22 = (x22 - cx2) * l + cy2;

    let d11 = Math.abs(x11 - cx2);
    let d12 = Math.abs(x12 - cx2);
    let d21 = Math.abs(x21 - cx1);
    let d22 = Math.abs(x22 - cx1);

    if (d11 < d12 && d21 < d22) {
      //console.log("d11 < d12 && d21 < d22")
      line(x11, y11, x21, y21);
    }
    else if (d11 < d12 && d21 >= d22) {
      //console.log("d11 < d12 && d21 >= d22")
      line(x11, y11, x22, y22);
    }
    else if (d11 >= d12 && d21 < d22) {
      //console.log("d11 >= d12 && d21 < d22")
      line(x12, y12, x21, y21);
    }
    else {
      //console.log("d11 >= d12 && d21 >= d22")
      line(x12, y12, x22, y22);
    }
  }
}