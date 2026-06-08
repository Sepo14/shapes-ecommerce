import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { validation } from "./lib/validation"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Credentials({
    credentials: { email: {} , password: {}},
    authorize: async (credentials) => {

      const validatedCredential = validation.parse(credentials) 

      const user = await prisma.user.findFirst({where:{ email: validatedCredential.email , password: validatedCredential.password}})

      if(!user){throw new Error("Invalid credentials.")}
      
      return user
    }
  }),],
})