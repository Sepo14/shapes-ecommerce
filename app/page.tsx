import { dm_mono } from "@/lib/fonts";
import { FiArrowRight } from "react-icons/fi";
import RegisterForm from "@/components/register";

export default function Home() {
  return (
    <main className="flex flex-col justify-center -mt-20">
      <section className="flex w-full justify-between h-svh ">
        <div className="flex flex-col w-1/2 justify-end gap-10 p-15">
          <p className={`${dm_mono.className} text-(--enfasis) text-xs tracking-[2px]`}>NEW COLLECTION · 2026</p>
          <h1 className="text-8xl">Objects <br /> of pure <br /> <em className="text-(--enfasis)">shape</em>.</h1>
          <p className="text-lg text-gray-500">
            Geometry is the language of modern design.
            <br />
            Every object begins with a shape.
          </p>
          <a href="#collection"
            className={`py-3 px-6 bg-(--color-dark) text-white flex justify-center text-sm ${dm_mono.className} group uppercase w-fit gap-4 hover:bg-(--enfasis) transition`}>
            Explore Collection <FiArrowRight className="text-lg group-hover:translate-x-1 transition" />
          </a>
        </div>
        <div className="flex flex-col w-1/2 bg-(--color-primary) justify-center">
          {/* poner carrusel de objetos */}
        </div>
      </section>
      {/* carrousel de textos debajo del main */}
      <section className="mt-10 p-15">
        <h2 className="text-4xl border-b border-gray-300 pb-5">
          All of our <em className="text-(--enfasis)">Collection</em>
        </h2>
        <div className="flex h-50 justify-center items-center">
          <p className="text-2xl">Poner carrousel de items comprables</p>
        </div>
      </section>
      <section className="mt-10 bg-(--color-dark) flex justify-between">
        <div className="flex flex-col text-white w-1/3 p-15 gap-5">
          <p className={`${dm_mono.className} text-(--enfasis) text-sm`}>01</p>
          <p className="text-2xl">Crafted with precision</p>
          <p className="text-gray-400">Raw geometry transformed into collectible objects.</p>
        </div>
        <div className="flex flex-col text-white  border-x border-white/10 w-1/3 p-15 gap-5">
          <p className={`${dm_mono.className} text-(--enfasis) text-sm`}>02</p>
          <p className="text-2xl">Pure materials shaped into architectural forms</p>
          <p className="text-gray-400">Minimal objects designed to bring structure and presence into everyday environments.</p>
        </div>
        <div className="flex flex-col text-white w-1/3 p-15 gap-5">
          <p className={`${dm_mono.className} text-(--enfasis) text-sm`}>03</p>
          <p className="text-2xl">Geometry treated as a visual language</p>
          <p className="text-gray-400">Every angle, curve, and proportion considered with intention.</p>
        </div>
      </section>
      <section className="p-15 bg-(--enfasis)/50">
        <div className="flex flex-col justify-center items-center gap-3">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
