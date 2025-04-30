import React, { memo, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import ProductCard from '../../features/product/components/ProductCard'
import { ProductType } from '../../features/product/types/product.type'
import { Link } from 'react-router-dom'
import { Navigation } from 'swiper/modules'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import ProductCardSkeleton from '@/features/product/components/ProductCardSkeleton'

type Type = {
  datas: ProductType[]
  title: React.ReactNode
  path?: string
  isLoading?: boolean
  isCountdown?: boolean
}

const ProductSlide = ({ title, datas, path, isLoading, isCountdown }: Type) => {
  const breakpoints = useMemo(() => {
    const initBreakpoints = {
      640: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      768: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      1024: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      1280: {
        slidesPerView: 6,
        slidesPerGroup: 6,
      },
    }
    return initBreakpoints
  }, [])

  const renderer = ({ hours, minutes, seconds }: CountdownRenderProps) => (
    <div className="flex items-center gap-1">
      <span className="w-7 h-7 flex items-center justify-center font-medium text-center rounded-lg bg-black text-white">
        {hours.toString().padStart(2, '0')}
      </span>
      <span className="text-base font-medium">:</span>
      <span className="w-7 h-7 flex items-center justify-center font-medium text-center rounded-lg bg-black text-white">
        {minutes.toString().padStart(2, '0')}
      </span>
      <span className="text-base font-medium">:</span>
      <span className="w-7 h-7 flex items-center justify-center font-medium text-center rounded-lg bg-black text-white">
        {seconds.toString().padStart(2, '0')}
      </span>
    </div>
  )

  return (
    <div className="bg-boxColor p-4 rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h5>{title}</h5>
          {isCountdown && (
            <Countdown
              zeroPadTime={2}
              date={Date.now() + 1000 * (60 * 60 * 6 + 180)}
              renderer={renderer}
            />
          )}
        </div>
        {path && (
          <Link to={path} className="text-blue-500 font-medium">
            Xem tất cả
          </Link>
        )}
      </div>
      {isLoading && (
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={8}
          slidesPerView={2}
          slidesPerGroup={2}
          breakpoints={breakpoints}
        >
          {Array.from({
            length: 12,
          })?.map((item, index) => {
            return (
              <SwiperSlide key={index} className="h-full">
                <ProductCardSkeleton />
              </SwiperSlide>
            )
          })}
        </Swiper>
      )}
      {!isLoading && datas.length > 0 && (
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={8}
          slidesPerView={2}
          slidesPerGroup={2}
          breakpoints={breakpoints}
        >
          {datas?.map((item, index) => {
            return (
              <SwiperSlide key={index} className="h-full">
                <ProductCard data={item} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      )}
    </div>
  )
}

export default memo(ProductSlide)
