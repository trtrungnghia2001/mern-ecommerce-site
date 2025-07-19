import React, { memo } from 'react'
import WrapperComponent from './WrapperComponent'
import HeaderComponent from './HeaderComponent'
import NavBottomComponent from './NavBottomComponent'
import FooterComponent from './FooterComponent'
import ButtonToTop from '../ButtonToTop'

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <HeaderComponent />
      <NavBottomComponent />
      <div className="min-h-[90vh] p-4">
        <WrapperComponent>{children}</WrapperComponent>
      </div>
      <FooterComponent />
      <ButtonToTop />
    </div>
  )
}

export default memo(PublicLayout)
