import { prisma } from "@repo/db"
import { Request, Response } from "express"
import { auth, Session } from "../auth.js";
import { fromNodeHeaders } from "better-auth/node";

export const finishOnboarding = async (req: Request, res: Response) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    }) as Session | null

    if (!session) {
        return res.redirect(`${process.env.FRONTEND_URL}/signup`)
    }
    const userID = session.user.id
    try {
        await prisma.user.update({
            where: {
                id: userID
            },
            data: {
                firstLogin: false
            }
        })
        return res.status(200).json({
            message: "Onboarding completed successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: "Failed"
        })
    }
}