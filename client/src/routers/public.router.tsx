import HomePage from '@/pages/home-page'
import ProductIdPage from '@/pages/product-id-page'
import SearchPage from '@/pages/search-page'
import { memo } from 'react'
import { useRoutes } from 'react-router-dom'
import AuthLayout from '@/features/authentication/layouts/AuthLayout'
import UpdateProfileForm from '@/features/authentication/components/UpdateProfileForm'
import ChangePasswordForm from '@/features/authentication/components/ChangePasswordForm'
import OrderManagementPage from '@/pages/authentication/OrderManagementPage'
import ReturnManagementPage from '@/pages/authentication/ReturnManagementPage'
import ProductReviewPage from '@/pages/authentication/ProductReviewPage'
import ProductFavoritePage from '@/pages/authentication/ProductFavoritePage'
import ProductYouViewed from '@/pages/authentication/ProductYouViewed'
import MyCommentPage from '@/pages/authentication/MyCommentPage'
import ProductFilterPage from '@/pages/product-filter-page'
import CartPage from '@/pages/authentication/CartPage'
import AccountPage from '@/pages/authentication/AccountPage'
import AuthProtectedRouter from '@/features/authentication/contexts/AuthProtectedRouter'
import PaymentPage from '@/pages/authentication/PaymentPage'
import AddressBookPage from '@/pages/authentication/AddressBookPage'
import AddressCreateUpdateForm from '@/features/address/components/AddressCreateUpdateForm'
import ShippingPage from '@/pages/authentication/ShippingPage'
import OrderByIdPage from '@/pages/authentication/OrderByIdPage'
import NotificationPage from '@/pages/authentication/NotificationPage'
import SigninSignupPage from '@/pages/signin-signup-page'

const PublicRouter = () => {
  const router = useRoutes([
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: `signin`,
      element: <SigninSignupPage />,
    },
    {
      path: `signup`,
      element: <SigninSignupPage />,
    },
    {
      path: `search`,
      element: <SearchPage />,
    },
    {
      path: `filter`,
      element: <ProductFilterPage />,
    },
    {
      path: `product/:id`,
      element: <ProductIdPage />,
    },
    {
      path: `cart`,
      element: (
        <AuthProtectedRouter>
          <CartPage />
        </AuthProtectedRouter>
      ),
    },
    {
      path: `payment`,
      element: (
        <AuthProtectedRouter>
          <PaymentPage />
        </AuthProtectedRouter>
      ),
    },
    {
      path: `shipping`,
      element: (
        <AuthProtectedRouter>
          <ShippingPage />
        </AuthProtectedRouter>
      ),
    },
    {
      path: `me`,
      element: (
        <AuthProtectedRouter>
          <AuthLayout />
        </AuthProtectedRouter>
      ),
      children: [
        {
          path: `account`,
          element: <AccountPage />,
        },
        {
          path: `address-book`,
          element: <AddressBookPage />,
        },
        {
          path: `address-book/create`,
          element: <AddressCreateUpdateForm />,
        },
        {
          path: `address-book/update/:id`,
          element: <AddressCreateUpdateForm />,
        },
        {
          path: `update-profile`,
          element: <UpdateProfileForm />,
        },
        {
          path: `change-password`,
          element: <ChangePasswordForm />,
        },
        {
          path: `order-management`,
          element: <OrderManagementPage />,
        },
        {
          path: `order/:id`,
          element: <OrderByIdPage />,
        },
        {
          path: `return-management`,
          element: <ReturnManagementPage />,
        },
        {
          path: `product-review`,
          element: <ProductReviewPage />,
        },
        {
          path: `product-you-viewed`,
          element: <ProductYouViewed />,
        },
        {
          path: `product-favorite`,
          element: <ProductFavoritePage />,
        },
        {
          path: `my-comment`,
          element: <MyCommentPage />,
        },
        {
          path: `notifications`,
          element: <NotificationPage />,
        },
      ],
    },
  ])

  return router
}

export default memo(PublicRouter)
