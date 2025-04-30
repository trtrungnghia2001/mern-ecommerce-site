import axios from 'axios'
import slug from 'slug'

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const countriesNameOrigin = [
  'United States',
  'Canada',
  'Đức',
  'Hàn Quốc',
  'Nhật Bản',
  'Trung Quốc',
  'Việt Nam',
]

const categories = [
  {
    label: `Nhà cửa & Đời sống`,
    value: `1883`,
  },
  {
    label: `Điện Thoại - Máy Tính Bảng`,
    value: `1789`,
  },
  {
    label: `Đồ Chơi - Mẹ & Bé`,
    value: `2549`,
  },
  {
    label: `Thiết Bị Số - Phụ Kiện Số`,
    value: `1815`,
  },
  {
    label: `Điện Gia Dụng`,
    value: `1882`,
  },
  {
    label: `Làm Đẹp - Sức Khỏe`,
    value: `1520`,
  },
  {
    label: `Ô Tô - Xe Máy - Xe Đạp`,
    value: `8594`,
  },
  {
    label: `Bách Hóa Online`,
    value: `4384`,
  },
  {
    label: `Thể Thao - Dã Ngoại`,
    value: `1975`,
  },
  {
    label: `Thời trang nữ`,
    value: `931`,
  },
  {
    label: `Thời trang nam`,
    value: `915`,
  },
  {
    label: `Laptop - Máy Vi Tính - Linh kiện`,
    value: `1846`,
  },
  {
    label: `Điện Tử - Điện Lạnh - TV`,
    value: `4221`,
  },
  {
    label: `Máy Ảnh - Máy Quay Phim`,
    value: `1801`,
  },
  {
    label: `Phụ kiện thời trang`,
    value: `27498`,
  },
  {
    label: `Đồng hồ và Trang sức`,
    value: `8371`,
  },
]

export async function getProductById(id) {
  const url = `https://tiki.vn/api/v2/products/${id}`
  const resp = (await axios.get(url)).data

  return resp
}
export async function getProductByCategory(id) {
  const url = `https://tiki.vn/api/personalish/v1/blocks/listings?category=${id}&page=1`
  const resp = (await axios.get(url)).data
  return resp.data
}
export async function customProduct() {
  const products = []

  for (let index = 0; index < categories.length; index++) {
    const category = categories[index]
    const fetchProducts = await getProductByCategory(category.value)

    for (let i = 0; i < fetchProducts.length; i++) {
      const product = fetchProducts[i]

      const item = await getProductById(product.id)

      if (!item.name || item.name === '') {
        continue
      }

      const productDetail = {
        name: item.name,
        slug: slug(item.name || ''),
        thumbnail: item.thumbnail_url,
        images: item.images?.map((item) => item.base_url) || [],
        original_price: item.original_price,
        price: item.price,
        discount: item.discount,
        discount_rate: item.discount_rate,
        review_count: item.review_count,
        rating_average: item.rating_average,
        description: item.description,
        brand: item.brand?.name,
        categories: category.label,
        highlight: item.highlight?.items,

        quantity_sold: item.quantity_sold?.value || 0,

        status: true,

        origin:
          countriesNameOrigin[randomNumber(0, countriesNameOrigin.length - 1)],
      }
      products.push(productDetail)
    }
  }

  return products
}
