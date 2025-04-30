import clsx from 'clsx'
import { memo, useCallback, useEffect, useState } from 'react'
import { FaAngleUp } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

const ButtonToTop = () => {
  // auto scroll back to top when page is loaded
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const [show, setShow] = useState(false)
  const handleToTop = useCallback(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setShow(true)
      } else {
        setShow(false)
      }
    })
  }, [])
  return (
    <button
      title="Go to top"
      className={clsx(
        'z-10 fixed bottom-16 md:bottom-4 right-4 p-2 rounded bg-black hover:bg-black/70 text-white',
        show ? 'block' : 'hidden',
      )}
      onClick={handleToTop}
    >
      <FaAngleUp />
    </button>
  )
}

export default memo(ButtonToTop)
