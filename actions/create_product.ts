"use server"

import prisma from "@/lib/prisma"
import { NameImage } from "./name_image"
import { Category, Tag } from "@/app/generated/prisma/enums"
import { revalidatePath } from "next/cache"


export default async function CreateProduct(formdata: FormData) {

    const name = formdata.get("name")?.toString()
    const description = formdata.get("description")?.toString()
    const price = Number.parseFloat(formdata.get("price")?.toString() as string)
    const stock = Number.parseInt(formdata.get("stock")?.toString() as string)
    const tagRaw = formdata.get("tag")?.toString()
    const image = formdata.get("image")
    const categoryRaw = formdata.get("category")?.toString()

    if (!name || !price || !image || !categoryRaw) {
        throw new Error("Not all data was given")
    }

    if (!(image instanceof File) || image.type !== "image/svg+xml") {
        throw new Error("Only SVG images")
    }

    if (tagRaw) {
        if (!Object.values(Tag).includes(tagRaw as Tag)) {
            throw new Error("Invalid Tag")
        }
    }

    if (!Object.values(Category).includes(categoryRaw as Category)) {
        throw new Error("Invalid Category")
    }


    const tag = tagRaw as Tag

    const category = categoryRaw as Category

    const imageUrl = await NameImage(image, name)

    console.log(name, description, price, stock, imageUrl, category, tag)

    await prisma.product.create({ data: { name, description, price, stock, image: imageUrl, category, tag } })

    revalidatePath("/admin/products")

}