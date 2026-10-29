"use client"

import RegisterUserAdmin from "@/actions/register_user_admin"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { IoMdArrowDropdownCircle } from "react-icons/io"
import { IoCheckmarkSharp } from "react-icons/io5"
import { toast } from "sonner"

export default function CreateUserForm() {

    const [open, setOpen] = useState(false)

    const router = useRouter()

    async function handleAction(e:FormData){

        try{
            await RegisterUserAdmin(e)
            toast.success("User created successfully")
            router.refresh()
        }catch(error){
            if(error instanceof Error){
                toast.error(error.message)
            }else{
                toast.error("something went wrong")
            }
        }

    }

    return (
        <div className="overflow-hidden ">
            <button className="text-2xl flex items-center gap-2 group text-white hover:bg-(--enfasis) bg-black/90 px-4 py-2 cursor-pointer transition" onClick={() => setOpen(!open)}>Create new user
                <IoMdArrowDropdownCircle className={`transition duration-300 ${open ? "rotate-0" : "rotate-90"}`} />
            </button>

            <div className={`transition-all duration-500 ease-in-out ${open ? "max-h-100" : "max-h-0"}`}>
                <form action={handleAction} className="flex flex-col items-start gap-2 mt-2">
                    <input type="text" placeholder="Name (optional)" name="name" className="bg-white border hover:border-(--enfasis) transition outline-none w-full max-w-100" />
                    <input type="email" placeholder="Email" name="email" className="bg-white border hover:border-(--enfasis) transition outline-none w-full max-w-100" required />
                    <input type="password" placeholder="Password" name="password" className="bg-white border hover:border-(--enfasis) transition outline-none w-full max-w-100" required />
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className="relative flex gap-2 items-center">
                            <input type="checkbox" name="rol" value={"ADMIN"} className="peer sr-only" />
                            <span className="select-none">ADMIN</span>
                            <div className="size-5 border peer-hover:border-(--enfasis) peer-checked:bg-(--enfasis) peer-checked:border-(--enfasis) transition flex items-center">
                            </div>
                            <IoCheckmarkSharp className="size-5 hidden peer-checked:block absolute right-0" color="white" />
                        </div>
                    </label>
                    <button
                        className={`py-3 px-6 justify-center text-sm border border-(--enfasis) 
                        uppercase w-fit gap-4 hover:bg-(--enfasis) hover:text-white transition cursor-pointer`}
                        type="submit">SUBMIT
                    </button>
                </form>
            </div>
        </div>
    )
}