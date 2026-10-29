"use client"

import { ChangeUsernameAction } from "@/actions/change_user_data";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { VscSync } from "react-icons/vsc";
import { toast } from "sonner";

export default function UsernameChange({ name, id }: { name: string, id: string }) {

    const [able, setAble] = useState<boolean>(true)
    const { update } = useSession()
    const router = useRouter()

    async function handleSubmit(e: FormData) {

        const newName = e.get("name")

        try {
            await ChangeUsernameAction(e)

            await update({
                name: newName
            })

            router.refresh()

            toast.success("Username changed")

            setAble(true)
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("Something went wrong")
            }
        }

    }


    return (
        <form action={handleSubmit} className="flex group" autoComplete="off">
            <input type="text" name="name" id='name' disabled={able}
                className={`text-xl transition border outline-none bg-(--enfasis)/20 p-3 ${able ? "border-gray-300" : "border-(--enfasis)"}`} defaultValue={name} />
            <input type="hidden" name="id" value={id} />

            <button type="button" value={""} onClick={() => setAble(!able)} className={`bg-black hover:bg-(--enfasis) transition ${able ? "block" : "hidden"}`}>
                <VscSync size={30} color="white" className=" transition cursor-pointer h-full p-3 w-full hover:rotate-45 min-w-13" />
            </button>

            <button type="submit" className={`bg-(--enfasis) hover:bg-(--enfasis) ${able ? "hidden" : "block"}`}>
                <VscSync size={30} color="white" className=" transition cursor-pointer h-full rotate-45 p-3 w-full animate-spin min-w-13" />
            </button>
        </form>
    )
}