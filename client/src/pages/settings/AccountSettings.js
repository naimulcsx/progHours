import SettingsLayout from "components/SettingsLayout"

// const settingsSchema = Yup.object().shape({
//   uuid: Yup.string().trim(),
//   name: Yup.string().trim(),
//   password: Yup.string().trim().min(8, "Password must be 8 characters long"),
//   email: Yup.string().email("Invalid email"),
// })

// const InputBox = ({ label }) => {
//   return (
//     <div className="flex-1 space-y-2">
//       <h6 className="font-semibold pb-2">{label}</h6>
//       <input className="input-box" />
//     </div>
//   )
// }

const AccountSettings = () => {
  return (
    <SettingsLayout>
      <h3>Account Settings</h3>

      <div className="">
        <form className="settings-form">
          <div className="flex-1 space-y-2">
            <h6 className="font-semibold pb-2">University ID</h6>
            <input className="input-box" />
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="btn-outline-primary py-1">
              Save
            </button>
          </div>
        </form>

        <form className="settings-form">
          <div className="flex-1 space-y-1">
            <h6 className="font-semibold pb-2">
              Please enter your full name, or a display name you are comfortable
              with.
            </h6>
            <input className="input-box" />
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="btn-outline-primary py-1">
              Save
            </button>
          </div>
        </form>

        <form className="settings-form">
          <div className="flex-1 space-y-2">
            <h6 className="font-semibold pb-2">
              Please enter the email address you want to use to log in
            </h6>
            <input className="input-box" />
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="btn-outline-primary py-1">
              Save
            </button>
          </div>
        </form>

        <form className="settings-form">
          <div className="flex-1 space-y-2">
            <h6 className="font-semibold pb-2">
              Please enter the password you want to use to log in
            </h6>
            <input className="input-box" />
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="btn-outline-primary py-1">
              Save
            </button>
          </div>
        </form>
      </div>
    </SettingsLayout>
  )
}

export default AccountSettings
