function roundRect(id, x, y, w, h, radius)
{
  var canvas = document.getElementById(id);
  var context = canvas.getContext("2d");
  var r = x + w;
  var b = y + h;
  context.beginPath();
  context.strokeStyle="green";
  context.lineWidth="4";
  context.moveTo(x+radius, y);
  context.lineTo(r-radius, y);
  context.quadraticCurveTo(r, y, r, y+radius);
  context.lineTo(r, y+h-radius);
  context.quadraticCurveTo(r, b, r-radius, b);
  context.lineTo(x+radius, b);
  context.quadraticCurveTo(x, b, x, b-radius);
  context.lineTo(x, y+radius);
  context.quadraticCurveTo(x, y, x+radius, y);
  context.stroke();
}