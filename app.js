const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth-20;
canvas.height = window.innerHeight;

const a = 1 / 4;
const b = 1 / 9;
const range = 1.1;
const scalar = 8; 
const fact = 128;
const traslucid = 1;
let mouseX = 0;
let mouseY = 0;
let perMathB =1, perMathG =1, perMathR =1, col =2500;

function f(x, y, n = 0) {
  const d = x * x + y * y;
          
  if (d < 7) {
      return Math.floor(f(x * x + y * y - a * x / d, 2 * x * y + b * y / d, n + 1));
  } else {
      // return (Math.cos(n / 8) + 1) * 128;
      return (Math.sin(n / scalar + Math.sqrt(x)) + 1) * fact/traslucid;
  }
}
function fz(x, y, n = 0) {
  const d = x * x + y * y;
  
  if (d < 9) {
      return Math.floor(f(x * x + y * y - a * x / d, 2 * x * y + b * y / d, n + 1));
  } else {
      return (Math.sin(n / scalar + Math.sqrt(x)) + 1) * fact*traslucid;
  }
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

canvas.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

let yy = 0;
let t=0;
function draw() {
  t = 0.4;
  if (yy < canvas.height) {
    const y = map(yy, canvas.height, 0, -range, range);
    for (let xx = canvas.width; xx >= -1; xx -= t) {
      const x1 = map(xx, canvas.width, 0, -range, range);
      const grayScale = f(y, x1);
      const grayScale2 = fz(y, x1);
 
      let distToCenter = dist(xx, yy, canvas.width / 2, canvas.height / 2);
      let maxDist = dist(0, 0, mouseX + canvas.width / 0.9, mouseY - canvas.height / 2);
      
      let darknessFactor = map(distToCenter, 0, maxDist, 1, 0);
      let agray0 = grayScale;
      let agray1 = grayScale2 * darknessFactor;
      const r = perMathR * (Math.sin(agray1 / 2) ** 2 * 156);
      const g = perMathG * ((col / agray1) % 156 * traslucid);
      const b = perMathB * ((col / Math.log(agray1)) % 156 * traslucid);
      const ah = map(Math.cos(agray1) ** 2 * 256, 0, 255, 0, 255);
      ctx.strokeStyle = `rgba(${agray0}, ${agray0}, ${agray0}, ${ah})`;
      
      ctx.beginPath();
      ctx.moveTo(xx, yy);
      ctx.lineTo(xx, yy + agray1);
      ctx.stroke();
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b},${ah})`;
      ctx.beginPath();
      ctx.moveTo(xx, yy);
      ctx.lineTo(xx, yy + grayScale2);
      ctx.stroke();
    }
    yy += t;
  }
}

function map(value, start1, stop1, start2, stop2) {
  return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}
function animate() {
  draw();
  requestAnimationFrame(animate);
}
animate();
