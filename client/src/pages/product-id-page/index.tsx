import Left from './Left'
import Right from './Right'
import { benefits, warranty_information } from '@/data/product.data'
import { displayCurrency } from '@/utils/currency.util'
import { Link, useParams } from 'react-router-dom'
import ProductSlideSimilar from '@/pages/product-id-page/ProductSlideSimilar'
import ProductSlideViewed from './ProductSlideViewed'
import { useQuery } from '@tanstack/react-query'
import {
  productGetByIdApi,
  productGetByIdSimilarApi,
  productGetByViewedApi,
} from '@/services/product.service'
import { ProductType } from '@/features/product/types/product.type'
import { useProductStore } from '@/features/product/stores/product.store'
import LoaderComponent from '@/components/common/loader-component'
import { useEffect } from 'react'
import ButtonAddToCart from '@/features/cart/components/ButtonAddToCart'
import ButtonByNow from '@/features/payment/components/ButtonByNow'
import RatingComponent from '@/components/RatingComponent'

const ProductIdPage = () => {
  const { id } = useParams()
  const { addHistory } = useProductStore()

  const productGetByIdResult = useQuery({
    queryKey: ['product', 'get', id],
    queryFn: async () => {
      return await productGetByIdApi(id as string)
    },
    enabled: !!id,
  })
  const productData = productGetByIdResult.data?.data
  const productGetByIdSimilarResult = useQuery({
    queryKey: ['product', 'get', id, 'similar'],
    queryFn: async () => await productGetByIdSimilarApi(id as string),
    enabled: !!id,
  })
  const productGetByViewedResult = useQuery({
    queryKey: ['product', 'get-viewed'],
    queryFn: async () => await productGetByViewedApi(),
    enabled: !!id,
  })

  useEffect(() => {
    if (id) {
      addHistory(id)
    }
  }, [id])

  return (
    <>
      {productGetByIdResult.isLoading && <LoaderComponent />}
      <div className="space-y-5">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <Left data={productData as ProductType} />
          <div className="flex-1 w-full overflow-hidden space-y-4">
            {/* info */}
            <div className="p-4 rounded-lg bg-boxColor space-y-2">
              <div className="flex items-center gap-3 text-13">
                <div className="w-24">
                  <img
                    src="https://salt.tikicdn.com/ts/ta/b1/3f/4e/cc3d0a2dd751a7b06dd97d868d6afa56.png"
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="w-24">
                  <img
                    src="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png"
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="pb-0.5">
                  <span>Brand: </span>
                  <Link
                    to={`/filter?_brand=` + productData?.brand}
                    className="text-link font-medium"
                  >
                    {productData?.brand}
                  </Link>
                </div>
              </div>
              <h4>{productData?.name}</h4>
              <div className="flex items-center gap-1">
                <span>{productData?.rating_average}</span>
                <RatingComponent value={productData?.rating_average || 0} />
                <span className="text-textSecondaryColor text-13">
                  ({productData?.review_count})
                </span>
                <span></span>
                <span className="border-l-2 pl-1 leading-none text-textSecondaryColor text-13">
                  Sold {productData?.quantity_sold}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-red-500">
                  {displayCurrency(productData?.price)}
                </h2>
                <span className="bg-gray-100 rounded-lg px-0.5 text-12">
                  -{productData?.discount_rate}%
                </span>
                <span className="space-x-2 text-textSecondaryColor line-through">
                  {displayCurrency(productData?.original_price)}
                </span>
              </div>
            </div>
            {/* buttons */}
            <div className="xl:hidden p-4 rounded-lg bg-boxColor space-y-2">
              <ButtonByNow product={productData as ProductType} quantity={1} />
              <ButtonAddToCart
                productId={productData?._id as string}
                quantity={1}
              />
            </div>
            {/* similar */}
            <ProductSlideSimilar
              title={'Sản phẩm tương tự'}
              datas={productGetByIdSimilarResult.data?.data.results || []}
            />
            {/* warranty_information */}
            <div className="p-4 rounded-lg bg-boxColor">
              <h5 className="mb-2">Warranty information</h5>
              <ul>
                {warranty_information.map((item) => (
                  <li
                    key={item.label}
                    className="py-2 border-b last:border-b-0"
                  >
                    <span>{item.label}: </span>
                    <span className="font-medium">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* warranty_information */}
            <div className="p-4 rounded-lg bg-boxColor">
              <h5 className="mb-2">Benefits</h5>
              <ul>
                {benefits.map((item) => (
                  <li
                    key={item.text}
                    className="py-2 flex items-center gap-2 border-b last:border-b-0"
                  >
                    <div className="w-5">
                      <img src={item.icon} alt={item.icon} loading="lazy" />
                    </div>
                    <span
                      dangerouslySetInnerHTML={{ __html: item.text }}
                    ></span>
                  </li>
                ))}
              </ul>
            </div>
            {/* description */}
            <div className="p-4 rounded-lg bg-boxColor">
              <h5 className="mb-2">Description</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: productData?.description || '',
                }}
              ></div>
            </div>
          </div>
          <Right data={productData as ProductType} />
        </div>
        {/* footer */}
        {productGetByViewedResult.data &&
          productGetByViewedResult.data?.data.results.length > 0 && (
            <ProductSlideViewed
              title={'Sản phẩm bạn đã xem'}
              datas={productGetByViewedResult.data?.data.results || []}
            />
          )}
        <div className="flex flex-col md:flex-row items-stretch gap-2">
          <div className="flex-1 overflow-hidden rounded-lg">
            <img
              src="https://salt.tikicdn.com/ts/tka/c2/8f/37/c13e7db9a3cdab9e4bd786bee03e3b84.png"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="flex-1 overflow-hidden rounded-lg">
            <img
              src="https://salt.tikicdn.com/ts/tka/a9/ec/4f/e95b916999b2dd40b3a8e2af30e704e8.png"
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductIdPage
