import { footer_links } from '@/constants/link.constant'
import React from 'react'
import WrapperComponent from './WrapperComponent'

const FooterComponent = () => {
  return (
    <div className="mt-10 bg-boxColor py-8 px-3 mb-10 md:mb-0">
      <WrapperComponent className="space-y-4">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6">
          {Object.entries(footer_links).map(([key, value], idx) => {
            return (
              <div key={idx}>
                <h5 className="capitalize mb-2">{key}</h5>
                {value.map((item, index) => (
                  <div className="text-13" key={index}>
                    {item}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
        <hr />
        <div>
          <h6 className="mb-2">Shop Company Limited</h6>
          <p>
            Building No. 52 Ut Tich Street, Ward 4, Tan Binh District, Ho Chi
            Minh City
          </p>
          <p>
            Business registration certificate No. 0309532909 was first issued by
            the Department of Planning and Investment of Ho Chi Minh City on
            January 6, 2010.
          </p>
          <p>Phone: (84) 8 3895 1011</p>
        </div>
      </WrapperComponent>
    </div>
  )
}

export default FooterComponent
