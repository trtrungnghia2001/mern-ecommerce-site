import SigninForm from '@/features/authentication/components/SigninForm'

const AdminSigninPage = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="bg-boxColor p-4 rounded-lg w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">
          Welcom to Admin Panel
        </h2>
        <SigninForm isAdmin />
      </div>
    </div>
  )
}

export default AdminSigninPage
