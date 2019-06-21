import * as React from 'react';
import { Circle, Group, Text } from 'react-konva';
import { Point } from '../../lib/Point';

interface NodeProps {
  id: number;
  pos: Point;
}

const Node: React.SFC<NodeProps> = props => {

  return (
    <Group
      key={props.id}
      x={props.pos.x}
      y={props.pos.y}
      draggable={true}
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

}

export default Node;
