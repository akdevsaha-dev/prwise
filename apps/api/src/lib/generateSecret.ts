import jwt from "jsonwebtoken"
import fs from "fs"
export const generateSecret = () => {
    const privateKey = fs.readFileSync("/Users/akdevsaha/Developer/Projects/prwise/apps/api/prwise-ai.2025-08-27.private-key.pem", "utf8")
    const now = Math.floor(Date.now() / 1000)

    return jwt.sign({
        iat: now,
        exp: now + 60 * 10,
        iss: process.env.APP_ID
    },
        privateKey,
        {
            algorithm: "RS256"
        }
    )
}