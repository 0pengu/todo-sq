import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Latex from "react-latex-next";

export default function Home() {
  return (
    <>
      <section className="relative w-full h-[calc(100vh-64px)] bg-center bg-cover">
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            {"{Todo}"}
            <Latex>$^2$</Latex>: A Todo App integrated with Discord
          </h1>
          <p className="mt-4 text-xl md:text-2xl">
            Always forgetting to throw out the trash when you play Valorant?
            {" {Todo}"}
            <Latex>$^2$</Latex> is here to help!
          </p>
          <Button
            as={Link}
            color="primary"
            href="/login"
            variant="solid"
            className="mt-8"
            size="lg"
          >
            Get Started
          </Button>
        </div>
      </section>
    </>
  );
}
