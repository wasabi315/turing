import * as React from 'react';
import Circle from '../shapes/Circle';
import Arrow from '../shapes/Arrow';
import { Point } from '../utils';

interface EditorProps {
  width: number;
  height: number;
}

interface EditorState {
  arrows: Arrow[];
  circles: Circle[];
  arrowStart: number | null;
  isDragging: boolean;
  dragTarget: number | null;
}

class Editor extends React.Component<EditorProps, EditorState> {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(props: EditorProps) {
    super(props);
    this.state = {
      arrows: [],
      circles: [],
      arrowStart: null,
      isDragging: false,
      dragTarget: null,
    }
  }

  componentDidMount() {
    this.canvas = document.getElementsByTagName('canvas')[0];
    let ctx = this.canvas.getContext('2d');
    if(ctx) {
      this.ctx = ctx;
    }
    this.renderCanvas();
    this.canvas.addEventListener('click', this.onClick);
    this.canvas.addEventListener('dblclick', this.onDblClick);
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mouseup', this.onMouseUp);
    this.canvas.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('mouseout', this.onMouseUp);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('click', this.onClick);
    this.canvas.removeEventListener('dblclick', this.onDblClick);
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('mouseup', this.onMouseUp);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    this.canvas.removeEventListener('mouseout', this.onMouseUp);
  }

  onMouseDown = (e: MouseEvent): void => {
    const pos = this.getMousePosOnCanvas(e);
    this.state.circles.map((c: Circle, i: number) => {
      if(c.isOnCircle(pos)) {
        this.setState({
          isDragging: true,
          dragTarget: i,
        });
      }
    })
  }

  onMouseUp = (e: MouseEvent): void => {
    this.setState({
      isDragging: false,
      dragTarget: null,
    });
  }

  onMouseMove = (e: MouseEvent): void => {
    const pos = this.getMousePosOnCanvas(e);
    if(this.state.isDragging) {
      const circles = this.state.circles.slice();
      circles.map((c: Circle, i: number) => {
        if(i === this.state.dragTarget) { c.center = pos };
      });
      this.setState({ circles: circles });
      this.renderCanvas();
    }

  }

  onDblClick = (e: MouseEvent): void => {
    const pos = this.getMousePosOnCanvas(e);
    const circle = new Circle(pos, 40, this.state.circles.length);
    const circles = this.state.circles.concat(circle);
    this.setState({ circles: circles });
    this.renderCanvas();
  }

  onClick = (e: MouseEvent): void => {
    if (e.shiftKey) {
      const pos = this.getMousePosOnCanvas(e);
      if (this.state.arrowStart === null) {
        this.state.circles.map((c: Circle, i: number) => {
          if (c.isOnCircle(pos)) this.setState({ arrowStart: i });
        });
      } else {
        this.state.circles.map((c: Circle, i: number) => {
          if (c.isOnCircle(pos)) {
            const start = this.state.circles[this.state.arrowStart].center;
            const end = c.center;
            const arrow = new Arrow(start, end);
            const arrows = this.state.arrows.concat(arrow);
            this.setState({
              arrows: arrows,
              arrowStart: null,
            });
            this.renderCanvas();
          }
        })
      }
    }
  }

  getMousePosOnCanvas = (e: MouseEvent): Point => {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  renderCanvas = (): void => {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#2e3440';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.state.arrows.map((a: Arrow) => a.draw(this.ctx));
    this.state.circles.map((c: Circle) => c.draw(this.ctx));
    this.ctx.restore();
  }

  render() {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height}
      />
    );
  }

}

export default Editor;
