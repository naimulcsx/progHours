import Layout from "../../components/Layout"
import Sidebar from "../../components/Layout/Sidebar"

const settingList = [
  {
    key: "Password",
    value: "Your password is 23312fsdfsd",
    button: "show",
  },

  {
    key: "Username",
    value: "fahimshahrier",
    button: "show",
  },

  {
    key: "Email Address",
    value: "Your email address is fahim@gmail.com",
    button: "show",
  },
]

const AccountSettings = () => {
  return (
    <Layout title="Account Settings">
      <div className="my-24 grid grid-cols-4 space-x-16">
        <div className="">
          <Sidebar />
        </div>

        <div className="col-span-3 mt-6">
          <h3>Account Settings</h3>

          <div className="">
            {settingList.map((list) => (
              <div className="flex items-center justify-between border-b border-borderColor py-8">
                <div className="">
                  <p className="p3">{list.key}</p>
                  <p className="p2">{list.value}</p>
                </div>

                <div className="">
                  <button
                    type="button"
                    className="border border-borderColor px-4 py-1 capitalize text-sm font-semibold rounded-md"
                  >
                    {list.button}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AccountSettings
