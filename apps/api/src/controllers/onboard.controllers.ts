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
            return res.status(401).json({
                message: "unauthorized"
            })
        }
        const ownerId = session.user.id
        await prisma.workspace.create({
            data: {
                name: workSpace_name,
                slug: workSpace_Url,
                ownerId
            }
        })
        return res.status(201).json({
            message: "Workspace created successfully"
        })

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