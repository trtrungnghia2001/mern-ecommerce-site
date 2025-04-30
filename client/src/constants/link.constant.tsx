import { Search, ShoppingCart, User } from 'lucide-react'

export const header_links = [
  {
    label: `Search`,
    path: `/search`,
    icon: <Search size={20} />,
  },
  {
    label: `Me`,
    path: `/me/update-profile`,
    icon: <User size={20} />,
  },
  {
    label: `Cart`,
    path: `/me/cart`,
    icon: <ShoppingCart size={20} />,
  },
]

export const footer_links = {
  about: ['About Us', 'Press', 'Careers'],
  help: ['FAQ', 'Terms & Conditions', 'Return Policy'],
  contact: ['Contact Us', 'Help Center'],
  social: ['Facebook', 'Instagram', 'Twitter', 'LinkedIn'],
  policy: ['Privacy Policy', 'Cookie Policy'],
  terms: ['Site Map', 'Terms of Service'],
}
