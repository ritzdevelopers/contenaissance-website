"use client"

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"
import gsap from "gsap"

const VIEW_W = 1200
const VIEW_H = 300
const FONT_SIZE = 140
const LABEL = "Contenaissance"
const START_PCT = 1

/** Multi-frequency surface + slow swell — reads like paani climbing inside the type. */
function waterSurfaceY(x: number, fillTop: number, phase: number): number {
    const u = x / VIEW_W
    const w0 = 6 * Math.sin(u * Math.PI * 2 * 0.75 + phase * 0.32)
    const w1 = 16.5 * Math.sin(u * Math.PI * 2 * 1.55 + phase * 0.88)
    const w2 = 7 * Math.sin(u * Math.PI * 2 * 3.85 - phase * 1.22)
    const w3 = 3.2 * Math.sin(u * Math.PI * 2 * 7.2 + phase * 0.52)
    return fillTop + w0 + w1 + w2 + w3
}

type WavePt = { x: number; y: number }

/** Smooth cubic curve through samples (Catmull–Rom → Bézier) — no jagged “polygon” water line. */
function buildSmoothWaterPath(progress: number, phase: number): string {
    const fillTop = VIEW_H * (1 - progress / 100)
    const step = 2
    const pts: WavePt[] = []
    for (let x = 0; x <= VIEW_W; x += step) {
        pts.push({ x, y: waterSurfaceY(x, fillTop, phase) })
    }
    const last = pts[pts.length - 1]
    if (last.x < VIEW_W - 0.01) {
        pts.push({ x: VIEW_W, y: waterSurfaceY(VIEW_W, fillTop, phase) })
    }

    const n = pts.length
    if (n < 2) {
        const y = waterSurfaceY(0, fillTop, phase)
        return `M 0 ${VIEW_H} L 0 ${y} L ${VIEW_W} ${y} L ${VIEW_W} ${VIEW_H} Z`
    }

    let d = `M 0 ${VIEW_H} L 0 ${pts[0].y}`

    for (let i = 0; i < n - 1; i++) {
        const p0 = pts[i === 0 ? 0 : i - 1]
        const p1 = pts[i]
        const p2 = pts[i + 1]
        const p3 = pts[i + 2 < n ? i + 2 : n - 1]

        const cp1x = p1.x + (p2.x - p0.x) / 6
        const cp1y = p1.y + (p2.y - p0.y) / 6
        const cp2x = p2.x - (p3.x - p1.x) / 6
        const cp2y = p2.y - (p3.y - p1.y) / 6

        d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`
    }

    d += ` L ${VIEW_W} ${VIEW_H} Z`
    return d
}

const FONT =
    "var(--font-geist-sans), Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"

type LoaderProps = {
    pageLoaded?: boolean
    /** Fires when exit animation begins — use to fade in page content under the loader. */
    onExitStart?: () => void
    onComplete?: () => void
}

function formatLoadingPct(smooth: number): number {
    if (smooth >= 99.55) return 100
    return Math.max(START_PCT, Math.round(smooth))
}

export default function Loader({
    pageLoaded = false,
    onExitStart,
    onComplete,
}: LoaderProps) {
    const loaderRef = useRef<HTMLDivElement | null>(null)
    const backdropRef = useRef<HTMLDivElement | null>(null)
    const zoomRef = useRef<HTMLDivElement | null>(null)
    const rafRef = useRef(0)
    const pageLoadedRef = useRef(pageLoaded)
    const onCompleteRef = useRef(onComplete)
    const onExitStartRef = useRef(onExitStart)
    const exitingRef = useRef(false)

    const clipId = useId().replace(/:/g, "")
    const goldGradId = `gold-${clipId}`

    const [progress, setProgress] = useState(START_PCT)
    const [phase, setPhase] = useState(0)

    useEffect(() => {
        pageLoadedRef.current = pageLoaded
    }, [pageLoaded])

    useEffect(() => {
        onCompleteRef.current = onComplete
    }, [onComplete])

    useEffect(() => {
        onExitStartRef.current = onExitStart
    }, [onExitStart])

    const wavePath = useMemo(() => buildSmoothWaterPath(progress, phase), [progress, phase])

    const finishLoader = useCallback(() => {
        onExitStartRef.current?.()

        const wrap = loaderRef.current
        const backdrop = backdropRef.current
        const zoom = zoomRef.current
        const done = () => {
            if (wrap) {
                wrap.style.display = "none"
            }
            onCompleteRef.current?.()
        }

        if (!wrap || !backdrop || !zoom) {
            done()
            return
        }

        gsap.killTweensOf([backdrop, zoom])
        gsap.set(zoom, { transformOrigin: "50% 42%" })

        const tl = gsap.timeline({
            onComplete: done,
        })

        tl.to(
            zoom,
            {
                scale: 13,
                opacity: 0,
                duration: 1.38,
                ease: "power2.inOut",
            },
            0
        )

        tl.to(
            backdrop,
            {
                opacity: 0,
                duration: 1.12,
                ease: "power2.inOut",
            },
            0
        )
    }, [])

    useEffect(() => {
        let mounted = true
        let last = performance.now()
        let target = START_PCT
        let smooth = START_PCT

        const PRELOAD_CAP = 91
        const RATE_PRELOAD_PCT_PER_SEC = 6.2
        const RATE_FINISH_PCT_PER_SEC = 14

        const loop = (now: number) => {
            if (!mounted || exitingRef.current) return

            const dt = Math.min((now - last) / 1000, 0.048)
            last = now

            const loaded = pageLoadedRef.current

            if (loaded) {
                if (target < 100) {
                    target = Math.min(100, target + RATE_FINISH_PCT_PER_SEC * dt)
                }
            } else if (target < PRELOAD_CAP) {
                target = Math.min(
                    PRELOAD_CAP,
                    target + RATE_PRELOAD_PCT_PER_SEC * dt
                )
            }

            const alpha = 1 - Math.exp(-5.8 * dt)
            smooth += (target - smooth) * alpha

            setPhase((ph) => ph + 0.0036 * (dt * 60))

            setProgress(smooth)

            const doneFill =
                loaded && target >= 99.998 && smooth >= 99.45
            if (doneFill && !exitingRef.current) {
                exitingRef.current = true
                setProgress(100)
                cancelAnimationFrame(rafRef.current)
                finishLoader()
                return
            }

            rafRef.current = requestAnimationFrame(loop)
        }

        rafRef.current = requestAnimationFrame(loop)

        return () => {
            mounted = false
            cancelAnimationFrame(rafRef.current)
        }
    }, [finishLoader])

    const pctLabel = formatLoadingPct(progress)

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden px-4"
            aria-hidden
        >
            <div
                ref={backdropRef}
                className="absolute inset-0 bg-black"
                aria-hidden
            />

            <div
                ref={zoomRef}
                className="relative z-[1] flex w-full max-w-5xl flex-col items-center will-change-transform"
            >
                <svg
                    viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                    className="h-auto w-full"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden
                >
                    <defs>
                        <linearGradient
                            id={goldGradId}
                            x1="0%"
                            y1="100%"
                            x2="0%"
                            y2="0%"
                        >
                            <stop offset="0%" stopColor="#92400e" />
                            <stop offset="35%" stopColor="#ca8a04" />
                            <stop offset="65%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#fde68a" />
                        </linearGradient>
                        <clipPath id={clipId}>
                            <text
                                x="50%"
                                y="55%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontWeight="800"
                                fontSize={FONT_SIZE}
                                style={{ fontFamily: FONT }}
                            >
                                {LABEL}
                            </text>
                        </clipPath>
                    </defs>

                    <text
                        x="50%"
                        y="55%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontWeight="800"
                        fontSize={FONT_SIZE}
                        fill="rgba(251, 191, 36, 0.22)"
                        style={{ fontFamily: FONT }}
                    >
                        {LABEL}
                    </text>

                    <g clipPath={`url(#${clipId})`}>
                        <path fill={`url(#${goldGradId})`} d={wavePath} />
                    </g>
                </svg>

                <p className="mt-4 w-full text-right text-xs font-medium tracking-wide text-amber-200/90 sm:text-sm">
                    loading... {pctLabel}%
                </p>
            </div>
        </div>
    )
}
