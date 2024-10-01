import { useState } from "react"

interface IProps {
  children: React.ReactNode,
  onTop?: () => void,
  onBottom?: () => void,
}

export function VerticalSwipeWrapper({children, onTop = () => {}, onBottom = () => {}}: IProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isTopSwipe = distance > minSwipeDistance
    const isBottomSwipe = distance < -minSwipeDistance
    if (isTopSwipe || isBottomSwipe) {
      isTopSwipe ? onTop() : onBottom()
    }
  }

  return (
    <div 
      onTouchStart={onTouchStart} 
      onTouchMove={onTouchMove} 
      onTouchEnd={onTouchEnd} 
    >
      {children}
    </div>
  )
}