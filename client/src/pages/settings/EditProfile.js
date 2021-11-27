import EditProfileForm from "components/EditProfileForm"
import Layout from "components/Layout"
import Sidebar from "components/Layout/Sidebar"

export default function EditProfile() {
  return (
    <Layout>
      <div className="my-24 grid grid-cols-4 space-x-16">
        <div className="">
          <Sidebar />
        </div>

        <div className="col-span-2 mt-6">
          <h3>Edit your profile</h3>

          <div className="">
            <EditProfileForm />
          </div>
        </div>

        <div className="">
          <p className="w-60 h-60 bg-primary text-white rounded-full flex items-center justify-center text-7xl font-bold">
            FS
          </p>
        </div>
      </div>
    </Layout>
  )
}
