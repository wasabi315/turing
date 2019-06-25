import * as React from 'react';
import { Arc, Group, RegularPolygon } from 'react-konva';
import { Point } from '../../lib/Point';

interface LoopProps {
  id: number;
  pos: Point;
}

const Loop: React.SFC<LoopProps> = props => {

  return (
    <Group
      x={props.pos.x}
      y={props.pos.y - 45}
    >
      <Arc
        innerRadius={28}
        outerRadius={32}
        fill="#4c566a"
        shadowColor="#2e3440"
        shadowBlur={5}
        shadowOffsetX={5}
        shadowOffsetY={5}
        angle={230}
        rotationDeg={155}
      />
      <RegularPolygon
        x={-28}
        y={7}
        sides={3}
        radius={10}
        fill="#4c566a"
        rotationDeg={40}
      />
    </Group>
  );

}

export default Loop;
