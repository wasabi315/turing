import * as React from 'react';
import { KonvaEventObject } from 'konva/types/Node';
import { Layer, Rect, Stage } from 'react-konva';
import { observer } from 'mobx-react-lite';

import GraphStoreContext from '../stores/GraphStore';
import EditorStoreContext from '../stores/EditorStore';
import { Point } from '../../lib/Point';
import Node from './Node';
import Edge from './Edge';
import Loop from './Loop';

interface EditorProps {
  width: number;
  height: number;
}

const Editor: React.FC<EditorProps> = observer(props => {

  const graphStore = React.useContext(GraphStoreContext);
  const editorStore = React.useContext(EditorStoreContext);

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    const pos: Point = e.target.getStage().getPointerPosition();
    const ix: number = graphStore.graph.nextIx();
    graphStore.graph.addNode(ix);
    editorStore.nodePos.set(ix, pos);
  }

  const handleNodeClick = (i: number) => (_: KonvaEventObject<MouseEvent>) => {
    if(editorStore.arrowStart === null) {
      editorStore.arrowStart = i;
    } else {
      graphStore.graph.addEdge(editorStore.arrowStart, i);
      editorStore.arrowStart = null;
    }
  }

  const handleNodeDrag = (i: number) => (e: KonvaEventObject<MouseEvent>) => {
    const pos: Point = e.target.getStage().getPointerPosition();
    editorStore.nodePos.set(i, pos);
  }

  const renderNode = () => {
    let nodes: React.ReactElement[] = [];
    editorStore.nodePos.forEach((p, i) => nodes.push(
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
    graphStore.graph.forEachEdge((i, j) => edges.push(
      i === j
        ?
          <Loop
            id={i}
            pos={editorStore.nodePos.get(i)!}
          />
        :
          <Edge
            startId={i}
            endId={j}
            startPos={editorStore.nodePos.get(i)!}
            endPos={editorStore.nodePos.get(j)!}
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

});

export default Editor;
