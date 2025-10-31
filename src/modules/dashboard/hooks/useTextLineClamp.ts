import { type RefObject, useEffect, useState } from 'react'

interface UseTextLineClampParams {
  readonly containerRef: RefObject<HTMLDivElement | null>
  readonly textRef: RefObject<HTMLParagraphElement | null>
  readonly titleRef: RefObject<HTMLHeadingElement | null>
}

interface UseTextLineClampResult {
  readonly lineClamp: number
  readonly maxHeight: string
}

export const useTextLineClamp = ({
  containerRef,
  textRef,
  titleRef,
}: UseTextLineClampParams): UseTextLineClampResult => {
  const [lineClamp, setLineClamp] = useState<number>(999)
  const [maxHeight, setMaxHeight] = useState<string>('none')

  useEffect(() => {
    const updateLineClamp = (): void => {
      const container = containerRef.current
      const text = textRef.current
      const title = titleRef.current
      
      if (!container || !text || !title) {
        return
      }

      const containerHeight = container.clientHeight
      const containerStyles = getComputedStyle(container)
      const paddingTop = parseFloat(containerStyles.paddingTop)
      const paddingBottom = parseFloat(containerStyles.paddingBottom)
      const padding = paddingTop + paddingBottom
      const titleHeight = title.offsetHeight
      const titleMarginBottom = parseFloat(getComputedStyle(title).marginBottom)
      const availableHeight = containerHeight - padding - titleHeight - titleMarginBottom
      const lineHeight = parseFloat(getComputedStyle(text).lineHeight)
      const maxLines = Math.floor(availableHeight / lineHeight)
      const lines = maxLines > 0 ? maxLines : 1
      setLineClamp(lines)
      setMaxHeight(`${lines * lineHeight}px`)
    }

    updateLineClamp()
    window.addEventListener('resize', updateLineClamp)

    const resizeObserver = new ResizeObserver(updateLineClamp)
    const container = containerRef.current
    if (container) {
      resizeObserver.observe(container)
    }

    return () => {
      window.removeEventListener('resize', updateLineClamp)
      resizeObserver.disconnect()
    }
  }, [containerRef, textRef, titleRef])

  return { lineClamp, maxHeight }
}

