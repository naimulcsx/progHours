import SettingsLayout from "components/SettingsLayout"
import InputField from "components/Form"

const AccountSettings = () => {
  return (
    <SettingsLayout>
      <form className="space-y-12">
        <div className="space-y-6">
          <h3 className="mb-8">Change Account Settings</h3>
          <InputField id="email" label="Email" />
        </div>
        <div className="space-y-6">
          <h3 className="mb-8">Change your Password</h3>
          <InputField id="curr-pass" label="Current Password" />
          <InputField id="new-pass" label="New Password" />
          <InputField id="confirm-pass" label="Confirm Password" />
        </div>
        {/* save buttons */}
        <div className="flex items-center space-x-6">
          <button className="py-3 btn-outline" type="button">
            Cancel
          </button>
          <button className="btn-primary" type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </SettingsLayout>
  )
}

export default AccountSettings
