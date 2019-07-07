import * as React from 'react';
import { KonvaEventObject } from 'konva/types/Node';
import { Layer, Rect, Stage } from 'react-konva';
import Graph from '../../lib/Graph';
import { Point } from '../../lib/Point';
import Node from './Node';
import Edge from './Edge';
import Loop from './Loop';

interface EditorProps {
  width: number;
  height: number;
}

interface EditorState {
  graph: Graph;
  nodePos: Map<number, Point>;
  arrowStart: number | null;
}

class Editor extends React.Component<EditorProps, EditorState> {

  constructor(props: EditorProps) {
    super(props);
    this.state = {
      graph: new Graph(),
      nodePos: new Map(),
      arrowStart: null,
    };
  }

  handleClick = (e: KonvaEventObject<MouseEvent>): void => {
    const pos: Point = e.target.getStage().getPointerPosition();
    const ix: number = this.state.graph.nextIx();
    this.setState(state => ({
      ...state,
      graph: state.graph.addNode(ix),
      nodePos: state.nodePos.set(ix, pos),
    }));
  }

  handleNodeClick = (_: KonvaEventObject<MouseEvent>, i: number): void => {
    const start = this.state.arrowStart;
    if(start === null) {
      this.setState({ arrowStart: i });
    } else {
      this.setState(state => ({
        ...state,
        graph: state.graph.addEdge(start, i),
        arrowStart: null,
      }));
    }
  }

  handleNodeDrag = (e: KonvaEventObject<MouseEvent>, i: number): void => {
    const pos: Point = e.target.getStage().getPointerPosition();
    this.setState(state => ({
      ...state,
      nodePos: state.nodePos.set(i, pos),
    }));
  }

  renderNode = () => {
    let nodes: React.ReactElement[] = [];
    this.state.nodePos.forEach((p, i) => nodes.push(
        <Node
          id={i}
          pos={p}
          onClick={e => this.handleNodeClick(e, i)}
          onDrag={e => this.handleNodeDrag(e, i)}
        />
      )
    );
    return nodes;
  }

  renderEdge = () => {
    let edges: React.ReactElement[] = [];
    this.state.graph.forEachEdge((i, j) => edges.push(
      i === j
        ?
          <Loop
            id={i}
            pos={this.state.nodePos.get(i)!}
          />
        :
          <Edge
            startId={i}
            endId={j}
            startPos={this.state.nodePos.get(i)!}
            endPos={this.state.nodePos.get(j)!}
          />
    ));
    return edges;
  }

  render() {
    return (
      <Stage
        width={this.props.width}
        height={this.props.height}
      >
        <Layer>
          <Rect
            width={this.props.width}
            height={this.props.height}
            fill="#2e3440"
            onClick={this.handleClick}
          />
          {this.renderEdge()}
          {this.renderNode()}
        </Layer>
      </Stage>
    );
  }

}

export default Editor;
