import SettingsLayout from "components/SettingsLayout"
import InputField from "components/InputField"

const AccountSettings = () => {
  return (
    <SettingsLayout>
      <h3>Change Account Settings</h3>

      <div className="">
        <InputField id="email" label="Email" />

        <div className="flex justify-end mt-4">
          <button type="submit" className="py-1 btn-outline-primary">
            Save
          </button>
        </div>

        <div className="settings-form">
          <h3 className="font-semibold">Change your Password</h3>
          <div className="flex-1 mt-12 space-y-8">
            <InputField id="curr-pass" label="Current Password" />
            <InputField id="new-pass" label="New Password" />
            <InputField id="confirm-pass" label="Confirm Password" />
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="py-1 btn-outline-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </SettingsLayout>
  )
}

export default AccountSettings
