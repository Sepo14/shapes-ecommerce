"use server"

import { actionState } from "@/lib/types";
import { signIn } from "@/auth";

export default async function LoginUser(prevState: actionState, formData: FormData): Promise<actionState> {

    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        return { success: false, error: "Missing fields" }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        return { success: true }

    } catch {
        return { success: false, error: "Invalid credentials" }
    }

} 