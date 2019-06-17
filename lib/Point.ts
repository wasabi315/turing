export type Point = {
  x: number,
  y: number,
}

export const dist = (p: Point, q: Point) => {
  const dx = p.x - q.x;
  const dy = p.y - q.y;
  return Math.sqrt(dx*dx + dy*dy);
}

