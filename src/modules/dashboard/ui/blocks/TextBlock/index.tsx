import { useRef } from 'react'
import { useTextLineClamp } from '@/modules/dashboard/hooks'
import './index.css'

interface TextBlockProps {
  readonly title?: string
  readonly text?: string
}

export const TextBlock = ({ title = 'Title', text = '' }: TextBlockProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const { lineClamp, maxHeight } = useTextLineClamp({
    containerRef,
    textRef,
    titleRef,
  })

  return (
    <div ref={containerRef} className="text-block">
      <h3 ref={titleRef} className="text-block__title">
        {title}
      </h3>
      <p 
        ref={textRef} 
        className="text-block__content" 
        style={{ 
          WebkitLineClamp: lineClamp,
          maxHeight 
        } as React.CSSProperties}
      >
        {text}
      </p>
    </div>
  )
}

