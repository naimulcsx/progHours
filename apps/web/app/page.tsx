"use client";

import { FAQ, Features, Hero } from "@proghours/ui";

import { Footer } from "~/modules/common/components/footer/Footer";

export default async function Index() {
  return (
    <>
      <Hero />
      <Features />
      <FAQ />
      <Footer />
    </>
  );
}
