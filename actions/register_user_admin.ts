"use server"

import { Role } from "@/app/generated/prisma/enums";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export default async function RegisterUserAdmin(formData: FormData) {

    const session = await auth()

    if (session?.user.role === "COSTUMER" || !session) {
        throw new Error("User unauthorized")
    }
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();
    const role = formData.get("rol") as Role

    if (!email || !password) {
        throw new Error("Email and Password must be filled")
    }

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error("Email already in use")
    }

    const hashedpass = await bcrypt.hash(password, 10)

    if (role) {
        await prisma.user.create({ data: { name, email, password: hashedpass, role } })

        revalidatePath("/admin")

    } else {
        await prisma.user.create({ data: { name, email, password: hashedpass } })

        revalidatePath("/admin")
    }
} 