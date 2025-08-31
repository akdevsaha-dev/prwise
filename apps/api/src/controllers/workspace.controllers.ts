
import { fromNodeHeaders } from "better-auth/node";
import { Request, Response } from "express";
import { auth, Session } from "../auth.js";
import { prisma } from "@repo/db";

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
        const workspaceCount = await prisma.workspace.count({
            where: {
                ownerId
            }
        })
        const workspace = await prisma.workspace.create({
            data: {
                name: workSpace_name,
                slug: workSpace_Url,
                ownerId
            }
        })
        if (workspaceCount === 0) {
            return res.status(201).json({
                redirectURL: `${process.env.FRONTEND_URL}/onboarding/github-install/${workspace.id}`
            })

        } else {
            return res.status(201).json({
                redirectURL: `${process.env.FRONTEND_URL}/dashboard/workspace/${workspace.id}`
            })
        }
    }
    catch (error) {
        console.error("Error creating workspace", error)
        res.status(500).json({
            error: "failed to create workspace"
        })
    }
}
