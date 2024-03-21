import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // Bạn có thể thêm các nhà cung cấp khác ở đây
    ],
    basePath: "/",
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                token.id = profile.id
            }
            console.log('run token', token);
            return token
        }
    }
    // Callbacks cho việc tùy chỉnh JWT
    // callbacks: {
    //     // Tùy chỉnh token
    //     async jwt({ token, user, account, profile, isNewUser }) {
    //         // user?: object | undefined
    //         // Khi đăng nhập lần đầu, 'user' có giá trị và bạn có thể thêm thông tin vào 'token'
    //         if (user) {
    //             token.id = user.id;
    //         }
    //         return token;
    //     },
    //     // Tùy chỉnh session
    //     async session({ session, token, user }) {
    //         // Gửi thông tin tùy chỉnh vào session
    //         session.userId = token.id;
    //         return session;
    //     },
    // },
})

export { handler as GET, handler as POST }
