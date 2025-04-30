import React, { memo, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import ProductCard from '../../features/product/components/ProductCard'
import { ProductType } from '../../features/product/types/product.type'
import { Link } from 'react-router-dom'
import { Grid, Navigation } from 'swiper/modules'

type Type = {
  datas: ProductType[]
  title: React.ReactNode
  path?: string
}

const ProductSlideSimilar = ({ title, datas, path }: Type) => {
  const breakpoints = useMemo(() => {
    const initBreakpoints = {
      640: {
        slidesPerView: 3,
        slidesPerGroup: 3,
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
          modules={[Navigation, Grid]}
          grid={{
            rows: 2,
            fill: 'row',
          }}
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

export default memo(ProductSlideSimilar)
