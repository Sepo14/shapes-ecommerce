import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { validation } from "./lib/validation"
import bcrypt from "bcryptjs"
import { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }

  interface User {
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    name?: string | null
    email?: string | null
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      authorize: async (credentials) => {
        const validatedCredential = validation.parse(credentials)

        const user = await prisma.user.findUnique({
          where: { email: validatedCredential.email }
        })

        if (!user) return null

        const isValid = await bcrypt.compare(
          validatedCredential.password,
          user.password
        )

        if (!isValid) return null

        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id!
        token.role = user.role
        token.name = user.name
        token.email = user.email
      }

      if (trigger === "update" && session) {
        if (session.name !== undefined) token.name = session.name
        if (session.email !== undefined) token.email = session.email
        if (session.role !== undefined) token.role = session.role
      }

      return token
    },

    async session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role
      session.user.name = token.name ?? session.user.name
      session.user.email = token.email ?? session.user.email

      return session
    }
  }
})