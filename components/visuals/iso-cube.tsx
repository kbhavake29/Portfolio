// Small isometric wireframe cube used as a quiet accent around the page.

const COS = Math.cos(Math.PI / 6)

export default function IsoCube({ size = 48, className }: { size?: number; className?: string }) {
  const s = 20
  const p = (x: number, y: number, z: number) => `${(32 + (x - y) * COS).toFixed(1)},${(30 + (x + y) * 0.5 - z).toFixed(1)}`
  const face = (pts: [number, number, number][]) => pts.map((v) => p(...v)).join(" ")
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} strokeLinejoin="round" fill="hsl(var(--background))">
        <polygon points={face([[s, 0, 0], [s, s, 0], [s, s, s], [s, 0, s]])} />
        <polygon points={face([[0, s, 0], [s, s, 0], [s, s, s], [0, s, s]])} />
        <polygon points={face([[0, 0, s], [s, 0, s], [s, s, s], [0, s, s]])} />
      </g>
      {/* hidden edges, dashed */}
      <g stroke="currentColor" strokeOpacity={0.2} strokeDasharray="2 2" fill="none">
        <polyline points={`${p(0, 0, s)} ${p(0, 0, 0)} ${p(s, 0, 0)}`} />
        <polyline points={`${p(0, 0, 0)} ${p(0, s, 0)}`} />
      </g>
      {/* signal dot on the top face */}
      <circle cx={32} cy={30 + s / 2 - s} r={1.8} fill="hsl(var(--signal))" />
    </svg>
  )
}
