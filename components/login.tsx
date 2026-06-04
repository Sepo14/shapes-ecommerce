import { dm_mono } from '@/app/layout'
import Form from 'next/form'
import { FiArrowRight } from 'react-icons/fi'

export default function LoginForm() {
    return (
        <>
            <h2 className={`${dm_mono.className} text-(--enfasis)`}>Join the community</h2>
            <h2 className="text-4xl pb-5 text-(--color-black) text-center">Get early access to new collections<br />and limited-edition pieces.</h2>
            <Form action={""} className={`flex flex-col min-w-100`}>
                <input type="email" name="" id=""
                    className='text-xl bg-(--background)/80 border outline-none border-gray-300 p-3 hover:bg-(--background) hover:border-(--color-black) focus:border-(--enfasis) visited:border-(--enfasis) transition '
                    placeholder='Email' />
                <input type="password"
                    className='text-xl bg-(--background)/80 border outline-none border-gray-300 p-3 hover:bg-(--background) hover:border-(--color-black) transition '
                    placeholder='Password' />
                <button type="submit"
                    className={`py-3 px-6 text-xl w-full bg-(--color-black) text-white flex justify-center ${dm_mono.className} group uppercase w-fit gap-2 hover:bg-(--enfasis) transition`}>
                        Register
                    </button>
            </Form>
        </>
    )
}