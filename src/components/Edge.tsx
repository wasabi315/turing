import * as React from 'react';
import { Arrow } from 'react-konva';
import { Point } from '../../lib/Point';

interface EdgeProps {
  startId: number;
  endId: number;
  startPos: Point;
  endPos: Point;
}

const Edge: React.SFC<EdgeProps> = props => {

  const points =
    [ props.startPos.x, props.startPos.y,
      props.endPos.x, props.endPos.y
    ];
  return (
    <Arrow
      points={points}
      fill="#4c566a"
      stroke="#4c566a"
      pointerWidth={20}
      pointerLength={20}
    />
  );

}

export default Edge;
