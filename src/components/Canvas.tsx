import * as React from 'react';
import { Point, dist } from '../lib/Point';

interface CanvasProps {
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
  withClickPos: (p: Point) => void;
  withDblClickPos: (p: Point) => void;
  withMouseDownPos: (p: Point) => void;
  withMouseMovePos: (p: Point) => void;
  withMouseUpPos: (p: Point) => void;
  onMouseOut: () => void;
}

interface CanvasState {
  isDown: boolean;
  isMoving: boolean;
  clicked: boolean;
  mousePos?: Point;
}

class Canvas extends React.Component<CanvasProps, CanvasState> {

  canvasRef: React.RefObject<HTMLCanvasElement>;
  private clickRadius = 5;
  private dblclickInterval = 200;

  constructor(props: CanvasProps) {
    super(props);
    this.state = {
      isDown: false,
      isMoving: false,
      clicked: false,
    };
    this.canvasRef = React.createRef();
    this.withMousePos.bind(this);
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    if(canvas) {
      canvas.addEventListener('mousedown', this.handleMouseDown);
      canvas.addEventListener('mousemove', this.handleMouseMove);
      canvas.addEventListener('mouseup', this.handleMouseUp);
      canvas.addEventListener('mouseout', this.handleMouseOut)
    }
    this.draw();
  }

  componentWillUnmount() {
    const canvas = this.canvasRef.current;
    if(canvas) {
      canvas.removeEventListener('mousedown', this.handleMouseDown);
      canvas.removeEventListener('mousemove', this.handleMouseMove);
      canvas.removeEventListener('mouseup', this.handleMouseUp);
      canvas.removeEventListener('mouseout', this.handleMouseOut)
    }
  }

  componentWillReceiveProps(next: CanvasProps) {
    if(this.props !== next) this.draw();
  }

  componentWillUpdate() {
    this.draw();
  }

  handleMouseDown = this.withMousePos(p => {
    this.setState({
      isDown: true,
      isMoving: false,
      mousePos: p,
    });
    this.props.withMouseDownPos(p);
  });

  handleMouseMove = this.withMousePos(p => {
    if(!this.state.isDown) return;
    const q = this.state.mousePos;
    if(q && dist(p, q) >= this.clickRadius) {
      this.setState({
        isMoving: true,
        mousePos: p,
      });
      this.props.withMouseMovePos(p);
    }
  });

  handleMouseUp = this.withMousePos(p => {
    this.setState({ isDown: false });
    if(this.state.isMoving) {
      this.props.withMouseUpPos(p);
      this.setState({ isMoving: false });
    } else {
      if(this.state.clicked) {
        this.props.withDblClickPos(p);
        this.setState({ clicked: false });
        return;
      }
      this.setState({ clicked: true });
      setTimeout(() => {
        if(this.state.clicked) this.props.withClickPos(p);
        this.setState({ clicked: false });
      }, this.dblclickInterval)
    }
  });

  handleMouseOut = (_: MouseEvent) => {
    this.props.onMouseOut();
  }

  withMousePos(f: (p: Point) => void) {
    return (
      (e: MouseEvent) => {
        const canvas = this.canvasRef.current;
        if(canvas) {
          const rect = canvas.getBoundingClientRect();
          f({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
      }
    );
  }

  draw() {
    const canvas = this.canvasRef.current;
    if(canvas) {
      const ctx = canvas.getContext('2d');
      if(ctx) this.props.draw(ctx);
    }
  }

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }

}

export default Canvas;

