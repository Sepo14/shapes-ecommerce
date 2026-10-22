"use client"


import { ChangePasswordAction } from "@/actions/change_user_data";
import { useState } from "react";
import { VscSync } from "react-icons/vsc";
import { toast } from "sonner";

export default function PasswordChange({ id }: { id: string }) {

    const [able, setAble] = useState<boolean>(true)

    async function handleAction(e: FormData) {

        try {
            await ChangePasswordAction(e)

            toast.success("password changed")

            setAble(!able)
        }catch(error){
            if(error instanceof Error){
                toast.error(error.message)
            }else{
                toast.error("something went wrong")
            }
        }
    }

    return (
        <form action={handleAction} className="flex group" autoComplete="off">
            <input type="password" name="password" id='password' disabled={able}
                className={`text-xl transition border outline-none bg-(--enfasis)/20 p-3 ${able ? "border-gray-300" : "border-(--enfasis)"}`} placeholder="Password" />
            <input type="hidden" name="id" value={id} />

            <button type="button" value={""} onClick={() => setAble(!able)} className={`bg-black hover:bg-(--enfasis) transition ${able ? "block" : "hidden"}`}>
                <VscSync size={30} color="white" className=" transition cursor-pointer h-full p-3 w-full hover:rotate-45" />
            </button>

            <button type="submit" className={`bg-(--enfasis) hover:bg-(--enfasis) ${able ? "hidden" : "block"}`}>
                <VscSync size={30} color="white" className=" transition cursor-pointer h-full rotate-45 p-3 w-full animate-spin" />
            </button>
        </form>
    )
}