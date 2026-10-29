import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role, Category, Tag } from "../app/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Los SVG deben estar en public/products/ (circle.svg, square.svg, triangle.svg, octogon.svg)
const products = [
  {
    id: "seed-product-triangle",
    name: "Triangle",
    description: "Regular triangle.",
    price: "9.99",
    stock: 50,
    image: "/products/triangle.svg",
    category: Category.TRIANGLE,
    tag: Tag.POPULAR,
  },
  {
    id: "seed-product-square",
    name: "Square",
    description: "Regular square.",
    price: "12.50",
    stock: 40,
    image: "/products/square.svg",
    category: Category.QUADRILATERAL,
    tag: Tag.NEW,
  },
  {
    id: "seed-product-octogon",
    name: "Octogon",
    description: "Regular octogon.",
    price: "19.90",
    stock: 25,
    image: "/products/octogon.svg",
    category: Category.POLYGON,
    tag: Tag.HOT,
  },
  {
    id: "seed-product-circle",
    name: "Circle",
    description: "Regular circle",
    price: "14.00",
    stock: 0,
    image: "/products/circle.svg",
    category: Category.CURVED,
  },
];

async function main() {
  console.log("🌱 Iniciando seed...");

  // Usuarios
  const adminPassword = await hash("admin", 10);
  const customerPassword = await hash("customer", 10);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@example.com",
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      name: "Cliente Demo",
      email: "customer@example.com",
      password: customerPassword,
      role: Role.CUSTOMER,
    },
  });

  // Productos (ids fijos para que el seed sea idempotente)
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
  }

  console.log("✅ Seed completado");
}

main()
  .catch((e) => {
    console.error("❌ Error en el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
