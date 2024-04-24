const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth-200;
canvas.height = window.innerHeight;

const a = 1 / 4;
const b = 1 / 9;
const range = 1.1;

function f(x, y, n = 0) {
  const d = x * x + y * y;
  if (d < 9) {
    return Math.floor (f(x * x + y * y - a * x / d, 2 * x * y + b * y / d, n + 1));
  } else {
    return (Math.cos(n / 8) + 1) * 128;
  }
}
function fz(x, y, n = 0) {
  const d = x * x + y * y;
  if (d < 5) {
    return Math.floor (f(x * x + y * y - a * x / d, 2 * x * y + b * y / d, n + 1));
  } else {
    //return (Math.cos(n / 8) + 1) * 128;
    return (Math.sin(n / 8+Math.sqrt(x)) + 1) * 128;//Este es el que me gusta
    //return (Math.atan2(n / 8,Math.sqrt(x)) + 1) * 228;
    //return (Math.atan2(n / 8,x) + 1) * 128;
  }
}
let yy = 0;
let t=0;
function draw() {
  t = 0.5;
  if (yy < canvas.height) {
    const y = map(yy, canvas.height,0, -range, range);
    for (let xx = canvas.width; xx >= -1 ; xx -= t) {
      const x1 = map(xx, canvas.width ,0, -range, range);
      const grayScale = f(y,x1); 
      const grayScale2 = fz(y,x1); 
      const r= Math.sin(grayScale2/2)**2*256
      const g= (15000 / grayScale2) % 256
      const b= (25000 / Math.log(grayScale2)) % 256
      const ah= map(Math.cos(grayScale2)**2*256,0,255,0.3,0);
      ctx.strokeStyle = `rgb(${grayScale}, ${grayScale}, ${grayScale})`;
      
      ctx.beginPath();
      ctx.moveTo(xx, yy);
      ctx.lineTo(xx, yy + grayScale);
      ctx.stroke();
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b},${ah})`; 
      ctx.beginPath();
      ctx.moveTo( xx, yy);
      ctx.lineTo( xx, yy + grayScale2);
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
