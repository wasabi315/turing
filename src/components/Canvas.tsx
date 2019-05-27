import * as React from 'react';

interface CanvasProps {
  width: number;
  height: number;
  updateCanvas(ctx: CanvasRenderingContext2D): void;
}

class Canvas extends React.Component<CanvasProps, {}> {

  private canvasRef = React.createRef<HTMLCanvasElement>()

  componentDidMount() {
    this.updateCanvas();
  }

  componentWillReceiveProps(nextProps: CanvasProps) {
    if (this.props !== nextProps) {
      this.updateCanvas();
    }
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const canvas = this.canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.props.updateCanvas(ctx);
      }
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
