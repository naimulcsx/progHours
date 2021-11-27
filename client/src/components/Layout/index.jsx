import { Helmet } from "react-helmet-async"
import Navbar from "./Navbar"
import Container from "../base/Container"

export default function Layout({ title, children }) {
  return (
    <div className="">
      <Helmet>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </Helmet>

      <div className="">
        <Navbar />
        <Container>{children}</Container>
      </div>
    </div>
  )
}
