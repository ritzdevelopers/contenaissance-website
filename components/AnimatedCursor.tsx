"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, summary, [data-cursor='interactive']"

export default function AnimatedCursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hoveringInteractive, setHoveringInteractive] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const dotPos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const pointerTarget = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number | null>(null)

  const [dotXY, setDotXY] = useState({ x: 0, y: 0 })
  const [ringXY, setRingXY] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canUseCustomCursor =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !("ontouchstart" in window)
    setEnabled(canUseCustomCursor)
    if (!canUseCustomCursor) return
    document.body.classList.add("has-animated-cursor")

    const tick = () => {
      const t = pointerTarget.current
      ringPos.current.x += (t.x - ringPos.current.x) * 0.17
      ringPos.current.y += (t.y - ringPos.current.y) * 0.17
      dotPos.current.x += (t.x - dotPos.current.x) * 0.45
      dotPos.current.y += (t.y - dotPos.current.y) * 0.45

      setRingXY({ x: ringPos.current.x, y: ringPos.current.y })
      setDotXY({ x: dotPos.current.x, y: dotPos.current.y })
      frameRef.current = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      pointerTarget.current.x = e.clientX
      pointerTarget.current.y = e.clientY

      if (!visible) {
        ringPos.current = { x: e.clientX, y: e.clientY }
        dotPos.current = { x: e.clientX, y: e.clientY }
        setVisible(true)
      }
    }

    const onLeaveViewport = () => setVisible(false)
    const onEnterViewport = () => setVisible(true)

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (!target) return
      setHoveringInteractive(Boolean(target.closest(INTERACTIVE_SELECTOR)))
    }
    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseover", onMouseOver, { passive: true })
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseleave", onLeaveViewport)
    document.addEventListener("mouseenter", onEnterViewport)

    frameRef.current = requestAnimationFrame(tick)

    return () => {
      document.body.classList.remove("has-animated-cursor")
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onMouseOver)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseleave", onLeaveViewport)
      document.removeEventListener("mouseenter", onEnterViewport)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [visible])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="custom-cursor-ring"
        animate={{
          x: ringXY.x,
          y: ringXY.y,
          scale: isClicking ? 0.78 : hoveringInteractive ? 1.65 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 340, damping: 28, mass: 0.55 }}
      />
      <motion.div
        className="custom-cursor-dot"
        animate={{
          x: dotXY.x,
          y: dotXY.y,
          scale: isClicking ? 1.55 : hoveringInteractive ? 0.65 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 520, damping: 35, mass: 0.25 }}
      />
      <motion.div
        className="custom-cursor-pulse"
        animate={{
          x: ringXY.x,
          y: ringXY.y,
          scale: isClicking ? 1.45 : hoveringInteractive ? 1.12 : 1,
          opacity: visible ? (isClicking ? 0.65 : 0.3) : 0,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 24, mass: 0.8 }}
      />
    </>
  )
}
