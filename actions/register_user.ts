"use server"

import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { actionState } from "@/lib/types";


export default async function RegisterUser(prevState: actionState, formData: FormData): Promise<actionState> {

    try {
        const name = formData.get("name")?.toString();
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString();

        if (!email || !password) {
            return {
                success: false,
                error: "Email and Password must be filled."
            }
        }

        await prisma.user.create({ data: { name, email, password } })


        await signIn("credentials", { email, password, redirect: false })


        return {
            success: true,
            message: "User created succesfuly"
        }

    } catch (err) {
        console.error("ERROR:", err);

        return { success: false, error: "Something went wrong." }
    }

} 