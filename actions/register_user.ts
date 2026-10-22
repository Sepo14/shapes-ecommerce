"use server"

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";

export default async function RegisterUser(formData: FormData) {

    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        throw new Error("Email and Password must be filled.")
    }

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error("email already on use")
    }

    const hashedpass = await bcrypt.hash(password, 10)

    await prisma.user.create({ data: { name, email, password: hashedpass } })

    await signIn("credentials", { email, password, redirect: false })
} 