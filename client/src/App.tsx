import { Toaster } from 'react-hot-toast'
import axiosInstance from './configs/axios.config'
import { useAuthStore } from './features/authentication/stores/auth.store'
import MainRouter from './routers/index'
import { useEffect } from 'react'

const App = () => {
  const { user, signinWithPasspostSuccess } = useAuthStore()
  axiosInstance.defaults.params = {
    _tracking_id: user?._id,
  }

  useEffect(() => {
    ;(async () => {
      await signinWithPasspostSuccess()
    })()
  }, [])

  return (
    <div>
      <MainRouter />
      <Toaster />
    </div>
  )
}

export default App
