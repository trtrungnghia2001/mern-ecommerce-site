import ProductCardList from '@/features/product/components/ProductCardList'
import { useProductStore } from '@/features/product/stores/product.store'
import useSearchParamsValue from '@/hooks/useSearchParamsValue'
import { useQuery } from '@tanstack/react-query'

const ProductFavoritePage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue()
  const { getFavorite, product_favorites } = useProductStore()
  const getResult = useQuery({
    queryKey: ['me', 'favorite', searchParams.toString()],
    queryFn: async () => {
      return getFavorite(searchParams.toString())
    },
  })
  return (
    <ProductCardList
      datas={product_favorites}
      isLoading={getResult.isLoading}
      paginate={{
        current_page: getResult.data?.data.paginations.page || 1,
        total_pages: getResult.data?.data.paginations.total_pages || 1,
        onChange: (e) => handleSearchParams('_page', e as unknown as string),
      }}
    />
  )
}

export default ProductFavoritePage
