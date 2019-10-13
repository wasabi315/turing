import * as React from "react"
import { KonvaEventObject } from "konva/types/Node"
import { Circle, Group, Text } from "react-konva"
import { observer } from "mobx-react-lite"
import { Point } from "../../lib/Point"
import EditorStoreContext from "../stores/EditorStore"
import GraphStoreContext from "../stores/GraphStore"

interface NodeProps {
  id: number
  pos: Point
}

const Node: React.SFC<NodeProps> = observer(props => {
  const graphStore = React.useContext(GraphStoreContext)
  const editorStore = React.useContext(EditorStoreContext)

  const handleClick = (_: KonvaEventObject<MouseEvent>) => {
    if (editorStore.arrowStart === null) {
      editorStore.arrowStart = props.id
    } else {
      graphStore.graph.addEdge(editorStore.arrowStart, props.id)
      editorStore.arrowStart = null
    }
  }

  const handleDrag = (e: KonvaEventObject<MouseEvent>) => {
    const pos: Point = e.target.getStage().getPointerPosition()
    editorStore.nodePos.set(props.id, pos)
  }

  return (
    <Group
      key={props.id}
      x={props.pos.x}
      y={props.pos.y}
      draggable={true}
      onClick={handleClick}
      onDragMove={handleDrag}
      onDragEnd={handleDrag}
    >
      <Circle
        radius={30}
        fill="#88c0d0"
        shadowColor="#2e3440"
        shadowOffsetY={5}
        shadowBlur={20}
        shadowOpacity={0.6}
      />
      <Text
        text={String(props.id)}
        x={-30}
        y={-30}
        fontSize={28}
        fontFamily="Didact Gothic"
        fontStyle="bold"
        fill="#2e3440"
        width={60}
        height={60}
        align="center"
        verticalAlign="middle"
      />
    </Group>
  )
})

export default Node
