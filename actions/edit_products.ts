"use server"

import prisma from "@/lib/prisma"
import { NameImage } from "./name_image"
import { Category, Tag } from "@/app/generated/prisma/enums"
import { revalidatePath } from "next/cache"

export default async function EditProduct(formdata: FormData) {

    const name = formdata.get("name")?.toString()
    const description = formdata.get("description")?.toString()
    const price = Number.parseFloat(formdata.get("price")?.toString() ?? "")
    const stock = Number.parseInt(formdata.get("stock")?.toString() ?? "")
    const image = formdata.get("image")
    const tagRaw = formdata.get("tag")?.toString()
    const categoryRaw = formdata.get("category")?.toString()
    const id = formdata.get("id")?.toString()

    if (!name || !categoryRaw || !id || Number.isNaN(price)) {
        throw new Error("Not all required data was given")
    }

    if (!Object.values(Category).includes(categoryRaw as Category)) {
        throw new Error("Invalid Category")
    }

    if (tagRaw && !Object.values(Tag).includes(tagRaw as Tag)) {
        throw new Error("Invalid Tag")
    }

    //creo el imageUrl antes del if para poder darle valor si existe "image"

    let imageUrl

    if (image instanceof File && image.size > 0) {
        if (image.type !== "image/svg+xml") {
            throw new Error("Only SVG images")
        }

        imageUrl = await NameImage(image, name)
    }

    await prisma.product.update({
        where: { id },
        data: {
            name,
            description,
            price,
            stock,
            category: categoryRaw as Category,
            tag: tagRaw as Tag,
            //inclulle la imagen solamente si existe
            ...(imageUrl && { image: imageUrl })
        }
    })

    revalidatePath("/admin/products")
}