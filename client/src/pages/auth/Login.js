import AuthContainer from "components/AuthContainer"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

const Login = () => {
  return (
    <AuthContainer>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="space-y-3">
        <h2>Login to Account</h2>
        <p>
          Don't have an account?
          <Link to="/register" className="ml-1 text-primary">
            Register
          </Link>
        </p>
      </div>
      <form action="" className="mt-8 space-y-4">
        <div className="form-group">
          <input id="fullName" type="text" placeholder=" " />
          <label htmlFor="fullName">University ID</label>
        </div>
        <div className="form-group">
          <input id="password" type="password" placeholder=" " />
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <button type="submit" class="mt-6 block btn-primary">
            Login
          </button>
        </div>
      </form>
    </AuthContainer>
  )
}

export default Login
