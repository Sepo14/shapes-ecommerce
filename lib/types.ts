import { Prisma, Product } from "@/app/generated/prisma/browser";

export type actionState = { success: boolean, error?: string };
export type ProductPriceString = Omit<Product, "price"> & { price: string };
export type CartItemType = { product: ProductPriceString, quantity: number };
//tipo de user con todos los datos añadidos
export type UserData = Prisma.UserGetPayload<{ include: { orders: { include: { products: true } } } }>

type PrismaUserOrderData = Prisma.OrderGetPayload<{
  include: { products: { include: { product: true } } }
}>

type PrismaOrderData = Prisma.OrderGetPayload<{
  include: {
    products: { include: { product: true } }
    user: true
  }
}>

type PrismaOrderProduct = PrismaUserOrderData["products"][number]

//un desastre que he tenido que hacer para arreglar el tema de decimal en la DB y string en el cliente
export type UserOrderData = Omit<PrismaUserOrderData, "products"> & {
  products: Array<
    Omit<PrismaOrderProduct, "cost" | "product"> & {
      cost: string
      product: Omit<PrismaOrderProduct["product"], "price"> & {
        price: string
      }
    }
  >
}

export type OrderData = Omit<PrismaOrderData, "products"> & {
  products: Array<
    Omit<PrismaOrderProduct, "cost" | "product"> & {
      cost: string
      product: Omit<PrismaOrderProduct["product"], "price"> & {
        price: string
      }
    }
  >
}

export function serializeUserOrders(
  orders: PrismaUserOrderData[]
): UserOrderData[] {
  return orders.map(order => ({
    ...order,
    products: order.products.map(item => ({
      ...item,
      cost: item.cost.toString(),
      product: {
        ...item.product,
        price: item.product.price.toString(),
      },
    })),
  }))
}

export function serializeOrders(orders: PrismaOrderData[]): OrderData[] {
  return orders.map(order => ({
    ...order,
    products: order.products.map(item => ({
      ...item,
      cost: item.cost.toString(),
      product: {
        ...item.product,
        price: item.product.price.toString(),
      },
    })),
  }))
}