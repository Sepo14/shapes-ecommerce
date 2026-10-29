// components/logout-button.tsx

import { signOut } from "@/auth"
import { dm_mono } from "@/lib/fonts"

export default function LogoutButton() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
            }}
        >
            <button
                type="submit"
                className={`py-2 px-4 md:py-3 md:px-6 bg-(--color-dark) text-white flex items-center justify-center text-sm ${dm_mono.className} cursor-pointer
                 border border-(--color-dark) uppercase w-fit gap-4 hover:bg-(--enfasis) hover:border-(--enfasis) transition h-full`}
            >
                Logout
            </button>
        </form>
    )
}