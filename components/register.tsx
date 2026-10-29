"use client"

import RegisterUser from '@/actions/register_user'
import { dm_mono } from '@/lib/fonts'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function RegisterForm() {

    const router = useRouter()

    async function handleAction(e : FormData) {
        try{
            await RegisterUser(e)
            router.refresh()
            toast.success("Register successful")
        }catch(error){
            if(error instanceof Error){
                toast.error(error.message)
            }else{
                toast.error("Something Went Wrong")
            }
        }
    }

    return (
        <>
            <h2 className={`${dm_mono.className} text-(--enfasis)`}>Join the community</h2>
            <h2 className="text-4xl pb-5 text-(--color-dark) text-center">Get early access to new collections<br />and limited-edition pieces.</h2>
            <form action={handleAction} className={`flex flex-col min-w-100 px-5`} autoComplete='off'>
                <input type="text" name="name" id='name' autoComplete='name'
                    className='text-xl bg-(--background)/80 border outline-none border-gray-300 p-3 hover:bg-(--background) hover:border-(--color-dark) focus:border-(--enfasis) focus:bg-(--background)   transition '
                    placeholder='Name' />
                <input type="email" name="email" id='email' autoComplete='username'
                    className='text-xl bg-(--background)/80 border outline-none border-gray-300 p-3 hover:bg-(--background) hover:border-(--color-dark) focus:border-(--enfasis) focus:bg-(--background)  transition '
                    placeholder='Email' />
                <input type="password" name='password' id='password' autoComplete='new-password'
                    className='text-xl bg-(--background)/80 border outline-none border-gray-300 p-3 hover:bg-(--background) hover:border-(--color-dark) focus:border-(--enfasis) focus:bg-(--background)  transition '
                    placeholder='Password' />
                <button type="submit"
                    className={`py-3 px-6 text-xl w-full bg-(--color-dark) text-white flex justify-center ${dm_mono.className} group uppercase w-fit gap-2 hover:bg-(--enfasis) transition cursor-pointer`}>
                    Register
                </button>
            </form>
        </>
    )
}