import ProductList from '@/features/product/components/ProductCardList'
import useSearchParamsValue from '@/hooks/useSearchParamsValue'
import { productGetApi } from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'

const SearchPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue()
  const searchResult = useQuery({
    queryKey: ['search', searchParams.toString()],
    queryFn: async () => await productGetApi(searchParams.toString()),
  })
  return (
    <div>
      <ProductList
        isLoading={searchResult.isLoading}
        datas={searchResult.data?.data.results || []}
        paginate={{
          current_page: searchResult.data?.data.paginations.page || 1,
          total_pages: searchResult.data?.data.paginations.total_pages || 1,
          onChange: (e) => handleSearchParams(`_page`, e as unknown as string),
        }}
      />
    </div>
  )
}

export default SearchPage
