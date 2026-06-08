import z from "zod";

const validation = z.object({
    email: z.email(),
    password: z.string().min(1)
})

export {validation}