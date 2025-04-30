import {
  MdAccountCircle,
  MdLocationOn,
  MdOutlinePassword,
} from 'react-icons/md'
import { IoMdEye, IoMdHeart } from 'react-icons/io'
import { IoBook } from 'react-icons/io5'
import { FaBell } from 'react-icons/fa'

export const auth_links = [
  {
    title: 'Update Profile',
    path: '/update-profile',
    icon: <MdAccountCircle />,
  },
  {
    title: 'Change Password',
    path: '/change-password',
    icon: <MdOutlinePassword />,
  },
  {
    title: 'Address Book',
    path: '/address-book',
    icon: <MdLocationOn />,
  },
  {
    title: 'Order Management',
    path: '/order-management',
    icon: <IoBook />,
  },
  {
    title: 'Product you viewed',
    path: '/product-you-viewed',
    icon: <IoMdEye />,
  },
  {
    title: 'Product Favorite',
    path: '/product-favorite',
    icon: <IoMdHeart />,
  },
  {
    title: 'Notifications',
    path: '/notifications',
    icon: <FaBell />,
  },
  // {
  //   title: 'Product Review',
  //   path: '/product-review',
  //   icon: <MdAccountCircle />,
  // },
  // {
  //   title: 'My Comment',
  //   path: '/my-comment',
  //   icon: <MdModeComment />,
  // },
]
