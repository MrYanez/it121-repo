const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// positioning initial settings
const rectangles = [
  { x: 0, color: 'green' },
  { x: -200, color: 'white' },
  { x: -400, color: 'red' }
];
const y = 50;
const width = 150;
const height = 80;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // it draws the lines
  drawLine(y - 20, 'green');
  drawLine(y + height + 20, 'red');

  // it draws the rectangles
  const startX = (canvas.width - ((width * 3) + 40)) / 2;
  let allInPosition = true;

  rectangles.forEach((rect, i) => {
    const finalX = startX + (i * (width + 20));

    if (rect.x < finalX) {
      rect.x += 0.5;
      allInPosition = false;
    }

    drawRectangle(rect.x, y, rect.color);
  });

  // it draws the arc when animation is completed
  if (allInPosition) {
    drawArc(rectangles[1].x + width/2, y + height/2);
  }

  requestAnimationFrame(draw);
}

function drawLine(yPos, color) {
  ctx.beginPath();
  ctx.moveTo(0, yPos);
  ctx.lineTo(canvas.width, yPos);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();
}

function drawRectangle(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
}

function drawArc(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 25, 0, Math.PI * 2);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();
}

draw();