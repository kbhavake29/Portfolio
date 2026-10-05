"use client"

import { useRef, useState } from "react"
import { motion, useAnimationFrame, useInView, useReducedMotion } from "framer-motion"

// Interactive Linear-style line drawings. Geometry lives in 3D world space and is projected
// isometrically every frame, so the scene can actually rotate around its vertical axis.

const COS = Math.cos(Math.PI / 6)
const SIN = 0.5
const STROKE = { stroke: "currentColor", strokeOpacity: 0.45, strokeWidth: 1, strokeLinejoin: "round" as const }
const FILL = "hsl(var(--background))"
const SIGNAL = "hsl(var(--signal))"

type Pt = [number, number]

type Projector = {
  p: (x: number, y: number, z: number) => Pt
  depth: (x: number, y: number) => number
  facing: (nx: number, ny: number) => boolean
}

function projector(yaw: number, cx: number, cy: number): Projector {
  const c = Math.cos(yaw)
  const s = Math.sin(yaw)
  const rot = (x: number, y: number): Pt => [x * c - y * s, x * s + y * c]
  return {
    p: (x, y, z) => {
      const [rx, ry] = rot(x, y)
      return [cx + (rx - ry) * COS, cy + (rx + ry) * SIN - z]
    },
    depth: (x, y) => {
      const [rx, ry] = rot(x, y)
      return rx + ry
    },
    facing: (nx, ny) => {
      const [rx, ry] = rot(nx, ny)
      return rx + ry > 1e-6
    },
  }
}

