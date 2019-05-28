import { Point } from '../utils';

class Arrow {

  start: Point;
  end: Point;

  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }

  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#4c566a';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#2e3440';
    ctx.stroke();
    ctx.beginPath();
    const theta: number = Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x);
    ctx.moveTo(this.end.x + 4 * Math.cos(theta), this.end.y + 4 * Math.sin(theta));
    ctx.lineTo(this.end.x - 25 * Math.cos(theta + Math.PI / 6), this.end.y - 25 * Math.sin(theta + Math.PI / 6));
    ctx.lineTo(this.end.x - 25 * Math.cos(theta - Math.PI / 6), this.end.y - 25 * Math.sin(theta - Math.PI / 6));
    ctx.closePath();
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'rgba(0, 0, 0, 0)'
    ctx.fillStyle = '#4c566a';
    ctx.fill();
    ctx.restore();
  }

}

export default Arrow;
