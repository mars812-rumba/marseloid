/** Shared physical proportions for the existing CSS device, in model coordinates. */
export const LAPTOP = {
  aspect: 1.1,
  viewportAspect: 1.03,
  hinge: 0.67,
  side: 0.03,
  hingeLift: 8,
  baseHalfDepth: 4,
  lidHalfDepth: 3,
  lidOffset: 90,
} as const;

export const laptopCameraDistance = (width: number) =>
  Math.max(1400, width * 6);

/** Project only the sixteen shell corners: no DOM/layout reads during animation. */
export function fitLaptop(
  width: number,
  pitch: number,
  yaw: number,
  lid: number,
) {
  const height = width / LAPTOP.aspect;
  const camera = laptopCameraDistance(width);
  const radians = Math.PI / 180;
  const cy = Math.cos(yaw * radians),
    sy = Math.sin(yaw * radians);
  const cp = Math.cos(pitch * radians),
    sp = Math.sin(pitch * radians);
  const cl = Math.cos(lid * radians),
    sl = Math.sin(lid * radians);
  const hinge = height * LAPTOP.hinge;
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;

  function project(x: number, y: number, z: number) {
    x -= width / 2;
    y -= height / 2;
    const turnedX = x * cy + z * sy;
    const turnedZ = -x * sy + z * cy;
    const turnedY = y * cp - turnedZ * sp;
    const depth = y * sp + turnedZ * cp;
    const perspective = camera / (camera - depth);
    const screenX = width / 2 + turnedX * perspective;
    const screenY = height / 2 + turnedY * perspective;
    minX = Math.min(minX, screenX);
    maxX = Math.max(maxX, screenX);
    minY = Math.min(minY, screenY);
    maxY = Math.max(maxY, screenY);
  }
  for (const x of [width * LAPTOP.side, width * (1 - LAPTOP.side)]) {
    for (const distance of [0, hinge]) {
      for (const depth of [-LAPTOP.baseHalfDepth, LAPTOP.baseHalfDepth]) {
        // The deck is horizontal: rotateX(90deg), extending toward the viewer.
        project(x, hinge - depth, distance);
      }
      for (const depth of [-LAPTOP.lidHalfDepth, LAPTOP.lidHalfDepth]) {
        project(
          x,
          hinge - LAPTOP.hingeLift - distance * cl - depth * sl,
          -distance * sl + depth * cl,
        );
      }
    }
  }
  // Reserve room for the 8 px bob, edge antialiasing and a clear viewport gutter.
  const margin = width < 600 ? 12 : 20;
  const targetHeight = width / LAPTOP.viewportAspect;
  const scale = Math.min(
    (width - margin * 2) / (maxX - minX),
    (targetHeight - margin * 2) / (maxY - minY),
    1.6,
  );
  return {
    scale,
    x: (width - (minX + maxX) * scale) / 2,
    y: (targetHeight - (minY + maxY) * scale) / 2,
  };
}
