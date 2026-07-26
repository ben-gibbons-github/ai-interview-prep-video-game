import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface OverlayPayload {
  title: string
  message: string
  details?: string[]
  durationMs?: number
}

export interface OverlayItem extends OverlayPayload {
  id: string
}

export interface OverlaySystemApi {
  overlays: OverlayItem[]
  postOverlay: (payload: OverlayPayload) => string
  dismissOverlay: (id: string) => void
  clearOverlays: () => void
}

export function useOverlaySystem(): OverlaySystemApi {
  const [overlays, setOverlays] = useState<OverlayItem[]>([])
  const timersRef = useRef<Map<string, number>>(new Map())

  const dismissOverlay = useCallback((id: string) => {
    setOverlays((current) => current.filter((item) => item.id !== id))

    const existingTimer = timersRef.current.get(id)
    if (existingTimer !== undefined) {
      window.clearTimeout(existingTimer)
      timersRef.current.delete(id)
    }
  }, [])

  const postOverlay = useCallback(
    (payload: OverlayPayload) => {
      const id = `overlay-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      const overlay: OverlayItem = {
        id,
        durationMs: payload.durationMs ?? 3800,
        ...payload,
      }

      setOverlays((current) => [overlay, ...current].slice(0, 8))

      if ((overlay.durationMs ?? 0) > 0) {
        const timerId = window.setTimeout(() => {
          dismissOverlay(id)
        }, overlay.durationMs)

        timersRef.current.set(id, timerId)
      }

      return id
    },
    [dismissOverlay],
  )

  const clearOverlays = useCallback(() => {
    timersRef.current.forEach((timerId) => {
      window.clearTimeout(timerId)
    })

    timersRef.current.clear()
    setOverlays([])
  }, [])

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timerId) => {
        window.clearTimeout(timerId)
      })
      timersRef.current.clear()
    }
  }, [])

  return useMemo(
    () => ({
      overlays,
      postOverlay,
      dismissOverlay,
      clearOverlays,
    }),
    [clearOverlays, dismissOverlay, overlays, postOverlay],
  )
}

export interface OverlayStackProps {
  overlays: OverlayItem[]
  onDismiss: (id: string) => void
}

export function OverlayStack({ overlays, onDismiss }: OverlayStackProps) {
  return (
    <div className="overlay-stack" aria-live="polite">
      {overlays.map((overlay) => (
        <article key={overlay.id} className="overlay-card" role="status">
          <header className="overlay-card-head">
            <h2>{overlay.title}</h2>
            <button type="button" onClick={() => onDismiss(overlay.id)} aria-label="Dismiss overlay">
              x
            </button>
          </header>
          <p>{overlay.message}</p>
          {overlay.details && overlay.details.length > 0 ? (
            <ul>
              {overlay.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}
    </div>
  )
}
