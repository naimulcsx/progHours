import { MetaFunction } from "@remix-run/node";

import { FAQ, Features, Footer, Hero } from "@proghours/ui";

export const meta: MetaFunction = () => ({
  title: "progHours - Code, Compete, Conquer!"
});

export default function Index() {
  return (
    <>
      <Hero />
      <Features />
      <FAQ />
      <Footer />
    </>
  );
}
