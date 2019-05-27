import { Point } from '../utils';

class Circle {

  center: Point;
  r: number;
  i: number;

  constructor(p: Point, r: number, i: number) {
    this.center = p;
    this.r = r;
    this.i = i;
  }

  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.save();
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'black';
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.r, 0, Math.PI * 2, true);
    ctx.fillStyle = '#88c0d0';
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.font = 'bold 30pt Arial';
    ctx.fillStyle = '#2e3440';
    ctx.textAlign = 'center';
    ctx.fillText(String(this.i), this.center.x, this.center.y + 12);
    ctx.restore();
  }

  isOnCircle = (p: Point): boolean => (
    Math.pow(this.center.x - p.x, 2) + Math.pow(this.center.y - p.y, 2) <= Math.pow(this.r, 2)
  )

}

export default Circle;
