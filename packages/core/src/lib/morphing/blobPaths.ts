/**
 * SVG blob path generation and morphing utilities
 * Creates organic, morphing shapes for toast notifications
 */

/**
 * Generate an asymmetric blob path (for left/right positioned toasts)
 * @param width - Width of the blob
 * @param height - Height of the blob
 * @param t - Morph parameter (0 = pill, 1 = full blob)
 * @param isLeft - Whether the toast is positioned on the left
 * @returns SVG path string
 */
export function morphPath(
  width: number,
  height: number,
  t: number,
  isLeft: boolean = false
): string {
  const r = height / 2; // Base radius
  const expansion = t * 20; // How much to expand

  // Control points for bezier curves
  const cp = r * 0.55; // Control point distance for circular arcs

  // Asymmetric expansion (more on one side)
  const leftExpansion = isLeft ? expansion : expansion * 0.3;
  const rightExpansion = isLeft ? expansion * 0.3 : expansion;

  // Start at top-left
  const path = [
    `M ${r} 0`,
    // Top edge
    `L ${width - r} 0`,
    // Top-right arc with expansion
    `C ${width - r + cp} 0, ${width + rightExpansion} ${r - cp}, ${width + rightExpansion} ${r}`,
    // Right side arc
    `C ${width + rightExpansion} ${r + cp}, ${width - r + cp} ${height}, ${width - r} ${height}`,
    // Bottom edge
    `L ${r} ${height}`,
    // Bottom-left arc with expansion
    `C ${r - cp} ${height}, ${-leftExpansion} ${r + cp}, ${-leftExpansion} ${r}`,
    // Left side arc
    `C ${-leftExpansion} ${r - cp}, ${r - cp} 0, ${r} 0`,
    'Z',
  ].join(' ');

  return path;
}

/**
 * Generate a symmetric blob path (for center-positioned toasts)
 * @param width - Width of the blob
 * @param height - Height of the blob
 * @param t - Morph parameter (0 = pill, 1 = full blob)
 * @returns SVG path string
 */
export function morphPathCenter(
  width: number,
  height: number,
  t: number
): string {
  const r = height / 2;
  const expansion = t * 15; // Symmetric expansion
  const cp = r * 0.55;

  const path = [
    `M ${r} ${-expansion * 0.5}`,
    // Top edge
    `L ${width - r} ${-expansion * 0.5}`,
    // Top-right arc
    `C ${width - r + cp} ${-expansion * 0.5}, ${width + expansion} ${r - cp}, ${width + expansion} ${r}`,
    // Right side
    `C ${width + expansion} ${r + cp}, ${width - r + cp} ${height + expansion * 0.5}, ${width - r} ${height + expansion * 0.5}`,
    // Bottom edge
    `L ${r} ${height + expansion * 0.5}`,
    // Bottom-left arc
    `C ${r - cp} ${height + expansion * 0.5}, ${-expansion} ${r + cp}, ${-expansion} ${r}`,
    // Left side
    `C ${-expansion} ${r - cp}, ${r - cp} ${-expansion * 0.5}, ${r} ${-expansion * 0.5}`,
    'Z',
  ].join(' ');

  return path;
}

/**
 * Create a simple pill path (initial state)
 * @param width - Width of the pill
 * @param height - Height of the pill
 * @returns SVG path string
 */
export function pillPath(width: number, height: number): string {
  return morphPath(width, height, 0, false);
}

/**
 * Interpolate between two numeric values
 * @param start - Start value
 * @param end - End value
 * @param t - Interpolation parameter (0-1)
 * @returns Interpolated value
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Easing function for smooth transitions
 * @param t - Input value (0-1)
 * @returns Eased value (0-1)
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Easing function for bouncy effect
 * @param t - Input value (0-1)
 * @returns Eased value with bounce
 */
export function easeOutElastic(t: number): number {
  const c4 = (2 * Math.PI) / 3;

  return t === 0
    ? 0
    : t === 1
    ? 1
    : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}
