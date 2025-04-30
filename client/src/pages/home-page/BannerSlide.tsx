import { memo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'

const imgs = [
  `https://salt.tikicdn.com/cache/w750/ts/tikimsp/b7/43/77/e015268c20301aa968fd649f9edd11a6.png.webp`,
  `https://salt.tikicdn.com/cache/w750/ts/tikimsp/0c/f3/05/45419762645305f99d50edd528adefd3.jpg.webp`,
  `https://salt.tikicdn.com/cache/w750/ts/tikimsp/99/b7/fd/9e3cff6a40e37fab1ee89f047f50acee.jpg.webp`,
  `https://salt.tikicdn.com/cache/w750/ts/tikimsp/76/0c/fb/970cd0a41ea3f714e5f3adb746520f0c.jpg.webp`,
  `https://salt.tikicdn.com/cache/w750/ts/tikimsp/ff/c7/13/ccfc0b46d994d7947e680e494b58b9e6.jpg.webp`,
  `https://salt.tikicdn.com/cache/w750/ts/tikimsp/51/66/59/816ebdfaaeb3407d802c489f059bc717.jpg.webp`,
  `https://salt.tikicdn.com/cache/w750/ts/tikimsp/77/7d/51/f7ba3eaacbcd9654cd67717692ec8a94.png.webp`,
  `https://salt.tikicdn.com/cache/w750/ts/tikimsp/35/8b/b2/dc0f03c06f815b3422d491dbb34824a7.jpg.webp`,
]

const BannerSlide = () => {
  return (
    <div className="overflow-x-hidden w-full p-4 rounded-lg bg-white">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={12}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
      >
        {imgs?.map((item, index) => {
          return (
            <SwiperSlide key={index} className="h-full">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img src={item} alt={item} loading="lazy" />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default memo(BannerSlide)
