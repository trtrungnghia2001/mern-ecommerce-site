import { ProductType } from '@/features/product/types/product.type'
import clsx from 'clsx'
import { memo, useState } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const Left = ({ data }: { data: ProductType }) => {
  const [indexImage, setIndexImage] = useState(0)
  return (
    <div className="bg-boxColor p-4 rounded-lg md:max-w-[320px] lg:max-w-[400px] w-full space-y-2">
      <div className="rounded-lg overflow-hidden aspect-square border">
        <img
          src={data?.images[indexImage]}
          alt={data?.images[indexImage]}
          loading="lazy"
        />
      </div>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={8}
        slidesPerView={6}
        slidesPerGroup={6}
      >
        {data?.images?.map((item, index) => {
          return (
            <SwiperSlide key={index} className="h-full">
              <div
                onMouseOver={() => {
                  setIndexImage(index)
                }}
                className={clsx([
                  `p-0.5 aspect-square rounded-lg overflow-hidden border-2`,
                  index === indexImage && `border-blue-500`,
                ])}
              >
                <img src={item} alt={item} loading="lazy" />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <div>
        <h5 className="mb-2">Đặc điểm nổi bật</h5>
        <ul className="space-y-2">
          {data?.highlight?.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <div className="w-4 mt-1">
                <img
                  src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                  alt="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">{item}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default memo(Left)
