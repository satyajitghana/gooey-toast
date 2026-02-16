import { useEffect } from 'react'
import { Toaster } from 'sonner'
import type { GooeyToasterProps } from '../types'
import { setGooeyPosition, setGooeySpring, setGooeyBounce } from '../context'

export function GooeyToaster({
  position = 'bottom-right',
  duration,
  gap = 14,
  offset = '24px',
  theme = 'light',
  toastOptions,
  expand,
  closeButton,
  richColors,
  visibleToasts,
  dir,
  spring = true,
  bounce,
}: GooeyToasterProps) {
  useEffect(() => {
    setGooeyPosition(position)
  }, [position])

  useEffect(() => {
    setGooeySpring(spring)
  }, [spring])

  useEffect(() => {
    setGooeyBounce(bounce)
  }, [bounce])

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const el = document.createElement('div')
    el.setAttribute('data-gooey-toast-css', '')
    el.style.position = 'absolute'
    el.style.width = '0'
    el.style.height = '0'
    el.style.overflow = 'hidden'
    el.style.pointerEvents = 'none'
    document.body.appendChild(el)

    const value = getComputedStyle(el).getPropertyValue('--gooey-toast')
    document.body.removeChild(el)

    if (!value) {
      console.warn(
        '[gooey-ui] Styles not found. Make sure to import the CSS:\n\n' +
        '  import "gooey-ui/styles.css";\n'
      )
    }
  }, [])

  return (
    <Toaster
      position={position}
      duration={duration}
      gap={gap}
      offset={offset}
      theme={theme}
      toastOptions={{ unstyled: true, ...toastOptions }}
      expand={expand}
      closeButton={closeButton}
      richColors={richColors}
      visibleToasts={visibleToasts}
      dir={dir}
    />
  )
}
