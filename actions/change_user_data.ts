"use server"

import prisma from "@/lib/prisma";
import { validation } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function ChangeUsernameAction(formdata: FormData) {

    const id = formdata.get("id")?.toString()
    const name = formdata.get("name")?.toString().trim()

    if (!id) {
        throw new Error("Error with id")
    }

    if (!name) {
        throw new Error("Name can't be empty")
    }

    await prisma.user.update({
        where: { id },
        data: { name }
    })
}

export async function ChangeEmailAction(formdata: FormData) {

    const id = formdata.get("id")?.toString()
    const email = formdata.get("email")?.toString().trim()

    if (!id) {
        throw new Error("Error with id")
    }

    const emailResult = validation.shape.email.safeParse(email)

    if (!emailResult.success) {
        throw new Error("Email must be a propper email")
    }

    await prisma.user.update({
        where: { id },
        data: { email }
    })
}

export async function ChangePasswordAction(formdata: FormData) {

    const id = formdata.get("id")?.toString()
    const password = formdata.get("password")?.toString().trim()

    if (!id) {
        throw new Error("Error with id")
    }

    if (!password) {
        throw new Error("Password can't be empty")
    }

    const passhased = await bcrypt.hash(password, 10)

    await prisma.user.update({
        where: { id },
        data: { password : passhased }
    })

    revalidatePath("/")
}
