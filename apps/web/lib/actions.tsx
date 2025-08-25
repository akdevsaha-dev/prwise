import { authClient } from "./auth-client"


export const handleGithubAuth = async()=>{
    await authClient.signIn.social({
        provider: "github",
        callbackURL: "/onboarding/welcome",
    })
}

export const handleGoogleAuth = async()=>{
    await authClient.signIn.social({
        provider:"google",
        callbackURL: "/onboarding/welcome",
    })
}

