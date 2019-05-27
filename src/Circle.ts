class Circle {

  x: number;
  y: number;
  r: number;
  i: number;

  constructor(x: number, y:number, r: number, i: number) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.i = i;
  }

  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.save();
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'black';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    ctx.fillStyle = '#88c0d0';
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.font = 'bold 30pt Arial';
    ctx.fillStyle = '#2e3440';
    ctx.textAlign = 'center';
    ctx.fillText(String(this.i), this.x, this.y + 12);
    ctx.restore();
  }

  isOnCircle = (x: number, y: number): boolean => (
    Math.pow(this.x -x, 2) + Math.pow(this.y - y, 2) <= Math.pow(this.r, 2)
  )

}

export default Circle;
