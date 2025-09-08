
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
        const existing = await prisma.workspace.findUnique({
            where: {
                ownerId_name: {
                    ownerId,
                    name: workSpace_name
                }
            }
        })

        if (existing) {
            return res.status(409).json({
                error: "Workspace with this name already exists"
            })
        }

        const workspace = await prisma.workspace.create({
            data: {
                name: workSpace_name,
                slug: workSpace_Url,
                ownerId
            }
        })
        if (workspaceCount === 0) {
            return res.status(201).json({
                redirectURL: `${process.env.FRONTEND_URL}/onboarding/github-install/${workspace.name}/${workspace.id}`
            })

        } else {
            return res.status(201).json({
                redirectURL: `${process.env.FRONTEND_URL}/dashboard/${workspace.name}/${workspace.id}`
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
