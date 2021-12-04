import SettingsLayout from "components/SettingsLayout"
import InputField from "components/InputField"

const AccountSettings = () => {
  return (
    <SettingsLayout>
      <h3>Account Settings</h3>

      <div className="">
        <div className="settings-form">
          <div className="flex-1 space-y-2">
            <InputField id="uuid"  label="University ID" />
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="btn-outline-primary py-1">
              Save
            </button>
          </div>
        </div>

        <div className="settings-form">
          <div className="flex-1 space-y-1">
            <h6 className="font-semibold pb-2">
              Please enter your full name, or a display name you are comfortable
              with.
            </h6>
            <InputField id="name"  label="Full Name" />
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="btn-outline-primary py-1">
              Save
            </button>
          </div>
        </div>

        <div className="settings-form">
          <div className="flex-1 space-y-2">
            <h6 className="font-semibold pb-2">
              Please enter the email address you want to use to log in
            </h6>
            <InputField id="email"  label="Email" />
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="btn-outline-primary py-1">
              Save
            </button>
          </div>
        </div>

        <div className="settings-form">
          <h4 className="font-semibold">Change your Password</h4>
          <div className="flex-1 space-y-8 mt-12">
            <InputField id="curr-pass"  label="Current Password" />
            <InputField id="new-pass"  label="New Password" />
            <InputField id="confirm-pass"  label="Confirm Password" />
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="btn-outline-primary py-1">
              Save
            </button>
          </div>
        </div>
      </div>
    </SettingsLayout>
  )
}

export default AccountSettings
