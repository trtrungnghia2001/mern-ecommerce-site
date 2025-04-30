import React, { memo, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import ProductCard from '../../features/product/components/ProductCard'
import { ProductType } from '../../features/product/types/product.type'
import { Link } from 'react-router-dom'
import { Navigation } from 'swiper/modules'

type Type = {
  datas: ProductType[]
  title: React.ReactNode
  path?: string
}

const ProductSlideViewed = ({ title, datas, path }: Type) => {
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
      1536: {
        slidesPerView: 7,
        slidesPerGroup: 7,
      },
      1920: {
        slidesPerView: 8,
        slidesPerGroup: 8,
      },
    }
    return initBreakpoints
  }, [])

  return (
    <div className="bg-boxColor p-4 rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <h5>{title}</h5>
        {path && (
          <Link to={path} className="text-blue-500 font-medium">
            Xem tất cả
          </Link>
        )}
      </div>
      {datas.length > 0 && (
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

export default memo(ProductSlideViewed)
