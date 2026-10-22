"use client"

import { ChangeEmailAction } from "@/actions/change_user_data";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { VscSync } from "react-icons/vsc";
import { toast } from "sonner";

export default function EmailChange({ email, id }: { email: string, id: string }) {

    const [able, setAble] = useState<boolean>(true)
    const { update } = useSession()
    const router = useRouter()

    async function handleSubmit(e : FormData) {
        
        const newemail = e.get("email")

        try{
            await ChangeEmailAction(e)

        await update({
            email: newemail
        })
        
        router.refresh()

        toast.success("Email changed")

        setAble(true)
        }catch(error){
            if(error instanceof Error){
                toast.error(error.message)
            }else{
                toast.error("Something Went Wrong") 
            }
        }

    }


    return (
        <form action={handleSubmit} className="flex group" autoComplete="off">
            <input type="email" name="email" id='email' disabled={able}
                className={`text-xl transition border outline-none bg-(--enfasis)/20 p-3 ${able ? "border-gray-300" : "border-(--enfasis)"}`}  defaultValue={email} />
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