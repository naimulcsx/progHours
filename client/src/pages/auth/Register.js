import AuthContainer from "components/AuthContainer"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

const Register = () => {
  return (
    <AuthContainer>
      <Helmet>
        <title>Create New Account</title>
      </Helmet>
      <div className="space-y-2">
        <h2>Create New Account</h2>
        <p>
          Already have an account?
          <Link to="/login" className="ml-1 text-primary">
            Login
          </Link>
        </p>
      </div>
      <form className="mt-8">
        <div className="space-y-4">
          <div className="form-group">
            <input id="fullName" type="text" placeholder=" " />
            <label htmlFor="fullName">Name</label>
          </div>
          <div className="form-group">
            <input id="email" type="email" placeholder=" " />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-group">
            <input id="uid" type="email" placeholder=" " />
            <label htmlFor="uid">University ID</label>
          </div>
          <div className="form-group">
            <input id="password" type="password" placeholder=" " />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <p className="text-sm">
            By clicking below to signup, you're agreeing to our terms of
            service.
          </p>
          <button type="submit" class="block btn-primary">
            Register
          </button>
        </div>
      </form>
    </AuthContainer>
  )
}

export default Register
