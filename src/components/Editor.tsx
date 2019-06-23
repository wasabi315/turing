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
  nodePos: Point[];
}

class Editor extends React.Component<EditorProps, EditorState> {

  constructor(props: EditorProps) {
    super(props);
    this.state = {
      graph: new Graph(),
      nodePos: [],
    };
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
          />
        </Layer>
      </Stage>
    );
  }

}

export default Editor;
