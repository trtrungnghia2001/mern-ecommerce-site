import ProductCard from './ProductCard'
import { ProductType } from '../types/product.type'
import NotFoundResultComponent from '@/components/NotFoundResultComponent'
import ProductCardSkeleton from './ProductCardSkeleton'
import PaginateComponent from '@/components/common/paginate-component'
import { ComponentProps, FC, memo } from 'react'
import clsx from 'clsx'

interface IProductList extends ComponentProps<'div'> {
  datas: ProductType[]
  isLoading: boolean
  paginate: {
    current_page: number
    total_pages: number
    onChange: (value: number) => void
  }
}

const ProductCardList: FC<IProductList> = ({
  datas,
  isLoading,
  paginate,
  ...props
}) => {
  if (isLoading)
    return (
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7">
        {datas.map((item) => (
          <ProductCardSkeleton key={item._id} />
        ))}
      </div>
    )
  if (datas.length === 0) return <NotFoundResultComponent />
  return (
    <>
      <div
        className={clsx([
          `mb-6 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6`,
          props.className,
        ])}
        {...props}
      >
        {datas.map((item) => (
          <ProductCard key={item._id} data={item} />
        ))}
      </div>
      <PaginateComponent
        forcePage={paginate.current_page - 1}
        pageCount={paginate.total_pages}
        onPageChange={(e) => {
          paginate.onChange(e.selected + 1)
        }}
      />
    </>
  )
}

export default memo(ProductCardList)
