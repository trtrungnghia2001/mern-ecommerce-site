import { NavLink } from 'react-router-dom'
import ProductSlide from '@/pages/home-page/ProductSlide'
import ProductCard from '@/features/product/components/ProductCard'
import WrapperComponent from '@/components/layouts/WrapperComponent'
import BannerSlide from './BannerSlide'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import {
  productGetApi,
  productGetByFlashSaleApi,
  productGetByInterestedApi,
} from '@/services/product.service'
import { getCategoryApi } from '@/services/common.service'

const HomePage = () => {
  const getTopDealResult = useQuery({
    queryKey: ['product', 'get', 'top-deal'],
    queryFn: async () => productGetApi(`_sort=discount_rate`),
  })
  const getProductFlashSaleResult = useQuery({
    queryKey: ['product', 'get', `flash-sale`],
    queryFn: async () => productGetByFlashSaleApi(),
  })
  const getProductInterestedResult = useQuery({
    queryKey: ['product', 'get', `interested`],
    queryFn: async () => productGetByInterestedApi(),
  })
  const getSuggestionTodayResult = useInfiniteQuery({
    queryKey: ['product', 'get', 'suggestion-today'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      return await productGetApi(`_page=${pageParam}&_limit=24`)
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (
        lastPage?.data?.results?.length < lastPage?.data?.paginations?.limit ||
        lastPage?.data?.paginations?.page >=
          lastPage?.data?.paginations?.total_pages
      ) {
        return null
      }
      return lastPageParam + 1
    },
  })
  const getCategoryResult = useQuery({
    queryKey: ['category', 'get'],
    queryFn: async () => {
      return await getCategoryApi()
    },
  })

  const utilities = [
    {
      thumbnail: `https://salt.tikicdn.com/cache/100x100/ts/upload/1e/27/a7/e2c0e40b6dc45a3b5b0a8e59e2536f23.png.webp`,
      name: 'Ưu đãi thẻ, ví',
    },
    {
      thumbnail: `https://salt.tikicdn.com/cache/100x100/ts/upload/4d/a3/cb/c86b6e4f17138195c026437458029d67.png.webp`,
      name: 'Đóng tiền, nạp thẻ',
    },
    {
      thumbnail: `https://salt.tikicdn.com/cache/100x100/ts/tmp/6f/4e/41/93f72f323d5b42207ab851dfa39d44fb.png.webp`,
      name: 'Mua trước trả sau',
    },
    {
      thumbnail: `https://salt.tikicdn.com/cache/100x100/ts/category/0a/c9/7b/8e466bdf6d4a5f5e14665ce56e58631d.png.webp`,
      name: 'Voucher - Dịch vụ',
    },
    {
      thumbnail: `https://salt.tikicdn.com/cache/100x100/ts/category/3c/e4/99/eeee1801c838468d94af9997ec2bbe42.png.webp`,
      name: 'Hàng quốc tế',
    },
    {
      thumbnail: `https://salt.tikicdn.com/cache/100x100/ts/category/1e/8c/08/d8b02f8a0d958c74539316e8cd437cbd.png.webp`,
      name: 'Ngon',
    },
  ]

  return (
    <WrapperComponent className="flex gap-5 items-start ">
      {/* category */}
      <div className="hidden lg:block max-w-xs w-full space-y-5 max-h-svh overflow-y-scroll scrollbar-none pb-4">
        <div className="rounded-lg bg-boxColor p-2">
          <h5 className="mb-2 px-3">Danh mục</h5>
          <ul>
            {getCategoryResult.data?.data?.map((item) => (
              <li key={item}>
                <NavLink
                  to={`/filter?_category=` + item}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-200`}
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-boxColor p-2">
          <h5 className="mb-2 px-3">Tiện ích</h5>
          <ul>
            {utilities.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={`/`}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-200`}
                >
                  <div className="w-8 aspect-square">
                    <img src={item.thumbnail} alt="" loading="lazy" />
                  </div>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* main */}
      <div className="flex-1 overflow-hidden">
        <div className="space-y-6">
          <BannerSlide />
          <ProductSlide
            title={`Top deal`}
            datas={getTopDealResult.data?.data.results || []}
            isLoading={getTopDealResult.isLoading}
          />
          <ProductSlide
            title={`Flash Sale`}
            datas={getProductFlashSaleResult.data?.data.results || []}
            isLoading={getProductFlashSaleResult.isLoading}
            isCountdown
          />
          <ProductSlide
            title={`Sản phẩm bạn quan tâm`}
            datas={getProductInterestedResult.data?.data.results || []}
            isLoading={getProductInterestedResult.isLoading}
          />

          <div className="space-y-3">
            <div className="bg-boxColor p-4 rounded-lg space-y-4">
              <h5>Gợi ý hôm nay</h5>
            </div>
            <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
              {getSuggestionTodayResult.data?.pages
                ?.flatMap((item) => item.data.results)
                ?.map((item) => (
                  <ProductCard key={item._id} data={item} />
                ))}
            </div>
            {getSuggestionTodayResult.hasNextPage && (
              <div className="mx-auto flex justify-center">
                <button
                  onClick={() => getSuggestionTodayResult.fetchNextPage()}
                  className="border-blue-500 border text-blue-500 rounded-lg py-2 px-3 w-60 text-base font-medium hover:bg-blue-100 transition-all"
                >
                  See more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </WrapperComponent>
  )
}

export default HomePage
