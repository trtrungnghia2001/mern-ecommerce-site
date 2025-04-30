import { memo } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { auth_links } from '../constants/link.constant'
import clsx from 'clsx'
import { MdOutlinePowerSettingsNew } from 'react-icons/md'
import { IMAGE_NOTFOUND } from '@/constants/image.constant'
import { useAuthStore } from '../stores/auth.store'

const AuthLayout = () => {
  const { signout, user } = useAuthStore()
  return (
    <div className="flex items-start gap-6">
      {/* nav left*/}
      <div className="hidden md:block md:max-w-[300px] lg:max-w-xs w-full bg-boxColor p-4 rounded-lg">
        {/* user */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 aspect-square overflow-hidden rounded-full">
            <img
              src={user?.avatar || IMAGE_NOTFOUND.AVATAR_NOTFOUND}
              alt={user?.avatar || IMAGE_NOTFOUND.AVATAR_NOTFOUND}
              loading="lazy"
            />
          </div>
          <div>
            <h6>{user?.name}</h6>
            <p className="text-textSecondaryColor text-13">{user?.email}</p>
          </div>
        </div>
        {/* links */}
        {auth_links.map((item) => (
          <NavLink
            key={item.path}
            to={`/me` + item.path}
            className={({ isActive }) =>
              clsx([
                `flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100`,
                isActive && `bg-gray-100`,
              ])
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.title}</span>
          </NavLink>
        ))}
        <button
          onClick={signout}
          className={clsx([
            `flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 w-full`,
          ])}
        >
          <span className="text-xl">
            <MdOutlinePowerSettingsNew />
          </span>
          <span>Sign Out</span>
        </button>
      </div>
      {/* main */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}

export default memo(AuthLayout)
