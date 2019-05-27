import * as React from 'react';
import Circle from '../shapes/Circle';
import { Point } from '../utils';

interface EditorProps {
  width: number;
  height: number;
}

interface EditorState {
  circles: Circle[];
  isDragging: boolean;
  dragTarget: number | null;
}

class Editor extends React.Component<EditorProps, EditorState> {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(props: EditorProps) {
    super(props);
    this.state = {
      circles: [],
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
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mouseup', this.onMouseUp);
    this.canvas.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('mouseout', this.onMouseUp);
    this.canvas.addEventListener('dblclick', this.onDblClick);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('mouseup', this.onMouseUp);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    this.canvas.removeEventListener('mouseout', this.onMouseUp);
    this.canvas.removeEventListener('dblclick', this.onDblClick);
  }

  onMouseDown = (e: MouseEvent): void => {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.state.circles.map((c: Circle, i: number) => {
      if(c.isOnCircle(x, y)) {
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
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if(this.state.isDragging) {
      const circles = this.state.circles.slice();
      circles.map((c: Circle, i: number) => {
        if(i === this.state.dragTarget) {
          c.x = x;
          c.y = y;
        }
      });
      this.setState({ circles: circles });
      this.renderCanvas();
    }

  }

  onDblClick = (e: MouseEvent): void => {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const circle = new Circle(x, y, 40, this.state.circles.length);
    const circles = this.state.circles.concat(circle);
    this.setState({ circles: circles });
    this.renderCanvas();
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
