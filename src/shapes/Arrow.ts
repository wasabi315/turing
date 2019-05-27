class Arrow {

  fromX: number;
  fromY: number;
  toX: number;
  toY: number;

  constructor(fx: number, fy: number, tx: number, ty: number) {
    this.fromX = fx;
    this.fromY = fy;
    this.toX = tx;
    this.toY = ty;
  }

  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.fromX, this.fromY);
    ctx.lineTo(this.toX, this.toY);
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#4c566a';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#2e3440';
    ctx.stroke();
    ctx.beginPath();
    const theta: number = Math.atan2(this.toY - this.fromY, this.toX - this.fromX);
    ctx.moveTo(this.toX + 4 * Math.cos(theta), this.toY + 4 * Math.sin(theta));
    ctx.lineTo(this.toX - 25 * Math.cos(theta + Math.PI / 6), this.toY - 25 * Math.sin(theta + Math.PI / 6));
    ctx.lineTo(this.toX - 25 * Math.cos(theta - Math.PI / 6), this.toY - 25 * Math.sin(theta - Math.PI / 6));
    ctx.closePath();
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'rgba(0, 0, 0, 0)'
    ctx.fillStyle = '#4c566a';
    ctx.fill();
    ctx.restore();
  }

}

export default Arrow;
