import { dm_mono } from "@/lib/fonts";
import { FiArrowRight } from "react-icons/fi";
import UserSection from "@/components/user-section";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import CarouselText from "@/components/carousel-text";
import CollectionSection from "@/components/collection-section";
import ProductHero from "@/components/product-hero";
import UserPanel from "@/components/user-panel";

export default async function Home() {

  const session = await auth();
  const productsData = await prisma.product.findMany();
  const productsProcessed = productsData.map(product => ({ ...product, price: product.price.toString() }));
  const productsWithStock = productsProcessed.filter(product => product.stock > 0);
  const displayHero = productsWithStock.length > 0
    // eslint-disable-next-line react-hooks/purity
    ? productsWithStock[Math.floor(Math.random() * productsWithStock.length)]
    : null;
  return (
    <main className="flex flex-col justify-center -mt-20">
      <section className="flex w-full justify-between h-svh ">
        <div className="flex flex-col justify-end gap-10 p-5 md:p-15 w-full lg:w-1/2">
          <p className={`${dm_mono.className} text-(--enfasis) text-xs tracking-[2px]`}>NEW COLLECTION · 2026</p>
          <h1 className="text-7xl md:text-8xl">Objects <br /> of pure <br /> <em className="text-(--enfasis)">Shape</em></h1>
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
        <div className="flex-col w-1/2 bg-(--color-primary) justify-center items-center relative overflow-hidden hidden lg:flex">
          {/* poner carrusel de objetos */}
          {displayHero && <ProductHero product={displayHero} />}
        </div>

      </section>
      {/* carrousel de textos debajo del main */}
      <CarouselText />
      <section className="pt-25 p-5 md:p-15" id="collection">
        <h2 className="text-4xl border-b border-gray-300 pb-5">
          All of our <em className="text-(--enfasis)">Collection</em>
        </h2>
        <CollectionSection productData={productsProcessed} />
      </section>
      <section className="mt-10 bg-(--color-dark) flex flex-col md:flex-row justify-between divide-y md:divide-x divide-white/10 ">
        <div className="flex flex-col text-white md:w-1/3 p-5 md:p-15 gap-5">
          <p className={`${dm_mono.className} text-(--enfasis) text-sm`}>01</p>
          <p className="text-2xl">Crafted with precision</p>
          <p className="text-gray-400">Raw geometry transformed into collectible objects.</p>
        </div>
        <div className="flex flex-col text-white md:w-1/3 p-5 md:p-15 gap-5">
          <p className={`${dm_mono.className} text-(--enfasis) text-sm`}>02</p>
          <p className="text-2xl">Pure materials shaped into architectural forms</p>
          <p className="text-gray-400">Minimal objects designed to bring structure and presence into everyday environments.</p>
        </div>
        <div className="flex flex-col text-white md:w-1/3 p-5 md:p-15 gap-5">
          <p className={`${dm_mono.className} text-(--enfasis) text-sm`}>03</p>
          <p className="text-2xl">Geometry treated as a visual language</p>
          <p className="text-gray-400">Every angle, curve, and proportion considered with intention.</p>
        </div>
      </section>
      <section className="bg-(--background)">
        <div className="flex flex-col justify-center items-center">

          {session ? <UserPanel /> : <UserSection />}

        </div>
      </section>
    </main>
  );
}