const pts = (list: Pt[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
const seg = (a: Pt, b: Pt) => `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`
const lerp = (a: Pt, b: Pt, k: number): Pt => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]
const frac = (n: number) => n - Math.floor(n)

// A solid box with back faces culled; z is the bottom.
function Box({ P, x, y, z, w, d, h }: { P: Projector; x: number; y: number; z: number; w: number; d: number; h: number }) {
  const x0 = x - w / 2
  const x1 = x + w / 2
  const y0 = y - d / 2
  const y1 = y + d / 2
  const sides: { a: [number, number]; b: [number, number]; n: [number, number] }[] = [
    { a: [x0, y0], b: [x0, y1], n: [-1, 0] },
    { a: [x1, y0], b: [x1, y1], n: [1, 0] },
    { a: [x0, y0], b: [x1, y0], n: [0, -1] },
    { a: [x0, y1], b: [x1, y1], n: [0, 1] },
  ]
  return (
    <g {...STROKE} fill={FILL}>
      {sides
        .filter((f) => P.facing(...f.n))
        .map((f, i) => (
          <polygon
            key={i}
            points={pts([P.p(f.a[0], f.a[1], z), P.p(f.b[0], f.b[1], z), P.p(f.b[0], f.b[1], z + h), P.p(f.a[0], f.a[1], z + h)])}
          />
        ))}
      <polygon points={pts([P.p(x0, y0, z + h), P.p(x1, y0, z + h), P.p(x1, y1, z + h), P.p(x0, y1, z + h)])} />
    </g>
  )
}

function Dot({ at, r = 2.6, opacity = 1 }: { at: Pt; r?: number; opacity?: number }) {
  return <circle cx={at[0]} cy={at[1]} r={r} fill={SIGNAL} opacity={opacity} />
}

function Label({ from, y, text }: { from: number; y: number; text: string }) {
  return (
    <g>
      <path d={seg([from + 6, y], [364, y])} stroke="currentColor" strokeOpacity={0.3} strokeDasharray="2 3" />
      <text x={370} y={y + 3.5} className="font-mono" fontSize={10} letterSpacing={1} fill="currentColor" fillOpacity={0.55}>
        {text}
      </text>
    </g>
  )
}

type SceneProps = { yaw: number; t: number }

/* ---------- Scene 1: the stack ---------- */

const W = 140
const T = 10
const GAP = 88
const LAYERS = ["DATA", "SERVICES", "API", "INTERFACE"]
const CYCLE = 4.8

function StackScene({ yaw, t }: SceneProps) {
  const P = projector(yaw, 196, 365)
  const h = W / 2
  const zs = LAYERS.map((_, i) => i * GAP)
  const corners: [number, number][] = [
    [-h + 14, -h + 14],
    [h - 14, -h + 14],
    [h - 14, h - 14],
    [-h + 14, h - 14],
  ]
  // the data bus is whichever pillar is currently nearest the viewer
  const bus = corners.reduce((best, c) => (P.depth(...c) > P.depth(...best) ? c : best))
  const u = frac(t / CYCLE)
  const top = zs[3]

  return (
    <g>
      {LAYERS.map((name, i) => {
        const z = zs[i]
        const next = zs[i + 1]
        const right = Math.max(...[[-h, -h], [h, -h], [h, h], [-h, h]].map(([x, y]) => P.p(x, y, z)[0]))
        return (
          <g key={name}>
            <Box P={P} x={0} y={0} z={z - T} w={W} d={W} h={T} />

            {name === "DATA" && (
              <g {...STROKE} strokeOpacity={0.35}>
                {[0, 1, 2, 3].map((k) => (
                  <path key={k} d={seg(P.p(-34, -24 + k * 16, z), P.p(34, -24 + k * 16, z))} />
                ))}
              </g>
            )}
            {name === "SERVICES" && (
              <g fill="currentColor" fillOpacity={0.45}>
                {Array.from({ length: 25 }).map((_, k) => {
                  const [x, y] = P.p(-32 + (k % 5) * 16, -32 + Math.floor(k / 5) * 16, z)
                  return <circle key={k} cx={x} cy={y} r={1.3} />
                })}
              </g>
            )}
            {name === "API" && (
              <g {...STROKE} strokeOpacity={0.35} fill="none">
                {[34, 22, 10].map((r) => (
                  <polygon key={r} points={pts([P.p(-r, -r, z), P.p(r, -r, z), P.p(r, r, z), P.p(-r, r, z)])} />
                ))}
                <Dot at={P.p(0, 0, z)} r={2} />
              </g>
            )}
            {name === "INTERFACE" && (
              <g>
                <Box P={P} x={0} y={0} z={z} w={34} d={8} h={26} />
                <polygon
                  points={pts([P.p(-17, 4, z + 26), P.p(17, 4, z + 26), P.p(17, -4, z + 26), P.p(-17, -4, z + 26)])}
                  fill={SIGNAL}
                  opacity={u > 0.82 && u < 0.98 ? 0.4 * Math.sin(((u - 0.82) / 0.16) * Math.PI) : 0}
                />
              </g>
            )}

            <Label from={right} y={P.p(0, 0, z)[1]} text={name} />

            {next !== undefined && (
              <g>
                {corners
                  .filter((c) => c !== bus)
                  .map(([x, y]) => (
                    <path key={`${x}${y}`} d={seg(P.p(x, y, z), P.p(x, y, next - T))} stroke="currentColor" strokeOpacity={0.3} />
                  ))}
                <path d={seg(P.p(bus[0], bus[1], z), P.p(bus[0], bus[1], next - T))} stroke={SIGNAL} strokeOpacity={0.6} />
                {(() => {
                  const a = 0.07 + i * 0.25
                  if (u < a || u > a + 0.25) return null
                  return <Dot at={lerp(P.p(bus[0], bus[1], z), P.p(bus[0], bus[1], next - T), (u - a) / 0.25)} />
                })()}
              </g>
            )}
          </g>
        )
      })}

      {/* responses streaming out of the interface */}
      {(() => {
        const start = P.p(0, 0, top + 26)
        const end: Pt = [start[0] + 80, start[1] - 50]
        return (
          <g>
            <path d={seg(start, end)} stroke={SIGNAL} strokeOpacity={0.6} strokeDasharray="3 4" />
            {[0, 1, 2].map((k) => {
              const q = frac(t / 1.6 + k / 3)
              const [x, y] = lerp(start, end, q)
              return <rect key={k} x={x - 2.5} y={y - 2.5} width={5} height={5} fill={SIGNAL} opacity={q < 0.85 ? 1 : (1 - q) / 0.15} />
            })}
          </g>
        )
      })()}
    </g>
  )
}

/* ---------- Scene 2: a cluster of nodes ---------- */

const GRID = [-55, 0, 55]
const HEIGHTS = [34, 52, 34, 52, 74, 52, 34, 52, 34]

function ClusterScene({ yaw, t }: SceneProps) {
  const P = projector(yaw, 210, 300)
  const nodes = GRID.flatMap((y, r) => GRID.map((x, c) => ({ x, y, h: HEIGHTS[r * 3 + c], id: r * 3 + c })))
  const edges: [number, number][] = []
  for (let i = 0; i < 9; i++) {
    if (i % 3 < 2) edges.push([i, i + 1])
    if (i < 6) edges.push([i, i + 3])
  }
  const ordered = [...nodes].sort((a, b) => P.depth(a.x, a.y) - P.depth(b.x, b.y))
  const leaderPulse = 0.5 + 0.5 * Math.sin(t * 2.4)

  return (
    <g>
      <Box P={P} x={0} y={0} z={-10} w={176} d={176} h={10} />
      <g fill="currentColor" fillOpacity={0.25}>
        {[-80, 80].flatMap((x) => [-80, 80].map((y) => {
          const [px, py] = P.p(x, y, 0)
          return <circle key={`${x}${y}`} cx={px} cy={py} r={1.2} />
        }))}
      </g>

      {edges.map(([a, b], i) => {
        const A = nodes[a]
        const B = nodes[b]
        const pa = P.p(A.x, A.y, 0)
        const pb = P.p(B.x, B.y, 0)
        const cycle = t / 2.2 + i * 0.37
        const active = Math.floor(cycle) % 3 === 0
        const q = frac(cycle)
        return (
          <g key={i}>
            <path d={seg(pa, pb)} stroke={active ? SIGNAL : "currentColor"} strokeOpacity={active ? 0.55 : 0.25} />
            {active && <Dot at={i % 2 ? lerp(pa, pb, q) : lerp(pb, pa, q)} r={2.2} />}
          </g>
        )
      })}

      {ordered.map((n) => (
        <g key={n.id}>
          <Box P={P} x={n.x} y={n.y} z={0} w={26} d={26} h={n.h} />
          {/* status lights on each node */}
          <circle
            cx={P.p(n.x, n.y, n.h)[0]}
            cy={P.p(n.x, n.y, n.h)[1]}
            r={n.id === 4 ? 2.6 : 1.6}
            fill={n.id === 4 ? SIGNAL : "currentColor"}
            opacity={n.id === 4 ? 0.4 + 0.6 * leaderPulse : 0.4}
          />
        </g>
      ))}
    </g>
  )
}

/* ---------- Scene 3: a small neural network ---------- */

const NET = [
  { x: -120, size: 84, nodes: [-28, 28].flatMap((y) => [-28, 28].map((z) => [y, z] as Pt)) },
  { x: 0, size: 140, nodes: [-50, 0, 50].flatMap((y) => [-50, 0, 50].map((z) => [y, z] as Pt)) },
  { x: 120, size: 64, nodes: [[-18, 0], [18, 0]] as Pt[] },
]

function NetworkScene({ yaw, t }: SceneProps) {
  const P = projector(yaw, 210, 250)
  const Z0 = 0
  const node = (layer: number, k: number) => {
    const [y, z] = NET[layer].nodes[k]
    return P.p(NET[layer].x, y, z + Z0)
  }
  const edges: { a: Pt; b: Pt; seed: number }[] = []
  for (let l = 0; l < NET.length - 1; l++) {
    NET[l].nodes.forEach((_, i) =>
      NET[l + 1].nodes.forEach((__, j) => edges.push({ a: node(l, i), b: node(l + 1, j), seed: frac(Math.sin(l * 97 + i * 13 + j * 7) * 4375.5) })),
    )
  }
  const outPulse = 0.5 + 0.5 * Math.sin(t * 3)

  return (
    <g>
      {/* layer planes */}
      {NET.map((layer, l) => {
        const s = layer.size / 2
        return (
          <polygon
            key={l}
            points={pts([P.p(layer.x, -s, -s + Z0), P.p(layer.x, s, -s + Z0), P.p(layer.x, s, s + Z0), P.p(layer.x, -s, s + Z0)])}
            {...STROKE}
            strokeOpacity={0.3}
            fill="none"
            strokeDasharray="3 3"
          />
        )
      })}
      <g stroke="currentColor" strokeOpacity={0.16}>
        {edges.map((e, i) => (
          <path key={i} d={seg(e.a, e.b)} />
        ))}
      </g>
      {edges.map((e, i) => {
        const cycle = t / 1.8 + e.seed * 4
        if (Math.floor(cycle) % 4 !== 0) return null
        return <Dot key={i} at={lerp(e.a, e.b, frac(cycle))} r={2} />
      })}
      {NET.map((layer, l) =>
        layer.nodes.map((_, k) => {
          const [x, y] = node(l, k)
          const out = l === NET.length - 1
          return (
            <g key={`${l}-${k}`}>
              <circle cx={x} cy={y} r={4.5} fill={FILL} {...STROKE} strokeOpacity={0.6} />
              {out && <circle cx={x} cy={y} r={2.2} fill={SIGNAL} opacity={k === 0 ? outPulse : 1 - outPulse} />}
            </g>
          )
        }),
      )}
    </g>
  )
}

/* ---------- Playground ---------- */

const SCENES = [
  { name: "Stack", Scene: StackScene },
  { name: "Cluster", Scene: ClusterScene },
  { name: "Network", Scene: NetworkScene },
]

type Motion = { target: number; hovering: boolean; yaw: number }

// Owns the per-frame state so only the drawing re-renders on every frame, not the controls.
function Canvas({ scene, motionRef }: { scene: number; motionRef: React.MutableRefObject<Motion> }) {
  const reduce = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref)
  const [frame, setFrame] = useState({ t: 0, yaw: 0 })

  useAnimationFrame((time) => {
    if (reduce || !inView) return
    const t = time / 1000
    const m = motionRef.current
    // follow the cursor while hovering, otherwise sway gently
    const goal = m.hovering ? m.target : Math.sin(t * 0.35) * 0.18
    m.yaw += (goal - m.yaw) * 0.06
    setFrame({ t, yaw: m.yaw })
  })

  const { Scene } = SCENES[scene]

  return (
    <svg ref={ref} viewBox="0 0 440 500" className="h-auto w-full" aria-hidden="true">
      <motion.g
        key={scene}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "220px 250px" }}
      >
        <Scene yaw={frame.yaw} t={frame.t} />
      </motion.g>
    </svg>
  )
}

export default function SystemPlayground({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const [scene, setScene] = useState(0)
  const motionRef = useRef<Motion>({ target: 0, hovering: false, yaw: 0 })

  const switchTo = (next: number) => {
    setScene(next)
    if (!reduce) motionRef.current.yaw -= Math.PI / 2 // spin into the new scene
  }

  return (
    <div className={className}>
      <div
        role="button"
        tabIndex={0}
        aria-label={`${SCENES[scene].name} illustration. Activate to show the next one.`}
        onClick={() => switchTo((scene + 1) % SCENES.length)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            switchTo((scene + 1) % SCENES.length)
          }
        }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          motionRef.current.hovering = true
          motionRef.current.target = ((e.clientX - r.left) / r.width - 0.5) * 1.2
        }}
        onPointerLeave={() => (motionRef.current.hovering = false)}
        className="cursor-pointer select-none rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-signal/60"
      >
        <Canvas scene={scene} motionRef={motionRef} />
      </div>
    </div>
  )
}
