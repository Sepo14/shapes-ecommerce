"use client"

import { useActionState, useEffect } from 'react'
import { dm_mono } from '@/lib/fonts'
import LoginUser from '@/actions/login_user'
import { useRouter } from 'next/navigation'



export default function LogInForm() {

    const [state, formAction] = useActionState(LoginUser, { success: false, error: "" })
    const router = useRouter()

    useEffect(() => {
        if (state.success === true) {
            router.push("/")
            router.refresh()
        }
    }, [state.success ,router])

    return (
        <>
            <h2 className={`${dm_mono.className} text-(--enfasis)`}>Welcome back.</h2>
            <h2 className="text-4xl pb-5 text-(--color-dark) text-center">Get early access to new collections<br />and limited-edition pieces.</h2>
            <form action={formAction} className={`flex flex-col min-w-100`} autoComplete='off'>
                <input type="email" name="email" id='email' autoComplete='username'
                    className='text-xl bg-(--background)/80 border outline-none border-gray-300 p-3 hover:bg-(--background) hover:border-(--color-dark) focus:border-(--enfasis) focus:bg-(--background)  transition '
                    placeholder='Email' />
                <input type="password" name='password' id='password' autoComplete='new-password'
                    className='text-xl bg-(--background)/80 border outline-none border-gray-300 p-3 hover:bg-(--background) hover:border-(--color-dark) focus:border-(--enfasis) focus:bg-(--background)  transition '
                    placeholder='Password' />
                <button type="submit"
                    className={`py-3 px-6 text-xl w-full bg-(--color-dark) text-white flex justify-center ${dm_mono.className} group uppercase w-fit gap-2 hover:bg-(--enfasis) transition cursor-pointer`}>
                    Login
                </button>
            </form>
            {state.error}
        </>
    )
}