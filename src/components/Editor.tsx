import * as React from 'react';
import Circle from '../shapes/Circle';
import Arrow from '../shapes/Arrow';
import Canvas from './Canvas';
import { Point } from '../lib/Point';

interface EditorProps {
  width: number;
  height: number;
}

interface EditorState {
  arrows: Arrow[];
  circles: Circle[];
  arrowStart: number | null;
  dragTarget: number | null;
}

class Editor extends React.Component<EditorProps, EditorState> {

  constructor(props: EditorProps) {
    super(props);
    this.state = {
      arrows: [],
      circles: [],
      arrowStart: null,
      dragTarget: null,
    };
  }

  onClickNode = (i: number) => {
    if(this.state.arrowStart !== null) {
      const start = this.state.circles[this.state.arrowStart].center;
      const end = this.state.circles[i].center;
      const arrow = new Arrow(start, end);
      arrow.shrink(55);
      const arrows = this.state.arrows.concat(arrow);
      this.setState({
        arrows: arrows,
        arrowStart: null,
      });
    } else {
      this.setState({ arrowStart: i });
    }
  }

  addNode = (p: Point) => {
    const circle = new Circle(p, 40, this.state.circles.length);
    const circles = this.state.circles.concat(circle);
    this.setState({ circles: circles });
  }

  withClickPos = (p: Point) => {
    let b = true;
    this.state.circles.map((c: Circle, i: number) => {
      if(c.isOnCircle(p)) {
        this.onClickNode(i);
        b = false;
      }
    });
    if(b) this.addNode(p);
  }

  withDblClickPos = (_: Point) => alert('dblclick');

  withMouseDownPos = (p: Point) => {
    this.state.circles.map((c: Circle, i: number) => {
      if(c.isOnCircle(p)) {
        this.setState({ dragTarget: i });
        return;
      }
    });
  }

  withMouseMovePos = (p: Point) => {
    const circles = this.state.circles.slice();
    circles.map((c: Circle, i: number) => {
      if(i === this.state.dragTarget) { c.center = p };
    });
    this.setState({ circles: circles });
  }

  withMouseUpPos = (_: Point) => {
    this.setState({ dragTarget: null });
  }

  onMouseOut = () => {
    this.setState({
      dragTarget: null,
    });
  }

  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.clearRect(0, 0, this.props.width, this.props.height);
    ctx.fillStyle = '#2e3440';
    ctx.fillRect(0, 0, this.props.width, this.props.height);
    this.state.arrows.map((a: Arrow) => a.draw(ctx));
    this.state.circles.map((c: Circle) => c.draw(ctx));
    ctx.restore();
  }

  render() {
    return (
      <Canvas
        width={this.props.width}
        height={this.props.height}
        draw={this.draw}
        withClickPos={this.withClickPos}
        withDblClickPos={this.withDblClickPos}
        withMouseDownPos={this.withMouseDownPos}
        withMouseMovePos={this.withMouseMovePos}
        withMouseUpPos={this.withMouseUpPos}
        onMouseOut={this.onMouseOut}
      />
    )
  }

}

export default Editor;
