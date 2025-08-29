import { prisma } from "@repo/db"
import { Request, Response } from "express"
import { auth, Session } from "../auth.js";
import { fromNodeHeaders } from "better-auth/node";

export const workspaceSetup = async (req: Request, res: Response) => {
    const { workSpace_name, workSpace_Url } = req.body
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        }) as Session | null;
        if (!session) {
            return res.redirect(`${process.env.FRONTEND_URL}/signin`)
        }
        const ownerId = session.user.id
        const workspace = await prisma.workspace.create({
            data: {
                name: workSpace_name,
                slug: workSpace_Url,
                ownerId
            }
        })
        //TODO: check workspace count if first workspace return onboard url or return diff url
        return res.status(201).redirect(`${process.env.FRONTEND_URL}/onboarding/${workspace.id}`)
    }
    catch (error) {
        console.error("Error creating workspace", error)
        res.status(500).json({
            error: "failed to create workspace"
        })
    }
}

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