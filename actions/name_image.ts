import fs from "fs/promises"
import path from "path"
import { randomUUID } from "crypto"

export async function NameImage(file: File , name: string) {

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filename =`${name.toLowerCase().replaceAll(" ","-")}-${randomUUID()}.svg`

    const uploadPath = path.join(
        process.cwd(),
        "public/products",
        filename
    )

    await fs.writeFile(uploadPath, buffer)

    return `/products/${filename}`
}