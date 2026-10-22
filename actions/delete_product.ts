"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export default async function DeleteProduct(id:string){

    await prisma.product.delete({where: {id}})

    revalidatePath("/admin/products")

}