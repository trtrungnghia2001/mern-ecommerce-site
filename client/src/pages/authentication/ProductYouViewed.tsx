import ProductCardList from '@/features/product/components/ProductCardList'

import { useProductStore } from '@/features/product/stores/product.store'
import useSearchParamsValue from '@/hooks/useSearchParamsValue'
import { useQuery } from '@tanstack/react-query'

const ProductYouViewed = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue()
  const { getHistory, product_histories } = useProductStore()
  const getResult = useQuery({
    queryKey: ['me', 'history', searchParams.toString()],
    queryFn: async () => {
      return getHistory(searchParams.toString())
    },
  })

  return (
    <ProductCardList
      datas={product_histories}
      isLoading={getResult.isLoading}
      paginate={{
        current_page: getResult.data?.data.paginations.page || 1,
        total_pages: getResult.data?.data.paginations.total_pages || 1,
        onChange: (e) => handleSearchParams('_page', e as unknown as string),
      }}
    />
  )
}

export default ProductYouViewed
