import * as React from 'react';
import { Arrow } from 'react-konva';
import { Point } from '../../lib/Point';

interface LoopProps {
  id: number;
  pos: Point;
  radius: number;
}

const Loop: React.SFC<LoopProps> = props => {

  const points =
    [ props.pos.x, props.pos.y,
      props.pos.x, props.pos.y + 2 * props.radius,
      props.pos.x, props.pos.y,
    ];
  return (
    <Arrow
      points={points}
      tension={1.0}
      fill="#4c566a"
      stroke="#4c566a"
      pointerWidth={20}
      pointerLength={20}
    />
  );

}

export default Loop;
