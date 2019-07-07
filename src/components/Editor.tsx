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

const Editor: React.FC<EditorProps> = props => {

  const [graphState, setGraphState] = React.useState({ graph: new Graph() });
  const [nodePosState, setNodePosState] = React.useState({ nodePos: new Map() });
  const [arrowStart, setArrowStart] = React.useState<number | null>(null);

  const handleClick = (e: KonvaEventObject<MouseEvent>): void => {
    const pos: Point = e.target.getStage().getPointerPosition();
    const ix: number = graphState.graph.nextIx();
    setGraphState({ graph: graphState.graph.addNode(ix) });
    setNodePosState({ nodePos: nodePosState.nodePos.set(ix, pos) });
  }

  const handleNodeClick = (i: number) => (_: KonvaEventObject<MouseEvent>): void => {
    if(arrowStart === null) {
      setArrowStart(i);
    } else {
      setGraphState({ graph: graphState.graph.addEdge(arrowStart, i) });
      setArrowStart(null);
    }
  }

  const handleNodeDrag = (i: number) => (e: KonvaEventObject<MouseEvent>): void => {
    const pos: Point = e.target.getStage().getPointerPosition();
    setNodePosState({ nodePos: nodePosState.nodePos.set(i, pos) });
  }

  const renderNode = () => {
    let nodes: React.ReactElement[] = [];
    nodePosState.nodePos.forEach((p, i) => nodes.push(
        <Node
          id={i}
          pos={p}
          onClick={handleNodeClick(i)}
          onDrag={handleNodeDrag(i)}
        />
      )
    );
    return nodes;
  }

  const renderEdge = () => {
    let edges: React.ReactElement[] = [];
    graphState.graph.forEachEdge((i, j) => edges.push(
      i === j
        ?
          <Loop
            id={i}
            pos={nodePosState.nodePos.get(i)!}
          />
        :
          <Edge
            startId={i}
            endId={j}
            startPos={nodePosState.nodePos.get(i)!}
            endPos={nodePosState.nodePos.get(j)!}
          />
    ));
    return edges;
  }

  return (
    <Stage
      width={props.width}
      height={props.height}
    >
      <Layer>
        <Rect
          width={props.width}
          height={props.height}
          fill="#2e3440"
          onClick={handleClick}
        />
        {renderEdge()}
        {renderNode()}
      </Layer>
    </Stage>
  );

}

export default Editor;
