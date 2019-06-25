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

  const { x: startX, y: startY } = props.startPos;
  const { x: endX, y: endY } = props.endPos;
  const theta = Math.atan2(endY - startY, endX - startX);
  const points =
    [ props.startPos.x + 45 * Math.cos(theta),
      props.startPos.y + 45 * Math.sin(theta),
      props.endPos.x - 45 * Math.cos(theta),
      props.endPos.y - 45 * Math.sin(theta)
    ];
  return (
    <Arrow
      points={points}
      fill="#4c566a"
      stroke="#4c566a"
      shadowColor="#2e3440"
      shadowBlur={5}
      shadowOffsetX={5}
      shadowOffsetY={5}
      strokeWidth={4}
      pointerWidth={20}
      pointerLength={20}
    />
  );

}

export default Edge;
