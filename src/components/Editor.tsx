import * as React from 'react';
import {KonvaEventObject} from 'konva/types/Node';
import {Layer, Rect, Stage} from 'react-konva';
import {observer} from 'mobx-react-lite';

import GraphStoreContext from '../stores/GraphStore';
import EditorStoreContext from '../stores/EditorStore';
import {Point} from '../../lib/Point';
import Node from './Node';
import Edge from './Edge';
import Loop from './Loop';

interface EditorProps {
  width: number;
  height: number;
}

const Editor: React.SFC<EditorProps> = observer(props => {
  const graphStore = React.useContext(GraphStoreContext);
  const editorStore = React.useContext(EditorStoreContext);

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    const pos: Point = e.target.getStage().getPointerPosition();
    const ix: number = graphStore.graph.nextIx();
    graphStore.graph.addNode(ix);
    editorStore.nodePos.set(ix, pos);
  };

  const renderNode = () =>
    [...editorStore.nodePos.entries()].map(([i, p]) => <Node id={i} pos={p} />);

  const renderEdge = () =>
    [...graphStore.graph.edges()].map(([i, j]) =>
      i === j ? (
        <Loop id={i} pos={editorStore.nodePos.get(i)!} />
      ) : (
        <Edge
          startId={i}
          endId={j}
          startPos={editorStore.nodePos.get(i)!}
          endPos={editorStore.nodePos.get(j)!}
        />
      ),
    );

  return (
    <Stage width={props.width} height={props.height}>
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
