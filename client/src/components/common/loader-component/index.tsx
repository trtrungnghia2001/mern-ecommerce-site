import React, { memo } from 'react'
import style from './style.module.css'

const LoaderComponent = () => {
  return (
    <div className="z-[9999] fixed inset-0 bg-black/50 flex items-center justify-center">
      <span className={style.loader}></span>
    </div>
  )
}

export default memo(LoaderComponent)
