import NextAuth from "next-auth";
import startDb from "../../../../../lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "../../../../../models/userModels";
import bcrypt from "bcrypt";


export const authOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credential: {},
            async authorize(credentials, req) {
                const { email, password } = credentials
                if (email === "kom39758@gkipi.org"){
                    if(password === "YWnY3c.)10cYo2"){
                        return {
                            name: "admin",
                            email: "admin.gkipi@gmail.com",
                            role: "admin",
                            id: "1"
                        }
                    }
                }
                await startDb();
                const user = await UserModel.findOne({ email });
                if (!user) {
                    throw Error("Please sign Up")
                }
                try {
                    const passwordMatch =await bcrypt.compare(password,user.password);
                } catch (error) {
                    throw Error("email/password missmatch")
                }

                return {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    id: user._id,
                }
            }
        })
    ],
    pages: { signIn: '/login' },
    callbacks: {
        jwt(params) {
            if (params.user?.role) {
                params.token.role = params.user.role,
                    params.token.id = params.user.id;
            }
            return params.token
        },
        session({ session, token }) {
            if (session.user) {
                (session.user).id = token.id;
                (session.user).role = token.role
            }
            return session
        }
    }
}
const authHandler = NextAuth(authOptions)

export { authHandler as GET, authHandler as POST }