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
        radius={35}
        fill="#88c0d0"
        shadowColor="#2e3440"
        shadowOffsetY={5}
        shadowBlur={20}
        shadowOpacity={0.6}
      />
      <Text
        text={String(props.id)}
        x={-35}
        y={-16}
        fontSize={32}
        fontFamily="Didact Gothic"
        fontStyle="bold"
        fill="#2e3440"
        width={70}
        height={70}
        align="center"
        verticalAlign="middle"
      />
    </Group>
  )

}

export default Node;
