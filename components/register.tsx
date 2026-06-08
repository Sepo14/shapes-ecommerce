"use client"

import RegisterUser from '@/actions/register_user'
import { useActionState } from 'react'
import { dm_mono } from '@/lib/fonts'

export default function RegisterForm() {

    const [state, formAction] = useActionState(RegisterUser, { success: false })

    return (
        <>
            <h2 className={`${dm_mono.className} text-(--enfasis)`}>Join the community</h2>
            <h2 className="text-4xl pb-5 text-(--color-dark) text-center">Get early access to new collections<br />and limited-edition pieces.</h2>
            <form action={formAction} className={`flex flex-col min-w-100`}>
                <input type="text" name="name" id='name'
                    className='text-xl bg-(--background)/80 border outline-none border-gray-300 p-3 hover:bg-(--background) hover:border-(--color-dark) focus:border-(--enfasis) focus:bg-(--background) transition '
                    placeholder='Name' />
                <input type="email" name="email" id='email'
                    className='text-xl bg-(--background)/80 border outline-none border-gray-300 p-3 hover:bg-(--background) hover:border-(--color-dark) focus:border-(--enfasis) focus:bg-(--background) transition '
                    placeholder='Email' />
                <input type="password" name='password' id='password'
                    className='text-xl bg-(--background)/80 border outline-none border-gray-300 p-3 hover:bg-(--background) hover:border-(--color-dark) focus:border-(--enfasis) focus:bg-(--background) transition '
                    placeholder='Password' />
                <button type="submit"
                    className={`py-3 px-6 text-xl w-full bg-(--color-dark) text-white flex justify-center ${dm_mono.className} group uppercase w-fit gap-2 hover:bg-(--enfasis) transition`}>
                    Register
                </button>

            </form>
        </>
    )
}