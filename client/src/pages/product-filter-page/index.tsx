import ProductCardList from '@/features/product/components/ProductCardList'
import useSearchParamsValue from '@/hooks/useSearchParamsValue'
import { productGetFilterApi } from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'
import SidebarLeft from './SidebarLeft'
import ButtonFilterr from './ButtonFilterr'

const sort_options = [
  {
    label: `Popular`,
    value: 'popular',
  },
  {
    label: `Best Seller`,
    value: 'best-seller',
  },
  {
    label: `New Item`,
    value: 'new-item',
  },
  {
    label: `Price low to high`,
    value: 'low-to-high',
  },
  {
    label: `Price high to low`,
    value: 'high-to-low',
  },
]

const ProductFilterPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue()
  const getFilterResult = useQuery({
    queryKey: ['filter', searchParams.toString()],
    queryFn: async () => {
      return await productGetFilterApi(searchParams.toString())
    },
  })

  return (
    <div className="flex items-start gap-6">
      {/* sidebar */}
      <div className="hidden lg:block overflow-hidden max-w-xs w-full rounded-lg bg-boxColor p-3 space-y-4 text-13">
        <SidebarLeft
          handleSearchParams={handleSearchParams}
          searchParams={searchParams}
        />
      </div>
      {/* main content */}
      <div className="flex-1">
        {/* sort */}
        <div className="mb-2 outline-none flex gap-4 items-center justify-end py-2 px-4 rounded-lg bg-boxColor">
          <select
            value={searchParams.get(`_sort`) || 'popular'}
            onChange={(e) => handleSearchParams(`_sort`, e.target.value)}
            className="border rounded px-2 py-1 text-xs"
          >
            {sort_options.map((item) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              )
            })}
          </select>
          <ButtonFilterr
            searchParams={searchParams}
            handleSearchParams={handleSearchParams}
          />
        </div>
        <ProductCardList
          isLoading={getFilterResult.isLoading}
          datas={getFilterResult.data?.data.results || []}
          paginate={{
            current_page: getFilterResult.data?.data.paginations.page || 1,
            total_pages:
              getFilterResult.data?.data.paginations.total_pages || 1,
            onChange: (e) =>
              handleSearchParams(`_page`, e as unknown as string),
          }}
        />
      </div>
    </div>
  )
}

export default ProductFilterPage
